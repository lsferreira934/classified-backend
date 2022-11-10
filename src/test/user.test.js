require('dotenv').config();
const axios = require('axios');
const usersService = require('../service/usersService');

const request = (url, method, data) => {
    return axios({ url: `${process.env.DOMAIN}/-/v1/${url}`, method, data, validateStatus: false });
};

const randomUser = async (quantity = 1) => {
    const response = await axios(`https://randomuser.me/api/?results=${quantity}`)
    return response.data.results.map((user) => ({
        name: user.name.first,
        last_name: user.name.last,
        password: user.login.password,
        email: user.email,
        phone: user.phone,
        zipcode: user.location.postcode,
        state: user.location.state,
        city: user.location.city,
        address: `${user.location.street.name} - ${user.location.street.number}`,
        country: user.location.country
    }))
}


test('Should get user', async () => {
    const [exempleUser] = await randomUser();
    const createdUser = await usersService.createUser({ ...exempleUser })
    const response = await request(`/user/${createdUser.id}`, 'GET');
    expect(response.status).toBe(200);
    const userFound = response.data;
    expect(userFound.id).toBe(createdUser.id)
    await usersService.deleteUser({ id: userFound.id })
});

test('Should create user', async () => {
    const [exempleUser] = await randomUser();
    const response = await request(`/user`, 'POST', { ...exempleUser });
    expect(response.status).toBe(201);
    const createdUser = response.data;

    const userFound = await usersService.getUser({ id: createdUser.id });
    expect(createdUser.id).toBe(userFound.id);
    await usersService.deleteUser({ id: createdUser.id });
});

test('Should update user', async () => {
    const [exempleUser] = await randomUser();

    const createdUser = await usersService.createUser({ ...exempleUser });
    const modifyUser = { name: "Joe Brasil" };
    const response = await request(`/user/${createdUser.id}`, 'PUT', { ...modifyUser });
    expect(response.status).toBe(200);

    const updatedUser = response.data;

    expect(updatedUser.name).toBe("Joe Brasil");
    await usersService.deleteUser({ id: createdUser.id });
});

test('Should delete user', async () => {
    const [exempleUser] = await randomUser();
    const createdUser = await usersService.createUser({ ...exempleUser });

    const response = await request(`/user/${createdUser.id}`, 'DELETE');
    expect(response.status).toBe(200);
    const deletedUser = response.data;

    expect(deletedUser.id).toBe(createdUser.id)
});