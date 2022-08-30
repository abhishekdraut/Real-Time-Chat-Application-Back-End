const mongoose = require("mongoose");


module.exports = async function () {
    await mongoose.connect('mongodb://127.0.0.1:27017/ChatApplication');
    
  
};
