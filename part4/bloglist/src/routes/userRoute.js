const express = require('express');
const { registerUser, getAllUsers } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);

module.exports = router;
