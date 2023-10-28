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
import { BaseUrl } from "../../config";
import EditIcon from "@mui/icons-material/Edit";
import AvatarUpdateDialog from "./AvatarUpdateDialog"; // Import the AvatarUpdateDialog component
import "../../Assets/Styles/UserProfile.css";
import { useAlertContext } from "../../Context/AlertContext";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ open, onClose }) => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [isMobileEditing, setIsMobileEditing] = useState(false);
  const [isAvatarUpdateDialogOpen, setIsAvatarUpdateDialogOpen] = useState(
    false
  );
  const Ac = useAlertContext();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [mobile, setMobile] = useState(user.mobile);
  const goto = useNavigate();

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

  const handleSave = async () => {
    //TODO: Handle Update
    if(username!==user.username||mobile!==user.mobile||name!==user.name)
    {try {
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(
        `${BaseUrl}/api/user/update/${user.email}/${username}/${name}/${mobile}`,
        {
          method: "PUT",
          headers: headersList,
        }
      );
      //  let data = await response.json();
      if (response.status === 200) {
        Ac.showPopup("User Updated Successfully Login Again", "success");
        goto("/");
      }
    } catch (e) {
      Ac.showPopup(`${e.message}`, "error");
    }}
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
        <DialogContent
          style={{
            minHeight: "300px",
            minWidth: "400px",
            maxHeight: "400px",
            maxWidth: "400px",
          }}
        >
          {/* Profile Image */}
          <div
            className={`avatar-wrapper ${isAvatarHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            <Avatar
              style={{width:"80px",height:"80px"}}
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
          {username!==user.username||mobile!==user.mobile||name!==user.name?"Save":"Ok"}
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
