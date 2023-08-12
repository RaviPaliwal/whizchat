import React from "react";
import {
  CssBaseline,
  ThemeProvider,
  Container,
} from "@mui/material";
import "../Assets/Styles/HomePage.css";
import Chats from "./Chats";
import ChatTab from "./ChatTab";
import SideNavbar from "./SideNavbar";
import {theme,appContainerStyle} from "./Theme"

function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters style={appContainerStyle}>
        {/* Sidebar */}
        <SideNavbar /> {/* Use the SideNavbar component */}
        {/* Chat profiles */}
        <Chats />
        {/* Chat area */}
        <ChatTab />
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
