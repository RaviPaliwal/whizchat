import React, { useState } from "react";
import { Paper, Tabs, Tab, SpeedDialIcon } from "@mui/material";
import { AccountCircle, Chat } from "@mui/icons-material";
import { sidebarStyle } from "./Theme";
import UserProfile from "./UserProfile"; // Import the UserProfile component
import AddGroupChat from "./GroupChat/AddGroupChat";
const user = JSON.parse(sessionStorage.getItem("user"));

const SideNavbar = () => {
  const [groupDialog, setGroupDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const handleProfileDialogOpen = () => {
    setOpenProfileDialog(true);
  };

  const handleProfileDialogClose = () => {
    setOpenProfileDialog(false);
  };

  const handleGroupDialogOpen = () => {
    setGroupDialog(true);
  };

  const handleGroupDialogClose = () => {
    setGroupDialog(false);
  };

  return (
    <Paper style={sidebarStyle}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={0}
        textColor="secondary"
        indicatorColor="secondary"
        TabIndicatorProps={{
          style: {
            left: "14.25px",
            right: "unset",
            width: "2px",
          },
        }}
        style={{ marginBottom: "16px" }}
      >
        <Tab
          sx={{ typography: { fontSize: 10 } }}
          label="Chats"
          icon={<Chat className="customNavicon" />}
        />
        <Tab
          sx={{ typography: { fontSize: 10 } }}
          label="Profile"
          icon={<AccountCircle className="customNavicon" />}
          onClick={handleProfileDialogOpen}
        />
        <Tab
          sx={{ typography: { fontSize: 10 } }}
          label="Group"
          icon={<SpeedDialIcon className="customNavicon" />}
          onClick={handleGroupDialogOpen}
        />
      </Tabs>

      {/* Profile Dialog */}
      <UserProfile
        open={openProfileDialog}
        onClose={handleProfileDialogClose}
      />

      {/* Add Group Chat */}
        <AddGroupChat open={groupDialog} onClose={handleGroupDialogClose} />
    </Paper>
  );
};

export default SideNavbar;
