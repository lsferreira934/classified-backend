const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");

const mwJwt = require("../middleware/mwJwt");
const mwUser = require("../middleware/mwUser");
const mwRoles = require("../middleware/mwRoles");

router.post("/signin", [mwUser.userData, mwJwt.tokenGenerator, authControllers.signin]);

router.post("/signup", [mwRoles.roleExist, authControllers.createUser, authControllers.createUserRole]);

router.post("/verifyToken", [mwJwt.verifyToken, mwUser.userDataById, authControllers.verifyUserToken]);

router.post("/signout", [mwJwt.verifyToken, mwJwt.insertTokenBlacklist, authControllers.signout]);

module.exports = router;
