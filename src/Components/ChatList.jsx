import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import { Paper, List, Button } from "@mui/material";
import { chatListStyle } from "./Theme";
import ChatListHeader from "./ChatListHeader";
import { useSearchContext } from "../Context/SearchContext";
import { useConversationContext } from "../Context/ConversationContext";
// import { useAuth } from "../Context/AuthContext";
const ChatList = () => {
  const search = useSearchContext();
  const conversation = useConversationContext();

  useEffect((conversation) => {
    conversation.getAllConversations();
  },[])
  // const auth = useAuth();

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
        {conversation[0]
          ? conversation.map((resultItem) => (
              <ChatItem
                key={resultItem._id}
                itemId={resultItem._id}
                avatarUrl={
                  "https://media.istockphoto.com/id/1485546774/photo/bald-man-smiling-at-camera-standing-with-arms-crossed.webp?b=1&s=170667a&w=0&k=20&c=c2rsC66nJQAjkN6vCkhyB0vLHUiZhJSACMCBVF9HJJs="
                }
                username={resultItem._id}
                lastMessage={"Welcome To WhiZchat!"}
              />
            ))
          : ""}
        <ChatItem
          itemId={2}
          avatarUrl={
            "https://th.bing.com/th?id=OIP.UGlKxiZQylR3CnJIXSbFIAHaLL&w=203&h=307&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          }
          username={"Shashwat Tiwari"}
          lastMessage={"Welcome To WhiZchat!"}
        />
      </List>
    </Paper>
  );
};

export default ChatList;
