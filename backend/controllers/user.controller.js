const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const UserModel = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new UserModel({
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
    });

    // Hash password before saving in the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const savedUser = await newUser.save();

    // Create JWT payload
    const payload = {
      id: savedUser._id,
      email: savedUser.email,
      // You can include other user data as needed
    };

    // Sign token
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '24h' });

    res.json({
      success: true,
      token: token,
      ID: savedUser._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ passwordincorrect: 'Password incorrect' });
    }

    // Create JWT payload
    const payload = {
      id: user._id,
      email: user.email
      // You can include other user data as needed
    };

    // Sign token
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '24h' });

    res.json({
      success: true,
      token: token,
      ID : user._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};