import { Server } from 'socket.io';
import { CLIENT } from '@/config';
import http from 'http';
import { app } from '@/app';

const server = http.createServer(app);
const onlineUsers = new Set<string>();
const io = new Server(server, {
    cors: {
        origin: ["*", CLIENT.origin],
    }
})

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id, socket.request.headers.authorization ? "[REDACTED]" : "No Authorization Header");
    
    onlineUsers.add(socket.id);
    io.emit("online-users", Array.from(onlineUsers.values()));

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        onlineUsers.delete(socket.id);
        io.emit("online-users", Array.from(onlineUsers.values()));
    });
})

export { io, server }