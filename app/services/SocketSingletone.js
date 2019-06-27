import {LOCAL_IP} from "../constants/url";

let singleSocket = null;
let singletonEnforcer = Symbol();

export class SingleSocket {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Instantiation failed: use Socket.getInstance() instead of new."
        }
    }

    static get instance() {
        if (!this[singleSocket]) {
            this[singleSocket] = new WebSocket(`ws://${LOCAL_IP}:1337`);
        }

        return this[singleSocket];
    }

    static set instance(v) { this[singleSocket] =  v}
}
