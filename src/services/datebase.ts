import * as mongoose from "mongoose";

import { EventEmitter } from "events";

//mongoose.set('useCreateIndex', true);

const connectionState = new EventEmitter();

const  MONGO_URI: string  = process.env.MONGO_URI!;
const connected = new Promise((res, rej) => {
    connectionState.once('connected', () => {
        res(null)
        console.log(`Connected to ${MONGO_URI}`);
    })
})

function connect() {
    mongoose.connect(MONGO_URI).then(e => {
        connectionState.emit('connected')
    }).catch(console.log)
}

export default {
    connect,
    connected
}