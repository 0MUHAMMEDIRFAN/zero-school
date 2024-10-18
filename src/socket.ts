import { Server } from 'socket.io';

const socketHandler = (io: Server) => {
    io.on('connection', (socket: any) => {
        console.log('new client connected', socket.id);

        socket.on('message', (data: any) => {
            console.log("Message received:", data);
            io.emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });
}

export default socketHandler;