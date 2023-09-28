// controllers/blogController.js
const BlogPost = require('../models/BlogPost');

// Create a new blog post
exports.createBlogPost = async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create(req.body);
        res.status(201).json(newBlogPost);
    } catch (err) {
        console.error('Error creating blog post:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a list of all blog posts
exports.getBlogPosts = async (req, res) => {
    console.log('getBlogPosts');
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json(blogPosts);
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific blog post by ID
exports.getBlogPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const blogPost = await BlogPost.findById(postId);
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json(blogPost);
    } catch (err) {
        console.error('Error fetching blog post by ID:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a blog post by ID (PUT or PATCH)
exports.updateBlogPostById = async (req, res) => {
    const postId = req.params.id;
    const updatedData = req.body; // The data to update

    try {
        // Find the blog post by ID and update it
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
            postId,
            updatedData,
            { new: true } // Return the updated document
        );

        if (!updatedBlogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.status(200).json(updatedBlogPost);
    } catch (err) {
        console.error('Error updating blog post by ID:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete a specific blog post by ID
exports.deleteBlogPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const deletedBlogPost = await BlogPost.findByIdAndDelete(postId);
        if (!deletedBlogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog post by ID:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
