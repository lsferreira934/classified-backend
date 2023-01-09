const userRoleService = require("../service/userRoleService");
const roleService = require("../service/roleService");

exports.roleExist = async (req, res, next) => {
	try {
		const { role } = req.body;
		const roleFound = await roleService.getRoles({ name: role });
		req.$role_id = roleFound.id;
		next();
	} catch (e) {
		next(e);
	}
};
