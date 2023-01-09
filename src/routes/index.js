const express = require("express");
const userRoute = require("../routes/user");
const authRoute = require("../routes/auth");

const router = express.Router();

const apiVersion = "/-/v1";

router.use(apiVersion, [userRoute, authRoute]);

module.exports = router;
