// ChatContext.js

import React, { createContext, useContext, useState } from "react";
import { InitialChat } from "../config";

// Create the ChatContext
const ChatContext = createContext();

// Create a custom hook to use the ChatContext
export const useChatContext = () => {
  return useContext(ChatContext);
};

// Create the ChatContextProvider component
export const ChatContextProvider = ({ children }) => {
  // Define your chat object and setChat function
  const [chat, setChat] = useState(InitialChat); // You can initialize it with your chat data

  // Create a value object to be provided by the context
  const value = {
    chat,
    setChat,
  };

  // Wrap your components with the ChatContext.Provider
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
