const userData = require("../data/userData");
const { v4: uuidv4 } = require("uuid");

exports.getAllUsers = async () => {
	return await userData.getAllUsers();
};

exports.getUser = async (user) => {
	const [userFound] = await userData.getUser({ ...user });
	if (!userFound) throw new Error("User not found");
	return userFound;
};

exports.createUser = async (user) => {
	const [userFound] = await userData.getUser({ email: user.email });
	if (!!userFound) throw new Error("User already registered");
	const [newUser] = await userData.createUser({ ...user, id: uuidv4() });
	return newUser;
};

exports.updateUser = async (id, body) => {
	const [userFound] = await userData.getUser({ ...id });
	if (!userFound) throw new Error("User not found");
	const [userModify] = await userData.updateUser(userFound.id, body);
	return userModify;
};

exports.deleteUser = async (id) => {
	const [userFound] = await userData.getUser({ ...id });
	if (!userFound) throw new Error("User not found");
	const [userDeleted] = await userData.deleteUser(userFound.id);
	return userDeleted;
};
