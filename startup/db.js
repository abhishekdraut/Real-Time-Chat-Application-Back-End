const mongoose = require("mongoose");

const config = require("config");

module.exports = async function () {
    const db=config.get("db")
    
    await mongoose.connect(db).then(()=>{console.log("connection eastablished to db")});
    
  
};
