const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const uploadAvatar = require("../StorageEngine/Multer");

router.post("/register", uploadAvatar, UserController.register);
router.get("/user/:email/avatar", UserController.getAvatar);
router.post("/login", UserController.login);
router.post("/deleteaccount/:email", UserController.deleteAccount);
router.put('/updateavatar/:email',uploadAvatar,UserController.updateAvatar);
module.exports = router;
