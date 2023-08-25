const multer = require("multer");
const path = require("path");
const AvatarStorage = multer.diskStorage({
  destination: "./UserData/Avatars",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.username + ext);
  },
});

const uploadAvatar = multer({ storage: AvatarStorage }).single("avatar");

module.exports = uploadAvatar;
