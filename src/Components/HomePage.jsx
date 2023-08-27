import React from "react";
import { CssBaseline, ThemeProvider, Container} from "@mui/material";
import ChatList from "./ChatList";
import ChatTab from "./ChatTab";
import SideNavbar from "./SideNavbar";
import { theme, appContainerStyle } from "./Theme";
import { SearchContextProvider } from "../Context/SearchContext";
import PageNotFound from "./PageNotFound";
import { useGenContext } from "../Context/GeneralContext";
//import { useAuth } from "../Context/AuthContext";

  

function HomePage() {
  const state = useGenContext();
  //const auth = useAuth()
  //if(auth.user.Token)
  if (sessionStorage.getItem("login_status")) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters style={appContainerStyle}>
          {/* Sidebar */}
          <SideNavbar /> {/* Use the SideNavbar component */}
          {/* Chat profiles */}
          <SearchContextProvider>
            <ChatList />
          </SearchContextProvider>
          {/* Chat area */}

          <ChatTab userid={state.user} />
        </Container>
      </ThemeProvider>
    );
  } else {
    return <PageNotFound />;
  }
}

export default HomePage;
