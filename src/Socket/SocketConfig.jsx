import { SocketUrl } from "../config";
import { io } from 'socket.io-client';

export const socketConnect = () => {
  return io.connect(SocketUrl);
}

export const joinRoom = (socket, room_id) => {
  socket.emit("joinRoom", room_id);
}

// Add event handlers for other events as needed
export const sendMessageToRoom = (socket, roomId, message) => {
  socket.emit("sendMessageToRoom", { roomId, message });
}

// export const getMessagefromRoom = (socket)=>{
//   socket.on('message',(data) =>{
//     console.log(data.message);
//     return Date.now();
//   })
// }

// Example of a custom event
export const sendCustomEvent = (socket, data) => {
  socket.emit("customEvent", data);
}


