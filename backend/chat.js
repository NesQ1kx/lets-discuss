// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

var HISTORY_SIZE = 300;
var CATEGORY_LIST = [
    {
        name: "Любовь",
        id: 0
    },
    {
        name: "Путешествие",
        id: 1
    },
    {
        name: "Экономика",
        id: 2
    },
    {
        name: "Музыка",
        id: 3
    },
    {
        name: "Животные",
        id: 4
    },
    {
        name: "Здоровье",
        id: 5
    },
    {
        name: "Игры",
        id: 6
    },
    {
        name: "Экономика",
        id: 7
    },
    {
        name: "Экология",
        id: 8
    },
    {
        name: "Вечеринки",
        id: 9
    },
    {
        name: "Общение",
        id: 10
    },
    {
        name: "Напитки",
        id: 11
    },
    {
        name: "Искусство",
        id: 12
    },
    {
        name: "Образ жизни",
        id: 13
    },
    {
        name: "Спорт",
        id: 14
    },
    {
        name: "Образование",
        id: 15
    },
    {
        name: "Программирование",
        id: 16
    },
];


// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
var express = require('express');
var app = express();
var uuidv1 = require('uuid/v1');
// var commands = require('./services/commands');

/**
 * Global variables
 */
// latest HISTORY_SIZE messages
var history = [];
// list of currently connected connections (users)
var connections = [];
//chat rooms list
/*
 {
    uuid: '',
    themeId : <Number>,
    connections: []
 }
 */
var chatRooms = [];

/**
 * HTTP server
 */
var server = http.createServer(function (request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function () {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});


// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin);
    // we need to know client index to remove them on 'close' event
    var index = connections.push(connection) - 1;
    var userName = false;
    var roomUuid = false;

    console.log((new Date()) + ' Connection accepted.');

    // user sent some message
    connection.on('message', function (message) {
        try {
            var messageObject = JSON.parse(message);
            if (!messageObject.hasOwnProperty('action') && !messageObject.hasOwnProperty('user_data')) {
                errorCommand(connection, 'Неправильный формат данных');
            }

            var frontendCommand = messageObject['action'];
            var userData = messageObject['user_data'];

            switch (frontendCommand) {
                case 'LEAVE_ROOM':
                    if (!userData.hasOwnProperty('uuid')) errorCommand(connection, 'Не предоставлен номер комнаты');
                    leaveRoomAction(userData.uuid);
                    roomUuid = false;
                    break;

                case 'CONNECT':
                    roomUuid = connectToRoom(connection, userData);
                    break;

                case 'MESSAGE':
                    sendMessage(connection, userData);
                    break;

                default:
                    errorCommand(connection, 'Неизвестная команда')
            }

        } catch (e) {
            errorCommand(connection, 'Неправильный формат данных');
        }
    });

    // user disconnected
    connection.on('close', function (connection) {
        if (userName !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected connections
            connections.splice(index, 1);
        }

        if (roomUuid) {
            leaveRoomAction(roomUuid);
        }
    });

});

/**
 * Utils functions
 */

function errorCommand(socketConnection, errorMessage) {
    errorMessage = errorMessage || 'Что-то пошло не так';
    socketConnection.sendUTF(JSON.stringify({
        error: errorMessage
    }));
}

function getRoomByUuid(uuid) {
    return chatRooms.filter(function (room) {
        return room.uuid === uuid;
    })[0];
}

function getReadyRoomByThemeId(themeId) {
    return chatRooms.filter(function (room) {
        return room.themeId === themeId && room.connections.length > 0;
    })[0];
}

function sendMessage(websocketConnection, userData) {
    if (!userData.hasOwnProperty('message') || !userData.hasOwnProperty('uuid')) {
        errorCommand(websocketConnection, 'Мало данных');
    }

    var message = userData.message;
    var uuid = userData.uuid;

    var room = getRoomByUuid(uuid);

    if (!room) {
        errorCommand(websocketConnection, 'Бля, что-то пошло не так');
    }

    room.connections.forEach(function (item) {
      if (item !== websocketConnection)  { // TODO: вот тут бля обязательно надо проверить, можно ли так сравнивать 2 разных конекшена, иначе себе будут приходить свои же сообщения
          item.sendUTF(JSON.stringify({
              action: 'NEW_MESSAGE',
              payload: {
                  message: message
              }
          }))
      }
    })
}

function connectToRoom(websocketConnection, userData) {
    if (!userData.hasOwnProperty('theme_id')) {
        errorCommand(websocketConnection, 'Не предоставлена id темы')
    }

    var themeId = userData.theme_id;
    var readyRoom = getReadyRoomByThemeId(themeId);

    if (readyRoom) {
        var companion = readyRoom.connections[0];
        readyRoom.connections.push(websocketConnection);
        websocketConnection.sendUTF(JSON.stringify({
            action: 'CHAT_CONNECTED',
            payload: {
                uuid: readyRoom.uuid
            }
        }));

        companion.sendUTF(JSON.stringify({
            action: 'COMPANION_CONNECTED'
        }));

        return readyRoom.uuid;
    }

    var newRoom = {};
    newRoom.uuid = uuidv1();
    newRoom.themeId = themeId;
    newRoom.connections = [websocketConnection];

    chatRooms.push(newRoom);

    websocketConnection.sendUTF(JSON.stringify({
        action: 'ROOM_CREATED',
        payload: {
            uuid: newRoom.uuid,
            theme_id: themeId
        }
    }));

    return newRoom.uuid
}

function leaveRoomAction(roomUuid) {
    var room = getRoomByUuid(roomUuid);
    if (room) {
        var users = room.connections;

        for (var i = 0; i < users.length; i++) {
            users.splice(index, 1);
            users.sendUTF(JSON.stringify({
                action: 'CHAT_CLOSED'
            }))
        }
    }
}

/**
 * REST API MODULE
 */
app.get('/', function (req, res) {
    res.send('Hi from awesome project. Developers: ' +
        'Jho00,' +
        'Нескук');
});

app.get('/getCategories', function (req, res) {
    res.send(JSON.stringify(CATEGORY_LIST));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});