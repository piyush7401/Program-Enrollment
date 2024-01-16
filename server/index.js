const express = require('express');
const cors = require('cors'); 
const morgan = require("morgan");
const cookie_Parser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes'); 
const programRoutes = require('./routes/programRoutes');

const app = express();

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookie_Parser());

// Routes
app.use('/auth', authRoutes); // Include authentication routes under '/auth'
app.use('/programs', programRoutes);

// Check the database connection
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error executing query', err.stack);
//   } else {
//     console.log('Connected to PostgreSQL on', res.rows[0].now);
//   }
// });
// const pool = new Pool({
//   connectionString:process.env.POSTGRES_URL+"?sslmode=require",
// });

app.get('/test',(req,res)=>{
  res.send("server is running!")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});