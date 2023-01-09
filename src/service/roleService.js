const rolesData = require("../data/rolesData");
const { v4: uuidv4 } = require("uuid");

exports.getAllRoles = async () => {
	return await rolesData.getAllRoles();
};

exports.getRoles = async (id) => {
	const [roleFound] = await rolesData.getRole(id);
	if (!roleFound) throw new Error("Role not found");
	return roleFound;
};

exports.createRole = async (role) => {
	const [roleFound] = await rolesData.getRole({ name: role.name });
	if (roleFound) throw new Error("Role already registered");
	const [newRole] = await rolesData.createRole({ ...role, id: uuidv4() });
	return newRole;
};

exports.updateRole = async (id, body) => {
	const [roleFound] = await rolesData.getRole(id);
	if (!roleFound) throw new Error("Role not found");
	const [roleModify] = await rolesData.updateRole(roleFound.id, body);
	return roleModify;
};

exports.deleteRole = async (id) => {
	const [roleFound] = await rolesData.getRole({ name: role.name });
	if (!roleFound) throw new Error("Role not found");
	const [roleDeleted] = await rolesData.deleteRole(roleFound.id);
	return roleDeleted;
};
