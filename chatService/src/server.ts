interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
const server = http.createServer(app);
dotenv.config();

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server);


io.on('connection', (socket) => {
    console.log("Connected to socket", socket.id);
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Socket Service running on ${PORT}`);
});