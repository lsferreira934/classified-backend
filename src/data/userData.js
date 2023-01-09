const database = require("../infra/database");

exports.getAllUsers = () => {
	return database.query("SELECT * FROM training.users");
};

exports.getUser = (user) => {
	return database.query(`SELECT * FROM training.users u WHERE u.${Object.keys(user)} = $<${Object.keys(user)}>`, { ...user });
};

exports.createUser = (user) => {
	const column = Object.keys(user).join(", ");
	const values = Object.keys(user)
		.map((u) => `$<${u}>`)
		.join(", ");
	const returning = Object.keys(user)
		.filter((key) => key !== "password")
		.join(", ");
	return database.query(`INSERT INTO training.users(${column}) VALUES(${values})  RETURNING ${returning}`, { ...user });
};

exports.updateUser = (id, body) => {
	return database.query(
		`UPDATE training.users SET ${Object.keys(body)
			.map((user) => `${user} = $<${user}>`)
			.join(", ")} WHERE id = $<id> RETURNING ${Object.keys(body).join(", ")}`,
		{ ...body, id }
	);
};

exports.deleteUser = (id) => {
	return database.query(`DELETE FROM training.users WHERE id = $<id> RETURNING *`, { id });
};
