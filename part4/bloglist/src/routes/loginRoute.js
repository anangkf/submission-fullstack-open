const express = require('express');
const { userLogin } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', userLogin);

module.exports = router;
