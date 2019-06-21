import ws = require('websocket');
import {roomOption} from "../types/RoomOption";

export default class Room {
    private _uuid?: string;
    private _themeId?: number;
    private _connections?: ws.connection[]; // TODO: check is it useful

    constructor(roomOption: roomOption) {
        this._uuid = roomOption.uuid || null;
        this._themeId = roomOption.themeId || null;
        this._connections = roomOption.connections || null;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get themeId(): number {
        return this._themeId;
    }

    set themeId(value: number) {
        this._themeId = value;
    }

    get connections(): ws.connection[] {
        return this._connections;
    }

    set connections(value: ws.connection[]) {
        this._connections = value;
    }
}