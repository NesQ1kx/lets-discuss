export default class Room {
    constructor(roomOption) {
        this._uuid = roomOption.uuid || null;
        this._themeId = roomOption.themeId || null;
        this._connections = roomOption.connections || null;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(value) {
        this._uuid = value;
    }
    get themeId() {
        return this._themeId;
    }
    set themeId(value) {
        this._themeId = value;
    }
    get connections() {
        return this._connections;
    }
    set connections(value) {
        this._connections = value;
    }
}
