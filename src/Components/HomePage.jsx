import React, { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import ChatList from "./ChatList/ChatList";
import ChatSection from "./Common/ChatSection";
import SideNavbar from "./Common/SideNavbar";
import { theme, appContainerStyle } from "../Utils/Theme";
import { SearchContextProvider } from "../Context/SearchContext";
import { useGenContext } from "../Context/GeneralContext";
import { joinRoom, setLastSeen } from "../Socket/SocketConfig";
import { setOnlineStatus } from "../Utils/ConversationUtil";

function HomePage() {
  const [joined, setJoined] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const state = useGenContext();
  const socket = state.socket;

  useEffect(() => {
    if (!joined) {
      joinRoom(socket, user._id); //General Purpose Room
      // console.log("Joined General Purpose Room " + user._id);
      setJoined(true);
      setOnlineStatus(user._id, "Online");
      setLastSeen(socket, user._id);
    }
  }, [joined, socket, user._id]);

  useEffect(() => {
    // Set user as "Offline" when the tab is closed or navigated away
    const handleTabClose = () => {
      setOnlineStatus(user._id, Date.now());
      setLastSeen(socket, user._id);
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      // Cleanup: remove the event listener
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [socket, user._id]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters style={appContainerStyle}>
        {/* Sidebar */}
        <SearchContextProvider>
          <SideNavbar />
        </SearchContextProvider>
        {/* Use the SideNavbar component */}
        {/* Chat profiles */}
        <SearchContextProvider>
          <ChatList />
        </SearchContextProvider>
        {/* Chat area */}
        <ChatSection />
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
