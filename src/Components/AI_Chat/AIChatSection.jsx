import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Typerstyle, chatAreaStyle } from "../../Utils/Theme";
import ChatHeader from "../Chat/ChatHeader";
import { BaseUrl, RandPhotoUrlChat } from "../../config";
import MessageComponent from "./MessageComponent";

const AIChatSection = () => {
  const [mode, setMode] = React.useState("TextToText");
  const [loading,setLoading]=useState("none")
  const handleMode = (event, mode) => {
    setMode(mode);
  };

  const [messages, setMessages] = useState([
    { _id: Date.now(), isUserMessage: false, message: "Welcome User!" },
  ]);

  const generateImage = async (prompt) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const bodyContent = JSON.stringify({
      inputs: `${prompt}`,
    });
    const response = await fetch(`${BaseUrl}/api/generateImage`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data);

    const image = new Image();
    image.src = imageUrl;
    image.style.height = "250px";
    image.style.marginLeft = "8px";
    image.style.borderRadius = "12px";

    image.style.backgroundPosition = "center";

    const div = document.getElementById("messages-box");
      div.appendChild(image);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    setMessages([...messages, {_id:Date.now(),isUserMessage:true, message:text}]);
    if(mode ==="TextToImage"){
      setLoading("block");
      await generateImage(text)
      setLoading("none");
    }
  };
  const scrollRef = useRef(null);

  return (
    <div
      style={{
        ...chatAreaStyle,
      }}
      id="chats" //dont remove
    >
      <Paper
        style={{
          //{chat.chat.receiver.username ==="!!!null"?} conditionally setting
          backgroundImage: `url(${RandPhotoUrlChat})`,
          height: "100%",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          borderRadius: "0px",
        }}
      >
        <ChatHeader />

        <Box
          ref={scrollRef}
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            flex: 1, // Let the messages container fill the remaining height
          }}
          className="messages-container"
          id="messages-box"
        >
          {messages.map((item) => {
            return (
              <MessageComponent
                key={item._id}
                message={item.message}
                isUserMessage={item.isUserMessage}
              />
            );
          })}
          
        </Box>
        <Box style={{marginBottom:"20%"}}>
        <CircularProgress style={{marginLeft:"25%",display:loading} }/>
        </Box>
        

        <Box style={Typerstyle}>
          <TextField
            label="Type a message"
            style={{
              width: "100%",
              marginBottom:"7px"
            }}
            InputProps={{
              style: {
                color: "white",
                // Change this color to the color you want
              },
            }}
            variant="standard"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <Paper>
          <ToggleButtonGroup
            style={{display: "flex",flexDirection:"row",justifyContent:"space-between",}}
            value={mode}
            exclusive
            onChange={handleMode}
            aria-label="mode-select"
          >
            <ToggleButton value="TextToText" aria-label="Text-to-Text" style={{width:"50%"}}>
            Text To Text
            </ToggleButton>
            <ToggleButton value="TextToImage" aria-label="Text-to-Text"  style={{width:"50%"}}>
            Text To Image
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
        </Box>
      </Paper>
    </div>
  );
};

export default AIChatSection;
