const jwt = require("jsonwebtoken");

exports.tokenGenerator = (req, res, next) => {
    try {
        const userId = req.$user;
        req.$token = jwt.sign({ id: userId }, process.env.SECRET_JWT, {
            expiresIn: 3600 // 1 hours
        });
        next();
    } catch (error) {
        next(error);
    }
};

exports.check = (req, res, next) => {
    try {
        const userId = req.$user;
        const token = jwt.sign({ id: userId }, process.env.SECRET_JWT, {
            expiresIn: 3600 // 1 hours
        });
        req.$token = token
        next();
    } catch (error) {
        next(error);
    };
};