// models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: String,
  publishDate: Date,
  tags: [String],
  imageUrl: String,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema,'blog-posts');

module.exports = BlogPost;
