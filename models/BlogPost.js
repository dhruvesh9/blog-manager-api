class BlogPost {
  constructor(id, title, content, author, publishDate, tags, imageUrl) {
    this.id = id;
    this.title = title;               // Title of the blog post
    this.content = content;           // Main content of the blog post (HTML)
    this.author = author;             // Author of the blog post
    this.publishDate = publishDate;   // Date when the blog post was published
    this.tags = tags;                 // Tags associated with the blog post (array of strings)
    this.imageUrl = imageUrl;         // URL of an image to be displayed with the blog post
  }
}

module.exports = BlogPost;
