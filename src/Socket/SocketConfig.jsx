import { SocketUrl } from "../config";
import { io } from 'socket.io-client';

export const socketConnect=() =>{
    return io.connect(SocketUrl)
}

export const joinRoom=(socket,room_id)=>{
    socket.emit('join_room',room_id);
}


