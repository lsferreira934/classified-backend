const database = require("../infra/database");

exports.getAllUserRoles = () => {
	return database.query(`SELECT * FROM training.user_roles`);
};

exports.getUserRole = (userRole) => {
	const query = `${
		Object.keys(userRole).length > 1
			? Object.keys(userRole)
					.map((user) => `ur.${user} = $<${user}>`)
					.join(" AND ")
			: Object.keys(userRole).map((user) => `ur.${user} = $<${user}>`)
	}`;
	return database.query(`SELECT * FROM training.user_roles ur WHERE ${query}`, { ...userRole });
};

exports.createUserRole = (userRole) => {
	return database.query(`INSERT INTO training.user_roles (id, user_id, role_id) VALUES($<id>, $<user_id>, $<role_id>)`, { ...userRole });
};

exports.updateUserRole = (id, body) => {
	return database.query(
		`UPDATE training.user_roles SET ${Object.keys(body)
			.map((user) => `${user} = $<${user}>`)
			.join(", ")} WHERE id = $<id> RETURNING ${Object.keys(body).join(", ")}`,
		{ ...body, id }
	);
};

exports.deleteUserRole = (id) => {
	return database.query(`DELETE FROM training.user_roles WHERE id = $<id> RETURNING *`, { id });
};
