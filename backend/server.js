
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
].filter(Boolean);

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100});
app.use(limiter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('DB Connected'))
.catch(err=>console.log(err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: 'Something went wrong!'});
});

app.listen(process.env.PORT, ()=>console.log('Server running'));
