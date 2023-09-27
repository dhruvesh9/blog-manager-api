const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/blog', blogRoutes);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
