const express = require('express');
const {
  registerUser, getAllUsers, getUserById,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

module.exports = router;
