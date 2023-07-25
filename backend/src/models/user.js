const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name not provided"],
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    lowercase: true,
    trim: true,
    required: [true, "email address not provided"],
    validate: {
      validator: function (value) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: "{VALUE} is not a valid email address",
    },
  },
  
  password: {
    type: String,
    required: [true, "Please provide a password"],
    
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  
});

module.exports = mongoose.model("User", userSchema);
