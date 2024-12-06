import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from './config/socketEvents';

let io: Server;
const socketHandler = (server: Server) => {
    io = server;
    io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
        console.log('new client connected', socket.id);

        socket.on(SOCKET_EVENTS.MESSAGE, (data: any) => {
            console.log("Message received:", data);
            io.emit('message', data);
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            console.log('Client disconnected', socket.id);
        });
    });
}

export const emitData = (eventName: string, data: any) => {
    if (io) {
        io.emit(eventName, data);
    }
}

export default socketHandler;