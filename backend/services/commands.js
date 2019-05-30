commands = {
    'SET_NAME' : function () {
        
    },
    'SEND_ERROR': function (socketConnection, errorMessage) {
        errorMessage = errorMessage || 'Что-то пошло не так';
        socketConnection.sendUTF(JSON.stringify({
            error: errorMessage
        }));
    }
};

module.exports = commands;
