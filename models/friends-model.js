
const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
    
    user_id: {
      type:  mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    friends:[{friend_id:{type: mongoose.Schema.Types.ObjectId,required:true,reference:"User",unique:true}}],
    
  });

  const Friend = mongoose.model("Friends", friendsSchema);
  module.exports=Friend