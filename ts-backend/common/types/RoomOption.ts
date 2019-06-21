import ws = require('websocket');

export declare type roomOption = {
    uuid?: string,
    themeId?: number,
    connections?: ws.connection[]
}