import React from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import { AccountCircle, FiberManualRecord, Chat } from "@mui/icons-material";
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
        style={{ marginBottom: "16px" }}
      >
        <Tab label="Home" icon={<AccountCircle className="customNavicon " />} />
        <Tab label="Status" icon={<FiberManualRecord className="customNavicon" />} />
        <Tab label="New Chat" icon={<Chat className="customNavicon" />} />
      </Tabs>
    </Paper>
  );
};

export default SideNavbar;
