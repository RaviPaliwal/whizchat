const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const path = require("path");
const fs = require("fs/promises");

const secretKey = "Whizchat@spsu"; // Replace with a secure secret key

/**
 * Register a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.register = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "User with this email already exists" });
    }

    const ext = path.extname(req.file.originalname);
    const filename = req.body.username + ext;

    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
      avatar: filename,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const savedUser = await newUser.save();

    const payload = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });

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

/**
 * Login a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ emailnotfound: "User not found with this email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });

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

/**
 * Get the avatar of a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getAvatar = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const avatarFilename = user.avatar;
    if (!avatarFilename) {
      return res.status(404).json({ message: "User has no avatar" });
    }

    const avatarPath = path.join(__dirname, "..", "UserData", "Avatars", avatarFilename);

    res.sendFile(avatarPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a user account
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.deleteAccount = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const avatarFilename = user.avatar;
    const avatarPath = path.join(__dirname, "..", "UserData", "Avatars", avatarFilename);

    await fs.unlink(avatarPath);

    await UserModel.findByIdAndDelete(user._id);

    res.json({ success: true, message: "User account deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false ,message: "Internal server error" });
  }
};

/**
 * Update the avatar of a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.updateAvatar = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAvatarFile = req.file;
    if (!newAvatarFile) {
      return res.status(400).json({ message: "No new avatar file provided" });
    }

    const oldAvatarFilename = user.avatar;
    if (oldAvatarFilename) {
      const oldAvatarPath = path.join(__dirname, "..", "UserData", "Avatars", oldAvatarFilename);
      await fs.unlink(oldAvatarPath);
    }

    const newExt = path.extname(newAvatarFile.originalname);
    const newFilename = user.username + newExt;
    user.avatar = newFilename;
    await user.save();

    const newAvatarPath = path.join(__dirname, "..", "UserData", "Avatars", newFilename);
    await fs.rename(newAvatarFile.path, newAvatarPath);

    res.json({ success: true, message: "Avatar updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false,message: "Internal server error" });
  }
};