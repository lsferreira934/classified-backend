const express = require('express');
const router = express.Router();

const mwJwt = require('../middleware/mwJwt');
const mwUser = require('../middleware/mwUser');

router.post('/login', [mwUser.userData, mwJwt.tokenGenerator], (req, res, next) => {
    try {
        res.status(200).json({
            user: {
                id: req.$user.id,
                name: req.$user.name,
                last_name: req.$user.last_name,
                email: req.$user.email,
                phone: req.$user.phone,
                zipcode: req.$user.zipcode,
                state: req.$user.state,
                address: req.$user.address,
                country: req.$user.country,
                city: req.$user.city
            }, token: req.$token
        })
    } catch (error) {
        next(error)
    }
});



module.exports = router;