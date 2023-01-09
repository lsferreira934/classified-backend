require("dotenv").config();
const axios = require("axios");
const userService = require("../service/userService");
const userRoleService = require("../service/userRoleService");

const request = (url, method, data) => {
	return axios({ url: `${process.env.DOMAIN}/-/v1/${url}`, method, data, validateStatus: false });
};

const randomUser = {
	name: "Leandro",
	last_name: "da Silva Ferreira",
	password: "123456",
	email: "leandrosf934@gmail.com",
	phone: "13997591181",
	role: "admin",
};

test("Should created new user", async () => {
	const response = await request(`signup`, "POST", { ...randomUser });
	expect(response.status).toBe(201);
	const newUser = response.data;

	const userRoleFound = await userRoleService.getUserRoles({ user_id: newUser.id, role_id: newUser.role_id });

	expect(userRoleFound.user_id).toBe(newUser.id);
	expect(userRoleFound.role_id).toBe(newUser.role_id);

	await userRoleService.deleteUserRole({ id: userRoleFound.id });
	await userService.deleteUser({ id: newUser.id });
});
