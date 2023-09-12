import * as React from "react";
import { useState } from "react";
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
import { useGenContext } from "../Context/GeneralContext";
import { useChatContext } from "../Context/ChatContext";
import { Clear, Delete } from "@mui/icons-material";
import { BaseUrl } from "../config";
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

export default function ChatHeader() {
  const handleBack = () => {
    const chatList = document.getElementById("chatList");
    const chatsElement = document.getElementById("chats");
    chatsElement.style.display = "none";
    chatList.style.display = "block";
  };

  const states = useGenContext();
  const chat = useChatContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteChat = () => {
    // Handle deleting the chat here
    handleClose();
  };

  const handleClearChat = () => {
    // Handle clearing the chat here
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
                  aria-label={chat.chat.receiver.avatar}
                  src={
                    chat.chat.receiver.avatar != null
                      ? `${BaseUrl}/api/user/${chat.chat.receiver.email}/avatar`
                      : "noavatar.jpg"
                  }
                >
                  {chat.chat.receiver.name[0]}
                </Avatar>
              </Grid>
              <Grid item style={{ display: "flex", flexDirection: "column" }}>
                {chat.chat.receiver.name}
                <span style={{ fontSize: "17px" }} className="text-success">
                  {chat.chat.receiver.status}
                </span>
              </Grid>
            </Grid>
          }
          action={
            chat.chat.receiver.username !== "!!!null" && (
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
