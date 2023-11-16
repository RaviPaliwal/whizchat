import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useChatContext } from "../../Context/ChatContext";
import { BaseUrl } from "../../config";
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

export default function GroupChatHeader({ groupName }) {
  const chat = useChatContext();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to go back to the chat list
  const handleBack = () => {
    const chatList = document.getElementById("chatList");
    const chatsElement = document.getElementById("chats");
    chatsElement.style.display = "none";
    chatList.style.display = "block";
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Card sx={{ maxWidth: "100%", height: "5rem", borderRadius: "0px" }}>
        <CardHeader
          title={
            <>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton aria-label="back" onClick={handleBack}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{ height: "45px", width: "45px" }}
                    aria-label="group-avatar"
                    src={`${BaseUrl}/api/getgroupavatar/${chat.chat._id}`} // Provide the URL to the group avatar
                  >
                    {chat.chat.groupName.slice(0, 4)}
                  </Avatar>
                </Grid>
                <Grid item style={{ display: "flex", flexDirection: "column" }}>
                  {chat.chat.groupName}
                  <Grid
                    item
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span style={{ fontSize: "15px" }} className="text-success">
                      {chat.chat.about.slice(0, 30)}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </>
          }
          action={
              <div>
                <IconButton aria-label="menu" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>Function 1</MenuItem>
                  <MenuItem>Function 2</MenuItem>
                  <MenuItem>Function 3</MenuItem>
                </Menu>
              </div>
          }
        />
      </Card>
    </ThemeProvider>
  );
}
