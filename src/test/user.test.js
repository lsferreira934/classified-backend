require("dotenv").config();
const axios = require("axios");
const userService = require("../service/userService");

const request = (url, method, data) => {
	return axios({ url: `${process.env.DOMAIN}/-/v1/${url}`, method, data, validateStatus: false });
};

const randomUser = {
	name: "Leandro",
	last_name: "da Silva Ferreira",
	password: "123456",
	email: "leandrosf934@gmail.com",
	phone: "13997591181",
	zipcode: "12228232",
	state: "SP",
	city: "São josé dos Campos",
	address: "Av dos Resédas - nº201 - Terra Brasilis",
	country: "Brasil",
};

test("Should get user", async () => {
	const createdUser = await userService.createUser({ ...randomUser });
	const response = await request(`user/${createdUser.id}`, "GET");
	expect(response.status).toBe(200);
	const userFound = response.data;
	expect(userFound.id).toBe(createdUser.id);
	await userService.deleteUser({ id: userFound.id });
});

test("Should create user", async () => {
	const response = await request(`user`, "POST", { ...randomUser });
	expect(response.status).toBe(201);
	const createdUser = response.data;

	const userFound = await userService.getUser({ id: createdUser.id });
	expect(createdUser.id).toBe(userFound.id);
	await userService.deleteUser({ id: createdUser.id });
});

test("Should update user", async () => {
	const createdUser = await userService.createUser({ ...randomUser });
	const modifyUser = { name: "Joe Brasil" };
	const response = await request(`user/${createdUser.id}`, "PUT", { ...modifyUser });
	expect(response.status).toBe(200);

	const updatedUser = response.data;

	expect(updatedUser.name).toBe("Joe Brasil");
	await userService.deleteUser({ id: createdUser.id });
});

test("Should delete user", async () => {
	const createdUser = await userService.createUser({ ...randomUser });

	const response = await request(`user/${createdUser.id}`, "DELETE");
	expect(response.status).toBe(200);
	const deletedUser = response.data;

	expect(deletedUser.id).toBe(createdUser.id);
});
