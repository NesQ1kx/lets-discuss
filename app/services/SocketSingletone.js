// export const socketHolder = new WebSocket('ws://192.168.1.65:1337');

let singleSocket = null;
let singletonEnforcer = Symbol();

class SingleSocket {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Instantiation failed: use Socket.getInstance() instead of new."
        }
    }

    static get instance() {
        if (!this[singleSocket]) {
            this[singleSocket] = new WebSocket('ws://192.168.157.27:1337');
        }

        return this[singleSocket];
    }

    static set instance(v) { this[singleSocket] =  v}
}

export default SingleSocket
