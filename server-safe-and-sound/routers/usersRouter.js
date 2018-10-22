const usersRouter = require('express').Router();
const { assignPushToken } = require('../controllers/users')

usersRouter.route('/:push_token')
  .post(assignPushToken)

module.exports = {
  usersRouter
}
