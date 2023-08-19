import React from "react";
import { CssBaseline, ThemeProvider, Container, Divider } from "@mui/material";
import Chats from "./Chats";
import ChatTab from "./ChatTab";
import SideNavbar from "./SideNavbar";
import { theme, appContainerStyle } from "./Theme";
import { useAuth } from "../Context/AuthContext";


function HomePage() {
  const auth = useAuth()
  if(auth.user.Token)
  return (
  sessionStorage.getItem('login_status') &&<ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters style={appContainerStyle}>
        {/* Sidebar */}
        <SideNavbar /> {/* Use the SideNavbar component */}
        {/* Chat profiles */}
        <Chats />
        {/* Chat area */}
        <Divider orientation="vertical" flexItem></Divider>
        <ChatTab />
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
