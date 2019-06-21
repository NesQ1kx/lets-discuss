import Room from './common/entity/Room';
import {CATEGORY_LIST} from './common/CategoryList';
import {userData} from './common/types/UserData';
import ws = require('websocket');

// Optional. You will see this name in eg. "ps" or "top" command
process.title = "node-chat";

 // Port where we"ll run the websocket server
const webSocketsServerPort = 1337;
// websocket and http servers
const webSocketServer = require("websocket").server;
const http = require("http");
const express = require("express");
const app = express();
const uuidv1 = require("uuid/v1");


// list of currently connected connections (users)
let connections: ws.connection = [];
let chatRooms: Room[] = [];

/**
 * HTTP server
 */
const server = http.createServer(function (request, response) {
    // Not important for us. We"re writing WebSocket server, not HTTP server
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
wsServer.on("request", function (request) {
    console.log((new Date()) + " Connection from origin " + request.origin + ".");

    // accept connection - you should check "request.origin" to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin);
    // we need to know client index to remove them on "close" event
    var index = connections.push(connection) - 1;
    var userName = false;
    var roomUuid = false;

    console.log((new Date()) + " Connection accepted.");

    // user sent some message
    connection.on("message", function (message) {
        try {
            const messageObject: JSON = JSON.parse(message.utf8Data);
            console.log(messageObject);
            if (!messageObject.hasOwnProperty("action") && !messageObject.hasOwnProperty("user_data")) {
                errorCommand(connection, "Неправильный формат данных");
            }

            const frontendCommand: string = messageObject["action"];
            const userData: userData = messageObject["user_data"];

            switch (frontendCommand) {
                case "LEAVE_ROOM":
                    if (!userData.hasOwnProperty("uuid")) errorCommand(connection, "Не предоставлен номер комнаты");
                    leaveRoomAction(userData.uuid);
                    roomUuid = false;
                    break;

                case "CONNECT":
                    roomUuid = connectToRoom(connection, userData);
                    break;

                case "MESSAGE":
                    sendMessage(connection, userData);
                    break;

                default:
                    errorCommand(connection, "Неизвестная команда")
            }

        } catch (e) {
            console.log("Parse error");
            errorCommand(connection, 'Неправильный формат данных');
        }
    });

    // user disconnected
    connection.on("close", function (connection) {
        console.log("Closed connection!");
        if (userName !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected connections
            connections.splice(index, 1);
        }

        if (roomUuid) {
            console.log('leave room:' + roomUuid);
            leaveRoomAction(roomUuid);
        }
    });

});

/**
 * Utils functions
 */

const errorCommand = (socketConnection: ws.connection, errorMessage: string): void=> socketConnection.sendUTF(JSON.stringify({error: errorMessage || "Что-то пошло не так"}));

const getRoomByUuid  = (uuid: string): Room | null => chatRooms.filter( (room: Room) => room.uuid === uuid)[0];

const getReadyRoomByThemeId = (themeId: number): Room | null => chatRooms.filter( (room: Room) => room.themeId === themeId && room.connections.length > 0)[0];


function sendMessage(websocketConnection, userData) {
    if (!userData.hasOwnProperty("message") || !userData.hasOwnProperty("uuid")) {
        errorCommand(websocketConnection, "Мало данных");
    }

    const message: string = userData.message;
    const uuid: string = userData.uuid;
    const room: Room = getRoomByUuid(uuid);

    if (!room) {
        errorCommand(websocketConnection, "Бля, что-то пошло не так");
    }

    room.connections.forEach(function (item) {
        if (item !== websocketConnection)  {
            item.sendUTF(JSON.stringify({
                action: "NEW_MESSAGE",
                payload: {
                    message: message
                }
            }));
            console.log('send message');
        }
    })
}

const connectToRoom = (websocketConnection: ws.connection, userData): string => {
    if (!userData.hasOwnProperty("theme_id")) {
        errorCommand(websocketConnection, "Не предоставлена id темы")
    }

    const themeId = userData.theme_id;
    const readyRoom = getReadyRoomByThemeId(themeId);

    if (readyRoom) {
        const companion = readyRoom.connections[0];
        readyRoom.connections.push(websocketConnection);
        websocketConnection.sendUTF(JSON.stringify({
            action: "CHAT_CONNECTED",
            payload: {
                uuid: readyRoom.uuid
            }
        }));
        console.log('chat connected');
        companion.sendUTF(JSON.stringify({
            action: "COMPANION_CONNECTED"
        }));
        return readyRoom.uuid;
    }

    const newRoom = new Room({
        uuid: uuidv1(),
        themeId: themeId,
        connections: [websocketConnection]
    });

    chatRooms.push(newRoom);

    websocketConnection.sendUTF(JSON.stringify({
        action: "ROOM_CREATED",
        payload: {
            uuid: newRoom.uuid,
            theme_id: themeId
        }
    }));
    console.log('room created');

    return newRoom.uuid
};

const leaveRoomAction = (roomUuid: string): void => {
    const room: Room = getRoomByUuid(roomUuid);
    if (room) {
        const users = room.connections;

        for (let i = 0; i < users.length; i++) {
            console.log("SHOULD SEND CHAT CLOSED EVENT");
            users[i].sendUTF(JSON.stringify({
                action: "CHAT_CLOSED"
            }));
        }
        for (let i = 0; i < users.length; i++) {
            users.splice(i, 1);
        }
    }
};

/**
 * REST API MODULE
 */
app.get("/",  (req, res) =>
    res.send("Hi from awesome project. Developers: " +
        "Jho00," +
        "Нескук"));

app.get("/getCategories",  (req, res) => res.send(JSON.stringify(CATEGORY_LIST)));

app.get("/resetState",  (req, res) => {
    connections = [];
    chatRooms = [];
    res.send("done");
});

app.listen(3000,  () => console.log("Example app listening on port 3000!"));
