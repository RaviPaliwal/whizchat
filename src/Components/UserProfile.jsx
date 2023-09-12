import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import { BaseUrl } from "../config";
import EditIcon from "@mui/icons-material/Edit";
import AvatarUpdateDialog from "./AvatarUpdateDialog"; // Import the AvatarUpdateDialog component
import "../Assets/Styles/UserProfile.css";

const UserProfile = ({ open, onClose }) => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [isMobileEditing, setIsMobileEditing] = useState(false);
  const [isAvatarUpdateDialogOpen, setIsAvatarUpdateDialogOpen] = useState(
    false
  );

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [mobile, setMobile] = useState(user.mobile);

  const handleEditClick = (field) => {
    switch (field) {
      case "name":
        setIsNameEditing(true);
        setName(user.name); // Set the initial value
        break;
      case "username":
        setIsUsernameEditing(true);
        setUsername(user.username); // Set the initial value
        break;
      case "mobile":
        setIsMobileEditing(true);
        setMobile(user.mobile); // Set the initial value
        break;
      default:
        break;
    }
  };

  const handleAvatarEditClick = () => {
    setIsAvatarUpdateDialogOpen(true);
  };

  const handleAvatarEditClose = () => {
    setIsAvatarUpdateDialogOpen(false);
  };

  const handleSave = () => {
    // Log the values of name, username, and mobile
    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Mobile:", mobile);

    // Reset editing states
    setIsNameEditing(false);
    setIsMobileEditing(false);
    setIsUsernameEditing(false);

    // Saving (you can implement your saving logic here)
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {/* Profile Image */}
          <div
            className={`avatar-wrapper ${isAvatarHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            <Avatar
              src={`${BaseUrl}/api/user/${user.email}/avatar`}
              alt="Profile Image"
              className="avatar"
            />
            <div className={`edit-icon ${isAvatarHovered ? "visible" : ""}`}>
              <IconButton
                color="primary"
                aria-label="Edit Profile Image"
                component="span"
                onClick={handleAvatarEditClick} // Open avatar update dialog
              >
                <EditIcon />
              </IconButton>
            </div>
          </div>
          {/* Current User name */}
          <div className="currentuser">
            <p>{user.name}</p>
            <p className="online-text">Online</p>
          </div>

          {/* Name */}
          {isNameEditing ? (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <div className="non-edit-mode">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                InputProps={{ readOnly: true }}
              />
              <IconButton
                color="primary"
                aria-label="Edit Name"
                component="span"
                onClick={() => handleEditClick("name")}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}

          {/* Username */}
          {isUsernameEditing ? (
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <div className="non-edit-mode">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                InputProps={{ readOnly: true }}
              />
              <IconButton
                color="primary"
                aria-label="Edit Username"
                component="span"
                onClick={() => handleEditClick("username")}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}

          {/* Mobile */}
          {isMobileEditing ? (
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              margin="normal"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          ) : (
            <div className="non-edit-mode">
              <TextField
                label="Mobile"
                variant="outlined"
                fullWidth
                margin="normal"
                value={mobile}
                InputProps={{ readOnly: true }}
              />
              <IconButton
                color="primary"
                aria-label="Edit Mobile"
                component="span"
                onClick={() => handleEditClick("mobile")}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Avatar Update Dialog */}
      <AvatarUpdateDialog
        open={isAvatarUpdateDialogOpen}
        onClose={handleAvatarEditClose}
        userEmail={user.email}
      />
    </>
  );
};

export default UserProfile;
