const BaseUrl ="http://localhost:5000"

export const generateImage = async (prompt)=>{
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       let bodyContent = JSON.stringify({
         "inputs": `${prompt}`
       });
       
       let response = await fetch(`${BaseUrl}/api/generateImage`, { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       let data = await response.blob();
       data = URL.createObjectURL(data);
       return data;
}

