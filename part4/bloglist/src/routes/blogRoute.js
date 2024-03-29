const express = require('express');
const {
  getAllBlogs, createBlog, deleteBlogByID, updateBlogByID, getBlogById, addComment,
} = require('../controllers/blog.controller');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.delete('/:id', deleteBlogByID);
router.put('/:id', updateBlogByID);
router.post('/:id/comments', addComment);

module.exports = router;
