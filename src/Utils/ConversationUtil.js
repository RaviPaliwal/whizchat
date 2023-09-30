// ConversationUtility.js
import { BaseUrl } from "../config";

export const getAllConversations = async (userId) => {
  try {
    const response = await fetch(`${BaseUrl}/api/user/${userId}/conversations`);
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
          const newArray = currentData.members.filter((UID) => UID !== userId);
          if (newArray.length > 0) {
            let response = await fetch(`${BaseUrl}/api/user/${newArray[0]}`, {
              method: "GET",
              headers: headersList,
            });

            let receiver = await response.json();
            // Set the receiver property for the current object
            currentData.receiver = receiver.user;
          }
        }
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export const createConversation = async (userIds) => {
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
    return newConversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
};

// Add other conversation-related functions here
export const setOnlineStatus = async (userId, status) => {
  console.log(`Setting ${status} status`);
  let headersList = {
    Accept: "*/*",
  };

  await fetch(`${BaseUrl}/api/user/${userId}/${status}`, {
    method: "PUT",
    headers: headersList,
  });
};
