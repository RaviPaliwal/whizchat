import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const AvatarUploadDialog = ({ open, onClose, userEmail }) => {
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
  };

  const handleUpload = async () => {
    try {
      // Create a FormData object and append the selected file to it
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      // Define the API endpoint and headers
      const apiUrl = `http://localhost:5000/api/updateavatar/${userEmail}`;
      const headers = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };

      // Make a PUT request to upload the avatar
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
        headers: headers,
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.text();
        console.log("Upload successful:", data);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Avatar</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userEmail}
          InputProps={{ readOnly: true }}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpload} color="primary">
          Upload
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarUploadDialog;
