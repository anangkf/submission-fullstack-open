const express = require('express');
const { resetDB } = require('../controllers/testing.controller');

const router = express.Router();

router.post('/reset', resetDB);

module.exports = router;
