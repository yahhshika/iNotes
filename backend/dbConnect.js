const mongoose = require("mongoose");

MONGO_URL = process.env.MONGO_URL; 
module.exports = async()=>{
    await mongoose.connect(MONGO_URL);
}