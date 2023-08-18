const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const path = require("path");
const fs = require('fs/promises')
exports.register = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ email: "User with this email already exists" });
    }
    const ext = path.extname(req.file.originalname);
    const filename = req.body.username + ext;

    const newUser = new UserModel({
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
      avatar: filename,
    });

    // Hash password before saving in the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const savedUser = await newUser.save();

    // Create JWT payload
    const payload = {
      username: savedUser.username,
      id: savedUser._id,
      email: savedUser.email,
      // You can include other user data as needed
    };

    // Sign token
    const token = jwt.sign(payload, "Whizchat@spsu", { expiresIn: "24h" });

    res.json({
      success: true,
      token: token,
      ID: savedUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ emailnotfound: "User not found with this email" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }

    // Create JWT payload
    const payload = {
      username: user.username,
      id: user._id,
      email: user.email,
      // You can include other user data as needed
    };

    // Sign token
    const token = jwt.sign(payload, "Whizchat@spsu", { expiresIn: "24h" });

    res.json({
      success: true,
      token: token,
      ID: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAvatar = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({email});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const avatarFilename = user.avatar;
    if (!avatarFilename) {
      return res.status(404).json({ message: 'User has no avatar' });
    }

    const avatarPath = path.join(
      __dirname,
      "..",
      "UserData",
      "Avatars",
      avatarFilename
    );

    res.sendFile(avatarPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};

exports.deleteAccount = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });
    console.log(email)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const avatarFilename = user.avatar;
    const avatarPath = path.join(__dirname, "..", "UserData", "Avatars", avatarFilename);
    console.log(avatarPath)
    // Delete the user's avatar file
    await fs.unlink(avatarPath);

    // Delete the user from the database
    await UserModel.findByIdAndDelete(user._id);

    res.json({ success: true, message: "User account deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
