const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.get('/users', userControllers.getAllUsers);
router.get('/user/:id', userControllers.getUser);
router.post('/user', userControllers.createUser);
router.put('/user/:id', userControllers.updateUser);
router.delete('/user/:id', userControllers.deleteUser);

module.exports = router;