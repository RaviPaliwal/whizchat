import { SocketUrl } from "../config";
import { io } from 'socket.io-client';

export const socketConnect = () => {
  return io.connect(SocketUrl);
}

export const joinRoom = (socket, room_id) => {
  socket.emit("joinRoom", room_id);
}

export const setLastSeen = (socket, userId) => {
  socket.emit("setLastSeen", userId);
}

// Add event handlers for other events as needed
export const sendMessageToRoom = (socket, roomId,genRoomId, message,senderName) => {
  socket.emit("sendMessageToRoom", { roomId,genRoomId, message,senderName });
}




