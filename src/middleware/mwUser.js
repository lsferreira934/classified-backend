const userService = require("../service/userService");
const bcrypt = require("bcrypt");

exports.userData = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userFound = await userService.getUser({ email: email });
		const passwordIsValid = bcrypt.compareSync(password, userFound.password);
		if (!passwordIsValid) throw new Error("Invalid email or password");
		req.$user = userFound;
		next();
	} catch (e) {
		next(e);
	}
};

exports.userDataById = async (req, res, next) => {
	try {
		const userId = req.$userId;
		const userFound = await userService.getUser({ id: userId });
		req.$user = userFound;
		next();
	} catch (error) {}
};
