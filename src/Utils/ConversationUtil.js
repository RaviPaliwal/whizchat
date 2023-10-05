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

export function groupMessagesByDate(messages) {
  const groupedMessages = {};

  for (const message of messages) {
    const date = new Date(message.timestamp).toLocaleDateString();

    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }

    groupedMessages[date].push(message);
  }

  return groupedMessages;
}

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

export function getLastSeenTime(timestamp) {
  if (timestamp === "Online" || timestamp === "fetching...") {
    return timestamp;
  } else {
    const currentTimestamp = Date.now();
    const timestampAsNumber = parseInt(timestamp, 10);

    if (isNaN(timestampAsNumber)) {
      return "fetching...";
    }

    const timeDifference = currentTimestamp - timestampAsNumber;

    // Define time units in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    // Determine the appropriate time unit and calculate the value
    if (timeDifference < minute) {
      return "Just now";
    } else if (timeDifference < hour) {
      const minutesAgo = Math.floor(timeDifference / minute);
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < day) {
      const hoursAgo = Math.floor(timeDifference / hour);
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < week) {
      const daysAgo = Math.floor(timeDifference / day);
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < month) {
      const weeksAgo = Math.floor(timeDifference / week);
      return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < year) {
      const monthsAgo = Math.floor(timeDifference / month);
      return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
    } else {
      const yearsAgo = Math.floor(timeDifference / year);
      return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
    }
  }
}
