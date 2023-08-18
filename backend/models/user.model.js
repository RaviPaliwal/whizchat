const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    name: String,
    mobile: String,
    email: {
      require: true,
      unique: true,
      type: String,
      lowercase: true,
      validate: {
        validator(mainEmail) {
          // eslint-disable-next-line max-len
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;

          if (mainEmail) {
            return emailRegex.test(mainEmail);
          } else {
            return true;
          }
        },
        message: `Email is not a valid email.`,
      },
    },
    password: String,
    status: {
      type: String,
      default: "active",
    },
    avatar: {
      type: String, // Store the avatar file name
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
