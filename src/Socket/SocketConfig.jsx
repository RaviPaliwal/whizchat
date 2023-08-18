import { SocketUrl } from "../config";
import { io } from 'socket.io-client';

export const socketConnect=() =>{
    return io.connect(SocketUrl)
}


