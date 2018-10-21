const usersRouter = require('express').Router();

usersRouter.route('/:push_token')
  .post()
