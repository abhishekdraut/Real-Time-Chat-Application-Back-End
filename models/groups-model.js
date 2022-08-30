
const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema({
    
    admin: {
      type:  mongoose.Schema.Types.ObjectId,
      required: true
    },
    users:[{type: mongoose.Schema.Types.ObjectId,required:true,reference:"User"}],
    created_date: { type: Date, default: Date.now },
  });

  const Groups = mongoose.model("Groups", groupsSchema);