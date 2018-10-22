const emergencyPushRouter = require("express").Router();
const { emergencyPush } = require("../controllers/emergencyPush");

emergencyPushRouter.route("/", emergencyPush);
