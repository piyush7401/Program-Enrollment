const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Import your PostgreSQL connection pool

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUser = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, email]);

    // Generate JWT token
    const token = jwt.sign({ userid: newUser.rows[0].userid },process.env.SECRET);

    res.json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  
      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userid: user.rows[0].userid },process.env.SECRET);
  
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;