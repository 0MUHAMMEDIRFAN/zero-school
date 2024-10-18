import connectDB from './config/database';
import express from "express";
import dotenv from "dotenv";
import http from 'http';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { Server } from 'socket.io';
import socketHandler from './socket';

dotenv.config()

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_HOST || "";
const DB_NAME = process.env.DB_NAME || "";
const socket = process.env.SOCKET_PORT

connectDB((DB_URL + DB_NAME));

app.get('/', (req, res) => {
    res.send("Hello")
})

app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Initialize Socket.IO
socketHandler(io);

server.listen(PORT, () => { console.log("Server Running on http://localhost:" + PORT) })