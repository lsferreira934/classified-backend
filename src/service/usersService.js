const usersData = require('../data/usersData');
const { v4: uuidv4 } = require("uuid");

exports.getAllUsers = async () => {
    return usersData.getAllUsers();
}

exports.getUser = async (user) => {
    const [userFound] = await usersData.getUser({ ...user });
    if (!userFound) throw new Error('User not found');
    return userFound;
}

exports.createUser = async (user) => {
    const [userFound] = await usersData.getUser({ email: user.email });
    if (!!userFound) throw new Error('User already registered ');
    const [newUser] = await usersData.createUser({ ...user, id: uuidv4() })
    return newUser;
}

exports.updateUser = async (id, body) => {
    const [userFound] = await usersData.getUser({ ...id });
    if (!userFound) throw new Error('User not found');
    const [userModify] = await usersData.updateUser(userFound.id, body);
    return userModify;
}

exports.deleteUser = async (id) => {
    const [userFound] = await usersData.getUser({ ...id });
    if (!userFound) throw new Error('User not found');
    const [userDeleted] = await usersData.deleteUser(userFound.id);
    return userDeleted;
}
