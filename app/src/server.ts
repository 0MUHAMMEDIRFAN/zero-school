import app from './app';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { Server } from 'socket.io';
import socketHandler from './socket';
const server = http.createServer(app);
dotenv.config();


const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_HOST || "";
const DB_NAME = process.env.DB_NAME || "";
const socket = process.env.SOCKET_PORT

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Initialize Socket.IO
socketHandler(io);

connectDB((DB_URL + DB_NAME));


server.listen(PORT, () => { console.log("Server Running on http://localhost:" + PORT) })
