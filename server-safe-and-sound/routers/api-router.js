const apiRouter = require("express").Router();
const { usersRouter } = require("./usersRouter");
const { emergencyPushRouter } = require("./emergencyPushRouter");

apiRouter.use("/users", usersRouter);

apiRouter.use("/emergency_push", emergencyPushRouter);

apiRouter.use("/", (req, res) => {
  res.status(404).send({ msg: "This is the API homepage" });
});

apiRouter.use("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = apiRouter;
