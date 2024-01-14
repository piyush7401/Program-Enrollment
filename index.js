const express = require('express');
const cors = require('cors'); 
const morgan = require("morgan");
const authRoutes = require('./routes/authRoutes'); // Import your authentication routes module
const pool = require('./config/db'); // Import your PostgreSQL connection pool

const app = express();

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
// const corsOptions ={
//   origin:'https://localhost:5173', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});