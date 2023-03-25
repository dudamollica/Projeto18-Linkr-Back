import {
    postFollow,
    postUnfollow,
    getFollow,
    getFollowed
  } from "../repositories/followRepository.js";
  
  export async function postFollowUser(req, res) {
    const { followedId } = req.body;
    const {
      userInfo: { userId },
    } = res.locals;
  
    try {
      const { rows: followed } = await getFollow(userId, followedId);
      if(followed.lenght === 0){
          res.setatus(200).send("Follow");
      } else{
          res.setatus(200).send("Unfollow");
      }
      res.sendStatus(201);
    } catch (erro) {
      res.sendStatus(500);
    }
  }
  
  export async function getFollowedUser(req, res) {
      const { id: followedId } = req.params;
      const {
          userInfo: { userId },
        } = res.locals;
  
        try {
          const { rows: followed } = await getFollow(userId, followedId);
          if(followed.lenght === 0){
              await postFollow(userId, followedId);
          } else{
              await postUnfollow(userId, followedId);
          }
          res.sendStatus(201);
        } catch (erro) {
          res.sendStatus(500);
        }
  }
  
  export async function getFollowers(req, res) {
      const {
          userInfo: { userId },
        } = res.locals;
  
        try {
          const { rows: followers } = await getFollowed(userId);
          res.status(200).send(followers)
        } catch (erro) {
          res.sendStatus(500);
        }
  }