import React, { createContext, useContext, useState } from "react";
import { BaseUrl } from "../config";

const ConversationContext = createContext();

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);

  const getAllConversations = async (userId) => {
    try {
      const response = await fetch(`${BaseUrl}/user/${userId}/conversations`);
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const createConversation = async (userIds) => {
    try {
      const response = await fetch(`${BaseUrl}/api/conversations/create`, {
        method: "POST",
        headers: {
           Accept: "*/*",
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ members: userIds }),
      });
      const newConversation = await response.json();
      console.log(newConversation)
      console.log(userIds)
      setConversations([...conversations, newConversation]);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // Implement other methods (e.g., DeleteConversation, sendMessage) similarly

  const value = {
    conversations,
    getAllConversations,
    createConversation,
    // Add other methods here
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};
