const userRolesData = require("../data/userRolesData");
const { v4: uuidv4 } = require("uuid");

exports.getAllUserAndRoles = async () => {
	return await userRolesData.getAllUserRoles();
};

exports.getUserRoles = async (id) => {
	const [userRoleFound] = await userRolesData.getUserRole(id);
	if (!userRoleFound) throw new Error("Role and User not found");
	return userRoleFound;
};

exports.createUserRole = async (userRole) => {
	const [userRoleFound] = await userRolesData.getUserRole({ user_id: userRole.user_id, role_id: userRole.role_id });
	if (userRoleFound) throw new Error("Role and User already registered");
	const [newUserRole] = await userRolesData.createUserRole({ ...userRole, id: uuidv4() });
	return newUserRole;
};

exports.updateUserRole = async (id, body) => {
	const [userRoleFound] = await userRolesData.getUserRole({ ...id });
	if (!userRoleFound) throw new Error("Role and User not found");
	const [userRoleModify] = await userRolesData.updateUserRole(userRoleFound.id, body);
	return userRoleModify;
};

exports.deleteUserRole = async (id) => {
	const [userRoleFound] = await userRolesData.getUserRole({ ...id });
	if (!userRoleFound) throw new Error("Role and User not found");
	const [userRoleDeleted] = await userRolesData.deleteUserRole(userRoleFound.id);
	return userRoleDeleted;
};
