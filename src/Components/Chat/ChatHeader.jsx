import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useGenContext } from "../../Context/GeneralContext";
import { useChatContext } from "../../Context/ChatContext";
import { Clear, Delete } from "@mui/icons-material";
import { BaseUrl} from "../../config";
import { getLastSeenTime } from "../../Utils/ConversationUtil";
import { useAlertContext } from "../../Context/AlertContext";
import { sendMessageToRoom } from "../../Socket/SocketConfig";
import { InitialChat } from "../../Utils/InitializationDefaults";

const customTheme = createTheme({
  components: {
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          color: "green",
        },
        title: {
          fontSize: "20px",
          fontWeight: "700",
        },
      },
    },
  },
});

export default function ChatHeader({ refresh }) {
  const Alert = useAlertContext();
  const states = useGenContext();
  const chat = useChatContext();
  const socket = states.socket;
  const [lastseen, setLastseen] = useState("");

  useEffect(() => {
    const updateLastSeen = async () => {
      try {
        // Fetch last seen
        if (chat.chat.receiver._id !== "Whizchat!!!null") {
          const ls = await fetch(
            `${BaseUrl}/api/user/lastseen/${chat.chat.receiver._id}`
          );
          const response = await ls.json();
          setLastseen(response.lastseen);
        } else {
          setLastseen("...fetching");
        }
      } catch (error) {
        console.error("Error fetching last seen:", error);
        setLastseen(chat.chat.receiver.lastseen);
      }
    };

    if (chat.chat.receiver._id !== "Whizchat!!!null") {
      updateLastSeen();
    }

    socket.on("lastseenUpdate", (userId) => {
      if (
        chat.chat.receiver._id !== "Whizchat!!!null" &&
        chat.chat.receiver._id === userId
      ) {
        updateLastSeen();
      }
    });

    return () => {
      socket.off("lastseenUpdate", updateLastSeen);
    };
  }, [socket, chat.chat.receiver._id, chat.chat.receiver.lastseen]);

  const handleBack = () => {
    const chatList = document.getElementById("chatList");
    const chatsElement = document.getElementById("chats");
    chatsElement.style.display = "none";
    chatList.style.display = "block";
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteChat = async () => {
    // Handle deleting the chat here
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `${BaseUrl}/api/conversation/${chat.chat._id}/delete`,
      {
        method: "DELETE",
        headers: headersList,
      }
    );

    if (response.status === 200) {
      refresh(Date.now());
      sendMessageToRoom(socket, chat.chat.receiver._id, chat.chat._id, "Bot");
      await chat.setChat(InitialChat);
      Alert.showPopup("Chat Deleted", "success");
    } else {
      Alert.showPopup("Something Went Wrong", "error");
    }

    handleClose();
  };

  const handleClearChat = async (e) => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `${BaseUrl}/api/conversation/${chat.chat._id}/clear`,
      {
        method: "PUT",
        headers: headersList,
      }
    );

    if (response.status === 200) {
      refresh(Date.now());
      Alert.showPopup("Chat Cleared", "success");
    } else {
      Alert.showPopup("Something Went Wrong", "error");
    }

    sendMessageToRoom(socket, chat.chat.receiver._id, null, "Bot");
    // For other end chat clear;

    handleClose();
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Card sx={{ maxWidth: "100%", height: "5rem", borderRadius: "0px" }}>
        <CardHeader
          title={
            <Grid container alignItems="center" spacing={1}>
              {states.screenWidth <= 768 && (
                <Grid item>
                  <IconButton aria-label="back" onClick={handleBack}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
              )}
              <Grid item>
                <Avatar
                  sx={{ height: "45px", width: "45px" }}
                  aria-label={
                    chat.chat.receiver._id !== "Whizchat!!!null"
                      ? chat.chat.receiver.avatar
                      : "null.png"
                  }
                  src={
                    chat.chat.receiver.avatar != null
                      ? `${BaseUrl}/api/user/${chat.chat.receiver.email}/avatar`
                      : "noavatar.jpg"
                  }
                >
                  {chat.chat.receiver.name[0]}
                </Avatar>
              </Grid>
              <Grid
                item
                style={{ display: "flex", flexDirection: "column" }}
              >
                {chat.chat.receiver._id === "Whizchat!!!null"
                  ? "Whizchat"
                  : chat.chat.receiver.name}
                <span style={{ fontSize: "17px" }} className="text-success">
                  {chat.chat.receiver._id === "Whizchat!!!null"
                    ? "Open a Chat"
                    : getLastSeenTime(lastseen)}
                </span>
              </Grid>
            </Grid>
          }
          action={
            chat.chat.receiver._id !== "Whizchat!!!null" && (
              <div>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    sx={{ fontFamily: "sans-serif" }}
                    onClick={handleDeleteChat}
                  >
                    <Delete sx={{ color: "#bfbfbf" }} /> Delete Chat
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: "sans-serif" }}
                    onClick={handleClearChat}
                  >
                    <Clear sx={{ color: "#bfbfbf" }} /> Clear Chat
                  </MenuItem>
                </Menu>
              </div>
            )
          }
        />
      </Card>
    </ThemeProvider>
  );
}