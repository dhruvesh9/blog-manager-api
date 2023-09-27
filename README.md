# Blog Post REST API

This is a Node.js Express REST API for managing blog posts. Blog posts are stored as individual files in a designated folder.

## Features

- Create a new blog post
- Retrieve a list of all blog posts
- Retrieve a specific blog post by filename
- Delete a blog post by filename

## Installation

1. **Clone this repository:**

   ```shell
   git clone https://github.com/yourusername/blog-post-rest-api.git
   ```shell


2. **Install dependencies:**

    ```shell
    npm install
    ```shell

3. **Start the server:**

    ```shell
    npm start
    ```shell

## Usage

### Create a New Blog Post (POST)
#### Endpoint: /api/blog
To create a new blog post, send a POST request with the following JSON payload:
    ```shell
    {
    "title": "Your Blog Post Title",
    "content": "Your Blog Post Content",
    "author": "Author Name",
    "publishDate": "YYYY-MM-DD",
    "tags": ["Tag1", "Tag2"],
    "imageUrl": "https://example.com/your-image.jpg"
    }
    ```shell


### Retrieve a List of All Blog Posts (GET)
#### Endpoint: /api/blog/posts
Send a GET request to retrieve a list of all blog posts.


### Delete a Blog Post (DELETE)
#### Endpoint: /api/blog/posts/:filename
Send a DELETE request, replacing :filename with the actual filename (without the .json extension) of the blog post you want to delete.

## Folder Structure
Blog posts are stored as JSON files in the blog-posts folder. Each file represents a blog post, and the filename is used as a unique identifier.

## Contributing
Contributions are welcome! Please follow our contribution guidelines.

## License
This project is licensed under the License Name. See the LICENSE file for details.