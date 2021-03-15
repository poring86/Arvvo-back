const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

console.log('Connected to database!')