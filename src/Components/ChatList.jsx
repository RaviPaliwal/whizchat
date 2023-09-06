import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import { Paper, List, Button } from "@mui/material";
import { chatListStyle } from "./Theme";
import ChatListHeader from "./ChatListHeader";
import { useSearchContext } from "../Context/SearchContext";
import { useConversationContext } from "../Context/ConversationContext";

const ChatList = () => {
  const search = useSearchContext();
  const conversation = useConversationContext();

  useEffect(() => {
    const User = JSON.parse(sessionStorage.getItem("user"));
    console.log(User);
    conversation.getAllConversations(User._id);
  }, []);

  return (
    <Paper id="chatList" style={{ ...chatListStyle, borderRadius: "0px" }}>
      {/* Display selected user's profile */}
      {/* <Typography variant="h6" gutterBottom>
        Chats
      </Typography> */}
      <ChatListHeader />

      {/* Display search results */}
      {search.searchResults.length !== 0 && (
        <List>
          <p className="mx-3">Search Results</p>
          {search.searchResults.map((resultItem) => (
            <Button
              key={resultItem._id}
              onClick={(e) => {
                e.preventDefault();
                const userJSON = sessionStorage.getItem("user"); // Retrieve user data as JSON string
                const user = JSON.parse(userJSON); // Parse the JSON string to an object
                console.log(user);
                conversation.createConversation([resultItem._id, user._id]);
              }}
            >
              <ChatItem
                avatarUrl={resultItem.avatar}
                username={resultItem.name}
                lastMessage={"Add Ravi"} // Replace with an appropriate message
              />
            </Button>
          ))}
        </List>
      )}

      {/* Display existing chats */}
      <List>
        <p className="mx-3">Chats</p>
        {conversation.conversations
          ? conversation.conversations.map((resultItem) => (
              <ChatItem
                key={resultItem._id}
                itemId={resultItem._id}
                avatarUrl={
                  "https://media.istockphoto.com/id/1485546774/photo/bald-man-smiling-at-camera-standing-with-arms-crossed.webp?b=1&s=170667a&w=0&k=20&c=c2rsC66nJQAjkN6vCkhyB0vLHUiZhJSACMCBVF9HJJs="
                }
                username={resultItem.receiver.name}
                lastMessage={"Welcome To WhiZchat!"}
              />
            ))
          : ""}
      </List>
    </Paper>
  );
};

export default ChatList;
