const express = require('express');
const router = express.Router();
const {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
} = require('../controllers/blogController');

// Create a new blog post
router.post('/posts', createBlogPost);

// Read all blog posts
router.get('/posts', getBlogPosts);

// Read a specific blog post by ID
router.get('/posts/:id', getBlogPostById);

// Update a blog post by ID (PUT or PATCH)
router.put('/posts/:id', updateBlogPostById);
// or
router.patch('/posts/:id', updateBlogPostById);

// Delete a blog post by ID
router.delete('/posts/:id', deleteBlogPostById);

module.exports = router;
