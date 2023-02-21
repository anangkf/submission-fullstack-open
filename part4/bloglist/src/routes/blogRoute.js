const express = require('express');
const {
  getAllPosts, createBlog, deleteBlogByID, updateBlogByID,
} = require('../controllers/blog.controller');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createBlog);
router.delete('/:id', deleteBlogByID);
router.put('/:id', updateBlogByID);

module.exports = router;
