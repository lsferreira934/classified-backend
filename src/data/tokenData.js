const database = require("../infra/database");

exports.insertTokenBlacklist = async (token) => {
	return await database.query("INSERT INTO training.blacklist_tokens (id, user_id, token) VALUES ($<id>, $<userId>, $<token>)", { ...token });
};
