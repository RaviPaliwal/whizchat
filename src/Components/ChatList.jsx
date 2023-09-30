import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import SearchItem from "./SearchItem";
import { Paper, List, Button, Skeleton, Box } from "@mui/material";
import { chatListStyle } from "./Theme";
import ChatListHeader from "./ChatListHeader";
import { useSearchContext } from "../Context/SearchContext";
import { BaseUrl } from "../config";
import {
  createConversation,
  getAllConversations,
} from "../Utils/ConversationUtil";
import { useGenContext } from "../Context/GeneralContext";
import { useAlertContext } from "../Context/AlertContext";

const CustomSkeleton = () => {
  return (
    <Box className="d-flex mt-3">
      <Skeleton className=" ms-3" variant="circular" width={45} height={45} />
      <Box width={210} className="flex-grow-1 ms-3">
        <Skeleton height={15} width={115} />
        <Skeleton height={15} width="90%" animation="wave" />
        <Skeleton height={15} width={250} animation={false} />
      </Box>
    </Box>
  );
};

const ChatList = () => {
  const search = useSearchContext();
  const ctx = useGenContext();
  const [conversations, setConversations] = useState([]);
  const [call, setCall] = useState(3);
  const socket = ctx.socket;
  const Ac = useAlertContext();

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
      const user = JSON.parse(sessionStorage.getItem("user"));

      try {
        const data = await getAllConversations(user._id);
        setConversations(data);
      } catch (error) {
        Ac.showPopup("Error fetching conversations", "error");
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, [call]);

  return (
    <Paper id="chatList" style={{ ...chatListStyle, borderRadius: "0px" }}>
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
                const user = JSON.parse(sessionStorage.getItem("user"));
                await createConversation([resultItem._id, user._id]);
                setCall(call + 2);
                search.setSearchResults([]);
              }}
            >
              <SearchItem
                avatarUrl={
                  resultItem.avatar != null
                    ? `${BaseUrl}/api/user/${resultItem.email}/avatar`
                    : "Url to avatar.jpg"
                }
                name={resultItem.name}
                lastMessage={`Add ${resultItem.name.split(" ")[0]}`}
              />
            </Button>
          ))}
        </List>
      )}

      {/* Display existing chats */}
      <List>
        <p className="mx-3">Chats</p>
        {conversations.length !== 0 &&
          conversations &&
          conversations.map((resultItem) => (
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
          ))}
        {conversations.length === 0 && (
          <>
            <CustomSkeleton />
            <CustomSkeleton />
            <CustomSkeleton />
            <CustomSkeleton />
          </>
        )}
      </List>
    </Paper>
  );
};

export default ChatList;
