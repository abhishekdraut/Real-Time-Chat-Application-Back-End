const Friends = require("../models/friends-model");
const express = require("express");
const Friend = require("../models/friends-model");
const router = express.Router();
const { User } = require("../models/user-model");


router.get('/searchFriend/:username',async function(req,res){
  try{
    const username=req.params.username;
   
    const searchResult=await User.find({$or:[{username:{$regex : username}},{name:{$regex : username}}]});
    res.send(searchResult)

  } 
  catch(error){res.send(error)}
    
})
router.get("/friendsList/:user_id", async (req, res) => {
  try {
    const response = await Friends.find({ user_id: req.params.user_id });
  
  if(response.length!==0){
    const friendList = response[0].friends;
    const finalArr = await Promise.all(
      friendList.map(async (item) => {
        const Friend = await User.find({ _id: item.friend_id });
        return Friend[0];
      })
    );
    res.send(finalArr);
  }
  else{
    res.send([])
  }
    
  } catch (error) {
    res.send(error)
  }
  
  
  
});
router.post("/addToFriendList", async (req, res) => {
  try {
    
    const userExist = await Friend.find({ user_id: req.body.user_id });
  if (userExist.length!==0) {
    let friendExist = false;
    
    userExist[0].friends.forEach((item) => {
      if (item.friend_id == req.body.friend_id) {
        friendExist = true;
      }
    });
    if (friendExist == true) {
      res.send("friend Exist");
    }
    if (friendExist == false) {
      const friendUpdateResponse = await Friend.updateOne(
        { user_id: req.body.user_id },
        {
          friends: [...userExist[0].friends, { friend_id: req.body.friend_id }],
        }
      );
      res.send(friendUpdateResponse);
    }
      
  } else {
    const userCreateReponse = await Friend.create({
      user_id: req.body.user_id,
      friends: [{ friend_id: req.body.friend_id }],
    });
    res.send(userCreateReponse);
  };



  } catch (error) {
    res.send(error)
  }
  
});

module.exports = router;
