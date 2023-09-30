// ChatContext.js

import React, { createContext, useContext, useState } from "react";

// Create the ChatContext
const ChatContext = createContext();

// Create a custom hook to use the ChatContext
export const useChatContext = () => {
  return useContext(ChatContext);
};

// Create the ChatContextProvider component
export const ChatContextProvider = ({ children }) => {
  // Define your chat object and setChat function
  const [chat, setChat] = useState({
    _id: "Whizchat!!!null", //Dont Change Sensitive
    members: ["64dsdssdsdd", "64ec4sascsa"],
    unseenCount: 0,
    group: false,
    muted: false,
    archived: false,
    pinned: false,
    messages: [],
    groupMembers: [],
    lastActivity: "2023-08-28T08:20:24.492Z",
    createdAt: "2023-08-28T08:20:24.498Z",
    updatedAt: "2023-08-28T08:20:24.498Z",
    __v: 0,
    receiver: {
      _id: "Whizchat!!!null", //sensitive
      username: "!!!null",
      name: "Whizchat",
      mobile: "123456789",
      email: "xyz2456@gmail.com",
      password: "$2b$10$/2WzubdB1jWmjG2R.m7NaOVM2IEPTpXrMsS/XRnsRfGIW.DLcee82",
      status: "Welcome to Whizchat !",
      avatar: null,
      createdAt: "2023-08-26T18:45:30.569Z",
      updatedAt: "2023-08-26T18:45:30.569Z",
      __v: 0,
    },
  }); // You can initialize it with your chat data

  // Create a value object to be provided by the context
  const value = {
    chat,
    setChat,
  };

  // Wrap your components with the ChatContext.Provider
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
