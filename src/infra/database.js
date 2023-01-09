require("dotenv").config();
const pgp = require("pg-promise")();

const conection = {
	user: process.env.USER_DB,
	password: process.env.PASSWORD_DB,
	host: process.env.HOST_DB,
	port: process.env.PORT_DB,
	database: process.env.DATABASE_DB,
	idleTimeoutMillis: 1,
	max: 20,
	allowExitOnIdle: true,
};

const db = pgp(conection);

module.exports = db;
