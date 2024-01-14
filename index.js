const express = require('express');
const cors = require('cors'); 
const morgan = require("morgan");
const cookie_Parser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes'); 
const programRoutes = require('./routes/programRoutes');
const pool = require('./config/db'); // Import your PostgreSQL connection pool

const app = express();

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookie_Parser());

// Routes
app.use('/auth', authRoutes); // Include authentication routes under '/auth'
app.use('/programs', programRoutes);

// Check the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected to PostgreSQL on', res.rows[0].now);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});