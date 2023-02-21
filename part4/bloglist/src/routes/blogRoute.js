const express = require('express');
const { getAllPosts, createBlog, deleteBlogByID } = require('../controllers/blog.controller');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createBlog);
router.delete('/:id', deleteBlogByID);

module.exports = router;
