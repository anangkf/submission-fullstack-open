const express = require('express');
const {
  getAllBlogs, createBlog, deleteBlogByID, updateBlogByID,
} = require('../controllers/blog.controller');

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.delete('/:id', deleteBlogByID);
router.put('/:id', updateBlogByID);

module.exports = router;
