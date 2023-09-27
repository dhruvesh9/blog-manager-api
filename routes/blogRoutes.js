// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Define routes
router.get('/posts', blogController.getBlogPosts);

router.post('/posts',blogController.createBlogPost);

router.delete('/posts/:id',blogController.deleteBlogPost);

module.exports = router;