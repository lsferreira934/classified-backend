const userService = require("../service/userService");
const userRoleService = require("../service/userRoleService");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
	try {
		const { name, last_name, password, email, phone } = req.body;
		const EncryptingPassword = bcrypt.hashSync(password, 10);
		const newUser = await userService.createUser({ name, last_name, password: EncryptingPassword, email, phone});
		req.$newUser = newUser;
		next();
	} catch (error) {
		next(error);
	}
};

exports.createUserRole = async (req, res, next) => {
	try {
		const role_id = req.$role_id;
		const newUser = req.$newUser;
		await userRoleService.createUserRole({ user_id: newUser.id, role_id: role_id });
		res.status(201).json({ ...newUser, role_id: role_id });
	} catch (error) {
		next(error);
	}
};

exports.verifyUserToken = async (req, res, next) => {
	try {
		res.status(200).json({ token: req.$oldToken, user: { id: req.$userId } });
	} catch (error) {
		next(error);
	}
};

exports.signin = (req, res, next) => {
	try {
		res.status(200).json({
			user: {
				id: req.$user.id,
				name: req.$user.name,
				last_name: req.$user.last_name,
				email: req.$user.email,
				phone: req.$user.phone,
				zipcode: req.$user.zipcode,
				state: req.$user.state,
				address: req.$user.address,
				country: req.$user.country,
				city: req.$user.city,
			},
			token: req.$newToken,
		});
	} catch (error) {
		next(error);
	}
};

exports.signout = (req, res, next) => {
	try {
		res.status(200).json();
	} catch (error) {
		next(error);
	}
};
