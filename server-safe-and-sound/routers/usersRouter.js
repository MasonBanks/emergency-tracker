const usersRouter = require('express').Router();
const { assignPushToken, pushTestNode, getAllUsers } = require('../controllers/users')

usersRouter.route('/push/:uid/:token')
  .post(assignPushToken)

usersRouter.route('/test')
  .get(getAllUsers)

module.exports = {
  usersRouter
}
