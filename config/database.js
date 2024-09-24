const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dbuser:dbuserpassword@cluster0.uix8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if there's an error
  }
};

module.exports = connectDB;
