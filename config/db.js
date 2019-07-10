const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');    //get the mongoURI in config file

const connectDB = async () => {       //used to use { mongoose.connect(db) }, the method use here is a new standard
  try {
    await mongoose.connect(db, {      //mongoose.connect() return a promise
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
