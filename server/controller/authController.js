const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

async function registerController(req, res) {
  const { name, email, password } = req.body;
  console.log(name);
  try {
    // Check email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [name, hashedPassword, email]
    );

    // Generate JWT token
    const token = jwt.sign(
      { createdBy: newUser.rows[0].userid },
      process.env.SECRET
    );

    res.status(201).cookie("token",token,{samesite:"none",secure:true}).json({ success: true,token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ createdBy: user.rows[0].userid }, process.env.SECRET);
    res.status(201).cookie("token",token,{samesite:"none",secure:true}).json({ success: true,token,user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {registerController,loginController}
