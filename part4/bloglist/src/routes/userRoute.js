const express = require('express');
const { registerUser, getAllUsers, userLogin } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.post('/login', userLogin);

module.exports = router;
