const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const blogRoutes = require('./routes/blogRoutes');

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use('/api/blog', blogRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  // Start the Express server after successfully connecting to MongoDB
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
