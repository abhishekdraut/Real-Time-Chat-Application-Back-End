const Message = require("../models/message-model");
const express = require("express");
const router = express.Router();

router.get("/individualsMessages/:from/:to", async (req, res) => {
  try {
    const requestData=req.params
    
  
    const response=await Message.find({$or:[{$and:[{from: requestData.from},{to:requestData.to}]},{$and:[{from: requestData.to},{to:requestData.from}]}]}).sort({_id:-1}).limit(20);
    
   
    if(response){
      res.send(response.reverse());

    }
  } catch (error) {
    res.send(error)
  }
    
  });




  
router.post("/postMessage", async (req, res) => {
  try {

      const request_body = req.body;

    const response=await Message.create(request_body);
    
    if(response){
      res.send(response)
    }
    
  } catch (error) {
    res.send(error)
  }
  
});

module.exports = router;
