const database = require("../infra/database");

exports.getAllRoles = () => {
	return database.query("SELECT * FROM training.roles");
};

exports.getRole = (role) => {
	return database.query(`SELECT * FROM training.roles r WHERE r.${Object.keys(role)} = $<${Object.keys(role)}>`, { ...role });
};

exports.createRole = (role) => {
	return database.query(`INSERT INTO training.roles (id, name) VALUES($<id>, $<name>) returning *`, { ...role });
};

exports.updateRole = (id, body) => {
	const set = Object.keys(body)
		.map((user) => `${user} = $<${user}>`)
		.join(", ");
	const returning = Object.keys(body).join(", ");
	return database.query(`UPDATE training.roles SET ${set} WHERE id = $<id> RETURNING ${returning}`, { ...body, id });
};

exports.deleteRole = (id) => {
	return database.query(`DELETE FROM training.roles WHERE id = $<id> RETURNING *`, { id });
};
