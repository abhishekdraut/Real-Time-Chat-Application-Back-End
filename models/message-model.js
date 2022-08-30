const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    referance: "User",
    minlength: 5,
    maxlength: 255,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    referance: "User",
    minlength: 5,
    maxlength: 255,
  },
  date: {
    type: String,
    default: `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`,
  },
  time:{
    type:String,
    default:`${new Date().getHours()}:${
      new Date().getMinutes()}`
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
