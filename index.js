const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes'); // Import your authentication routes module
const pool = require('./config/db'); // Import your PostgreSQL connection pool

const app = express();

require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/auth', authRoutes); // Include authentication routes under '/auth'

// Check the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected to PostgreSQL on', res.rows[0].now);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});