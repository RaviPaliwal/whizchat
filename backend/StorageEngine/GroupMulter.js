const multer = require("multer");
const path = require("path");


const GroupAvatarStorage = multer.diskStorage({
  destination: "./GroupData/Avatars",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.params.id + ext);
  },
});

const uploadGroupAvatar = multer({ storage: GroupAvatarStorage }).single("profile");

module.exports = uploadGroupAvatar;
