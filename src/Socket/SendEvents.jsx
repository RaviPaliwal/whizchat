export const sendMessage=(socket,m)=>{
    socket.emit('message',m)
  }