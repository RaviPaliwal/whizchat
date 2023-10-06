import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, TextField, Typography } from "@mui/material";
import Message from "./Message";
import { Typerstyle, chatAreaStyle } from "./Theme";
import ChatHeader from "./ChatHeader";
import { useChatContext } from "../Context/ChatContext";
import { sendMessageToRoom } from "../Socket/SocketConfig";
import { useGenContext } from "../Context/GeneralContext";
import { BaseUrl, RandPhotoUrlChat } from "../config";
import { groupMessagesByDate } from "../Utils/ConversationUtil";

const ChatTab = () => {
  const [messages, setMessages] = useState([]); // Store the chat messages
  const user = JSON.parse(sessionStorage.getItem("user"));
  const chat = useChatContext();
  const ctx = useGenContext();
  const socket = ctx.socket;
  const [getMsg, setGetMsg] = useState(5);
  const currentdate = new Date();

  useEffect(() => {
    const fetchMsg = async () => {
      try{
      if (chat.chat._id !== "Whizchat!!!null") {
        const res = await fetch(
          `${BaseUrl}/api/conversations/${chat.chat._id}`
        );
        const data = await res.json();
        console.log(data);
        const groupedMessages = groupMessagesByDate(data.messages);
        setMessages(groupedMessages);
        // console.log(data.messages)
      }}
      catch (error){
        console.log("Error: " + error);
      }  }
    fetchMsg();
  }, [chat.chat._id, getMsg]);

  useEffect(() => {
    socket.on("message", (data) => {
      setGetMsg(getMsg + 2);
      // return Date.now();
    });
  }, [socket, getMsg]);

  useEffect(() => {
    // Scroll chat container to the bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const message = text;

    // Function to send a message
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      sender: user._id,
      content: message,
    });

    // let response =
    await fetch(`${BaseUrl}/api/conversations/${chat.chat._id}/messages`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    // let data = await response.json();
    // console.log(data);

    const newMessage = { message, sender: user._id };

    sendMessageToRoom(
      ctx.socket,
      chat.chat._id,
      chat.chat.receiver._id,
      newMessage,
      user.name
    );
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
          // borderLeft: ".8px solid gray",
        }}
      >
        <ChatHeader refresh={setGetMsg}/>

        <Box
          ref={scrollRef}
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            flex: 1, // Let the messages container fill the remaining height
          }}
          className="messages-container"
        >
          {Object.entries(messages).map(([date, dateMessages]) => (
            <div key={date}>
              <Typography
                style={{
                  backgroundColor: "rgb(255, 255, 255,0.2)",
                  textAlign: "center",
                }}
                variant="subtitle1"
              >
                {currentdate.toLocaleDateString() !== date
                  ? new Date(currentdate.getDate() - 3).toLocaleDateString() !==
                    date
                    ? date
                    : "Yesterday"
                  : "Today"}
              </Typography>
              {dateMessages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
            </div>
          ))}
        </Box>

        <Box style={Typerstyle}>
          {chat.chat.receiver._id === "Whizchat!!!null" ? null : (
            <TextField
              label="Type a message"
              style={{
                width: "100%",
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
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default ChatTab;
