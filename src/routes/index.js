const express = require('express');
const userRoute = require('../routes/user');
const loginRoute = require('../routes/login');

const router = express.Router();

const apiVersion = '/-/v1'

router.use(apiVersion, [
    userRoute,
    loginRoute
]);

module.exports = router;