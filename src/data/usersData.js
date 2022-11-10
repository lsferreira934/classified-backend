const database = require('../infra/database');

exports.getAllUsers = () => {
    return database.query('SELECT * FROM classified.users')
};

exports.getUser = (user) => {
    return database.query(`SELECT * FROM classified.users u WHERE u.${Object.keys(user)} = $<${Object.keys(user)}>`, { ...user });
};

exports.createUser = (user) => {
    const column = Object.keys(user).join(', ');
    const values = Object.keys(user).map(u => `$<${u}>`).join(', ');
    const returning = Object.keys(user).filter(key => key !== 'password').join(', ');
    return database.query(`INSERT INTO classified.users(${column}) VALUES(${values})  returning ${returning}`, { ...user });
};

exports.updateUser = (id, body) => {
    return database.query(`UPDATE classified.users SET ${Object.keys(body).map(user => `${user} = $<${user}>`).join(', ')} WHERE id = $<id> RETURNING ${Object.keys(body).join(', ')}`, { ...body, id })
};

exports.deleteUser = (id) => {
    return database.query(`DELETE FROM classified.users WHERE id = $<id> RETURNING *`, { id })
};