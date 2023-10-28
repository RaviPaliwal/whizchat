const path = require('path'); // Import the 'path' module
const UserModel = require('../models/user.model'); // Import your UserModel here

const getFilename = async (req, res, next) => {
  try {
    // Find user by email
    const user = await UserModel.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Extract username from the user (you might have a different field for username)
    const username = user.username; // Update this line based on your user schema
    // console.log(username);
    req.username = username;
    next();
  } catch (error) {
    console.error('Error in getFilename middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getFilename;
