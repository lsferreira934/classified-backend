const userService = require("../service/userService");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res, next) => {
	try {
		const newUser = await userService.getAllUsers();
		newUser.forEach((user) => delete user.password);
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

exports.createUser = async (req, res, next) => {
	try {
		const { name, last_name, password, email, phone, zipcode, state, city, address, country } = req.body;
		const EncryptingPassword = bcrypt.hashSync(password, 10);
		const newUser = await userService.createUser({ name, last_name, password: EncryptingPassword, email, phone, zipcode, state, city, address, country });
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await userService.getUser({ id: userId });
		delete user.password;
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await userService.updateUser({ id: userId }, req.body);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await userService.deleteUser({ id: userId });
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
