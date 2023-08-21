export const readReceipt= (socket)=>{
    socket.on('read_recept',(data)=>{
        console.log(data.recept)
      })
}