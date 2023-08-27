const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const UserModel = require("../models/user.model");

const secretKey = "Whizchat@spsu"; // Replace with a secure secret key

// Helper function to generate token
function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email
  };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
}

// Helper function to handle errors
function handleError(res, error) {
  console.error(error);
  res.status(500).json({ success: false, message: "Internal server error" });
}

// Path to avatar directory
const avatarDir = path.join(__dirname, "..", "UserData", "Avatars");


// Register a user
exports.register = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success:false,message: "User with this email already exists" });
    }

    const newUser = new UserModel({
      username: req.body.username,
      name:req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.json({
      success: true,
      token: token,
      ID: savedUser._id
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success:false,message: "User not found with this email" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ success:false,message: "Password incorrect" });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get the avatar of a user
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

    const avatarPath = path.join(avatarDir, avatarFilename);
    res.sendFile(avatarPath);
  } catch (error) {
    handleError(res, error);
  }
};

// Update the avatar of a user
exports.updateAvatar = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });

    const newAvatarFile = req.file;
    if (!newAvatarFile) {
      return res.status(400).json({ message: "No new avatar file provided" });
    }

    const newExt = path.extname(newAvatarFile.originalname);
    const newFilename = user.username + newExt;
    user.avatar = newFilename;
    await user.save();

    const newAvatarPath = path.join(avatarDir, newFilename);
    await fs.rename(newAvatarFile.path, newAvatarPath);

    res.json({ success: true, message: "Avatar updated successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a user account to be saperated from this as Many Dependecies Should 
//deleted 
exports.deleteAccount = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success:false,message: "User not found" });
    }

    if(user.avatar!=null){
      const avatarFilename = user.avatar;
      const avatarPath = path.join(avatarDir, avatarFilename);
  
      await fs.unlink(avatarPath);
    }

    await UserModel.findByIdAndDelete(user._id);

    res.json({ success: true, message: "User account deleted" });
  } catch (error) {
    handleError(res, error);
  }
};


exports.searchUsers = async (req, res) => {
  const username  = req.query.username;
  try {
    const users = await UserModel.find({ username: { $regex: username, $options: 'i' } });
    res.json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error searching users.' });
  }
};



