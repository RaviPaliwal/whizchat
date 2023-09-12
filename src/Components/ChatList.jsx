import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import SearchItem from "./SearchItem";
import { Paper, List, Button } from "@mui/material";
import { chatListStyle } from "./Theme";
import ChatListHeader from "./ChatListHeader";
import { useSearchContext } from "../Context/SearchContext";
import { BaseUrl } from "../config";
import {
  createConversation,
  getAllConversations,
} from "../Utils/ConversationUtil";
import { useGenContext } from "../Context/GeneralContext";
// import { joinRoom } from "../Socket/SocketConfig";

const ChatList = () => {
  const search = useSearchContext();
  const ctx = useGenContext();
  const [conversations, setConversations] = useState([]);
  const [call, setCall] = useState(3);
  const socket = ctx.socket;

  useEffect(() => {
    const handleSocketMessage = (data, call) => {
      setCall(Date.now());
    };

    socket.on("message", handleSocketMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message", handleSocketMessage);
    };
  }, [socket, setCall]);

  useEffect(() => {
    const fetchData = async () => {
      const User = JSON.parse(sessionStorage.getItem("user"));
      // console.log(User.name);

      try {
        const data = await getAllConversations(User._id);
        console.log(data);
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchData();
  }, [call]);

  // Automatically Getting New Conversation Pending

  //joining All Rooms
  // conversations
  //   ? conversations.map((resultItem) => joinRoom(socket, resultItem._id))
  //   : console.log("No Chat Found");

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
              fullWidth
              sx={{ padding: 0, textTransform: "none", color: "inherit" }}
              onClick={async (e) => {
                e.preventDefault();
                const userJSON = sessionStorage.getItem("user"); // Retrieve user data as JSON string
                const user = JSON.parse(userJSON); // Parse the JSON string to an object
                console.log(user);
                await createConversation([resultItem._id, user._id]);
                //Handeling Delay
                setCall(call + 2);
                console.log(call);
                search.setSearchResults([]);
              }}
            >
              <SearchItem
                avatarUrl={
                  resultItem.avatar != null
                    ? `${BaseUrl}/api/user/${resultItem.email}/avatar`
                    : "data:image/jpeg;base64,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"
                }
                name={resultItem.name}
                lastMessage={`Add ${resultItem.name.split(" ")[0]}`} // Replace with an appropriate message
              />
            </Button>
          ))}
        </List>
      )}

      {/* Display existing chats */}
      <List>
        <p className="mx-3">Chats</p>
        {conversations
          ? conversations.map((resultItem) => (
              <ChatItem
                key={resultItem._id}
                newchat={resultItem}
                itemId={resultItem._id + "xyz"}
                avatarUrl={
                  resultItem.receiver.avatar != null
                    ? `${BaseUrl}/api/user/${resultItem.receiver.email}/avatar`
                    : "Url to avatar.jpg"
                }
                name={resultItem.receiver.name}
                lastMessage={resultItem.lastMessage}
              />
            ))
          : ""}
      </List>
    </Paper>
  );
};

export default ChatList;
