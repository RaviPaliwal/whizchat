import React, { useState } from "react";
import { Paper, Tabs, Tab, SpeedDialIcon } from "@mui/material";
import { AccountCircle, Chat } from "@mui/icons-material";
import { sidebarStyle } from "./Theme";
import UserProfile from "./UserProfile"; // Import the UserProfile component

const SideNavbar = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const handleProfileDialogOpen = () => {
    setOpenProfileDialog(true);
  };

  const handleProfileDialogClose = () => {
    setOpenProfileDialog(false);
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
          label="Add Chat"
          icon={<SpeedDialIcon className="customNavicon" />}
        />
      </Tabs>

      {/* Profile Dialog */}
      <UserProfile
        open={openProfileDialog}
        onClose={handleProfileDialogClose}
      />
    </Paper>
  );
};

export default SideNavbar;
