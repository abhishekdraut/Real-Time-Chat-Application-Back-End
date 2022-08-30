const express = require("express");
const auth = require("./auth");
const user = require("./user");
const msg = require("./message");
const friends = require("./friends");

module.exports = function (app) {
  app.use(express.json());
  app.use("/auth", auth);
  app.use("/user", user);
  app.use("/message", msg);
  app.use("/friends", friends);
};
