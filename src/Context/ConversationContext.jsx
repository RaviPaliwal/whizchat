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
      const response = await fetch(
        `${BaseUrl}/api/user/${userId}/conversations`
      );
      const data = await response.json();

      if (data && data[0] != null && !data.group) {
        // Loop through each object in the data array
        for (let i = 0; i < data.length; i++) {
          const currentData = data[i];

          // Check if currentData.members exists and is not null
          if (currentData.members) {
            let headersList = {
              Accept: "*/*",
            };
            const newArray = currentData.members.filter(
              (UID) => UID !== userId
            );
            if (newArray.length > 0) {
              let response = await fetch(`${BaseUrl}/api/user/${newArray[0]}`, {
                method: "GET",
                headers: headersList,
              });

              let receiver = await response.json();
              // Set the receiver property for the current object
              currentData.receiver = receiver.user;
              data[i] = currentData;
            }
          }
        }

        setConversations(data);
        console.log(data);
      } else if (data[0] !== null && data.group) {
        setConversations(data);
      }
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
      console.log("Conversation Created ID " + newConversation._id);
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
