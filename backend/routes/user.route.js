const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const UserController = require("../controllers/user.controller");
const uploadAvatar = require("../StorageEngine/Multer");
const getFileName = require("../middlewares/getFileName");

// Middleware
router.use(bodyParser.json());

// User registration
router.post("/register", UserController.register);

// Get user avatar
router.get("/user/:email/avatar", UserController.getAvatar);

// User login
router.post("/login", UserController.login);

// Delete user account
router.post("/deleteaccount/:email", UserController.deleteAccount);

// Update user avatar
router.use('/updateavatar/:email', getFileName);
router.put('/updateavatar/:email', uploadAvatar, UserController.updateAvatar);

router.get('/users/search',UserController.searchUsers);
router.get('/user/:id',UserController.getUserById);
router.put('/user/:userId/:status',UserController.updateLastseen)
router.get('/user/lastseen/:userId',UserController.getLastseen)
router.put('/user/update/:email/:username/:name/:mobile',UserController.updateUserDetails)
module.exports = router;
