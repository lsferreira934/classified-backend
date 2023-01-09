const tokenService = require("../service/tokenService");
const jwt = require("jsonwebtoken");

exports.tokenGenerator = (req, res, next) => {
	try {
		const userId = req.$user;
		req.$newToken = jwt.sign({ id: userId.id }, process.env.SECRET_JWT, {
			expiresIn: 3600, // 1 hours
		});
		next();
	} catch (error) {
		next(error);
	}
};

exports.verifyToken = (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) throw new Error("Invalid token");

		const decoded = jwt.verify(token, process.env.SECRET_JWT);

		req.$userId = decoded.id;
		req.$oldToken = token;
		next();
	} catch (error) {
		next(error);
	}
};

exports.insertTokenBlacklist = async (req, res, next) => {
	try {
		const oldToken = req.$oldToken;
		const userId = req.$userId;
		await tokenService.insertTokenBlacklist({ userId: userId, token: oldToken });
		next();
	} catch (error) {
		next(error);
	}
};
