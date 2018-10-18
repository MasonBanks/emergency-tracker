const { updateUserDetails, getAllUsers } = require('../api');

getAllUsers();

updateUserDetails('lyRP73zikkRJS0SQGMJblxNoyMM2', { isFirstAider: true });
