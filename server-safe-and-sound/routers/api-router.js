const apiRouter = require('express').Router();
const { usersRouter } = require('./usersRouter');

apiRouter.use('/users', usersRouter);

apiRouter.use('/', (req, res) => {
    res.status(404).send({ msg: 'This is the Safe+Sound server' });
});

apiRouter.use('/*', (req, res) => {
    res.status(404).send({ msg: 'Path not found' });
});

module.exports = apiRouter;
