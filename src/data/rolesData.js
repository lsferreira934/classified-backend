const database = require('../infra/database');

exports.getUserRole = (userRole) => {
    return database.query(`SELECT * FROM classified.user_role ur WHERE ur.${Object.keys(role)} = $<${Object.keys(role)}>`, { ...userRole });
}

exports.createUserRole = (userRole) => {
    return database.query(`INSERT INTO classified.user_role (id, user_id, role_id) VALUES($<id>, $<user_id>, $<role_id>)`, { ...userRole });
}

exports.updateUserRole = (userRole) => {
    return database.query(`UPDATE classified.user_role SET ${Object.keys(userRole).map(user => `${user} = $<${user}>`).join(', ')}`, { ...userRole });
}

exports.deleteUserRole = (userRole) => {
    return database.query(`DELETE FROM classified.user_role ur WHERE ur.${Object.keys(userRole)} = $<${Object.keys(userRole)}>`, { ...userRole });
}

exports.createRole = (role) => {
    return database.query(`INSERT INTO classified.user_role (id, name) VALUES($<id>, $<name>)`, { ...role });
}

exports.deleteUserRole = (role) => {
    return database.query(`DELETE FROM classified.user_role ur WHERE ur.${Object.keys(role)} = $<${Object.keys(role)}>`, { ...role });
}