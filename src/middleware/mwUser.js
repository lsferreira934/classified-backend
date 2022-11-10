const usersService = require('../service/usersService');
const bcrypt = require('bcrypt');

exports.userData = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userFound = await usersService.getUser({ email: email });
        const passwordIsValid = bcrypt.compareSync(password, userFound.password);
        if (!passwordIsValid) throw new Error('Invalid email or password');
        req.$user = userFound;
        next()
    } catch (e) {
        next(e)
    }
}