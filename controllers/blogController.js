const fs = require('fs');
const path = require('path');
const BlogPost = require('../models/BlogPost'); // Import the BlogPost model

// Function to generate a unique file name (you can customize this logic)
function generateUniqueFileName() {
    return `blogpost_${Date.now()}.json`;
}

// Get all blog posts
exports.getBlogPosts = (req, res) => {
    const blogFolder = path.join(__dirname, '..', 'assets/data'); // Path to the 'blogs' folder

    // Read the contents of the 'blogs' folder
    fs.readdir(blogFolder, (err, files) => {
        if (err) {
            console.error('Error reading blog folder:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const blogPosts = [];

        // Loop through the files in the folder
        files.forEach((file) => {
            if (file.endsWith('.json')) {
                // Read the content of each JSON file
                const filePath = path.join(blogFolder, file);

                try {
                    const rawData = fs.readFileSync(filePath);
                    const blogPostData = JSON.parse(rawData);

                    // Create a BlogPost object
                    const blogPost = new BlogPost({
                        id: file, // Use the filename as the ID
                        ...blogPostData // Spread the properties from JSON data
                    });

                    blogPosts.push(blogPost);
                } catch (jsonError) {
                    console.error('Error parsing JSON file:', jsonError);
                }
            }
        });

        // Send the array of blog posts as a response
        res.json(blogPosts);
    });
};

// Create a new blog post
exports.createBlogPost = (req, res) => {
    // Extract the blog post data from the request body
    const newBlogPost = req.body;

    // Ensure the required fields (title and content) are present
    if (!newBlogPost.title || !newBlogPost.content) {
        return res.status(400).json({ error: 'Title and content are required fields.' });
    }

    if (!newBlogPost.id) {
        // Generate a unique file name for the new blog post
        const uniqueFileName = generateUniqueFileName();
        // Assign the generated ID to the blog post
        newBlogPost.id = uniqueFileName;
    }

    // Define the path to the new blog post file
    const filePath = path.join(__dirname, '..', 'assets/data', newBlogPost.id);

    // Write the blog post data to the new file
    fs.writeFile(filePath, JSON.stringify(newBlogPost), (err) => {
        if (err) {
            console.error('Error writing blog post:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'Blog post created successfully' });
    });
};

// Delete a blog post by ID
exports.deleteBlogPost = (req, res) => {
    // Extract the ID from the URL parameters
    const { id } = req.params;

    // Define the path to the blog post file
    const filePath = path.join(__dirname, '..', 'assets/data', id);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlinkSync(filePath);
        return res.status(200).json({ message: 'Blog post deleted successfully' });
    } else {
        return res.status(404).json({ error: 'Blog post not found' });
    }
};
