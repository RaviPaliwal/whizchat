// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// function BootstrapDialogTitle(props) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

// export default function CustomizedDialogs() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open dialog
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
//           Modal title
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//           </Typography>
//           <Typography gutterBottom>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
//             Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
//           </Typography>
//           <Typography gutterBottom>
//             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
//             magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
//             ullamcorper nulla non metus auctor fringilla.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Save changes
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </div>
//   );
// }

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
import EditIcon from "@mui/icons-material/Edit";
import "../Assets/Styles/UserProfile.css";

const UserProfile = ({ open, onClose }) => {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <div className="profile-section">
          {/* Profile Image */}
          <div
            className={`avatar-wrapper ${isAvatarHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            <Avatar
              src="path_to_profile_image.jpg"
              alt="Profile Image"
              className="avatar"
            />
            <div className={`edit-icon ${isAvatarHovered ? "visible" : ""}`}>
              <IconButton
                color="primary"
                aria-label="Edit Profile Image"
                component="span"
              >
                <EditIcon />
              </IconButton>
            </div>
          </div>
          {/*current User name */}
          <div className="currentuser">
            <p>User's Name</p>
            <p className="online-text">Online</p>
          </div>
        </div>
        {/* Name */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="John Doe"
        />
        <IconButton color="primary" aria-label="Edit Name" component="span">
          <EditIcon />
        </IconButton>

        {/* Username */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="johndoe"
        />
        <IconButton color="primary" aria-label="Edit Username" component="span">
          <EditIcon />
        </IconButton>

        {/* Mobile */}
        <TextField
          label="Mobile"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue="123-456-7890"
        />
        <IconButton color="primary" aria-label="Edit Mobile" component="span">
          <EditIcon />
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfile;
