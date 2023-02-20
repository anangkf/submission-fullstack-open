const express = require('express');
const { getAllPosts, createBlog } = require('../controllers/blog.controller');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createBlog);

module.exports = router;
