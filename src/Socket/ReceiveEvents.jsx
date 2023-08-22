export const getMsg = (socket) => {
  return new Promise((resolve, reject) => {
      socket.on('getMessage', (data) => {
          // console.log(data);
          resolve(data); // Resolve the promise with the received data
      }); 
     });
    };