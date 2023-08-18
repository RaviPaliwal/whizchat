export const readReceipt= (socket)=>{
    socket.on('read_recept',(data)=>{
        alert(data.recept)
      })
}