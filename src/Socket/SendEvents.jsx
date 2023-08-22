export const sendMsg=(socket,m)=>{
    socket.emit('sendMessage',m);
  }