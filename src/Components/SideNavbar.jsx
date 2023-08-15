import React from "react";
import { Paper, Tabs, Tab, SpeedDialIcon } from "@mui/material";
import { AccountCircle,  Chat } from "@mui/icons-material";
import { sidebarStyle} from "./Theme"

const SideNavbar = () => {
  return (
    <Paper style={sidebarStyle}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={0}
        textColor="secondary"
        indicatorColor="secondary"
        TabIndicatorProps={{
          style : {
            left:"14.25px",
            right:"unset",
            width:"2px",
          }
        }}
        style={{ marginBottom: "16px" }}
      >
        <Tab sx={{typography: {fontSize: 10, },}} label="Chats" icon={<Chat className="customNavicon" /> } />
        <Tab sx={{typography: {fontSize: 10, },}} label="Profile" icon={<AccountCircle className="customNavicon " />} />
        <Tab sx={{typography: {fontSize: 10, },}} label="Add Chat" icon={<SpeedDialIcon className="customNavicon" />} />
      </Tabs>
    </Paper>
  );
};

export default SideNavbar;
