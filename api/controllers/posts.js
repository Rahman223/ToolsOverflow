const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const category = require('../models/category');
const { Post, Location, Media, User, Category} = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

// There are other styles for creating these route handlers, we typically
// explore other patterns to reduce code duplication.
// TODO: Can you spot where we have some duplication below?


// ./api/posts/Listed (get)
//finds all posts in the database that have the property postStatus : "Listed"
//for each post find the associated media and location instance
//returns an array of json objects of the format {"post": {post data}, "media": [{media data}], "location": {location data}}
router.get('/Listed', async (req,res) => {

  const posts = await Post.findAll({where: {postStatus: "Listed"}});

  let postMedLocArr =[]
  for(let i=0; i<posts.length; i++){
    const post = posts[i]
    let media = await post.getMedia()
    let location = await post.getLocation()
    let postMedLocObj= {}
    
    postMedLocObj.post =  post
    postMedLocObj.media = media
    postMedLocObj.location = location
    postMedLocArr.push(postMedLocObj)
  
  }
  res.json(postMedLocArr)
});

// router.get('/Listed', async (req,res) => {

//   const posts = await Post.findAll({where: {postStatus: "Listed"}});

//   let postMedLocArr =[]
//   for(let i=0; i<posts.length; i++){
//     const post = posts[i]
//     let media = await post.getMedia()
//     let location = await post.getLocation()
//     let borrower = await User.findByPk(post.borrowerId)
//     let postMedLocObj= {}
    
//     postMedLocObj.post =  post
//     postMedLocObj.media = media
//     postMedLocObj.location = location
//     postMedLocObj.borrower = borrower
//     postMedLocArr.push(postMedLocObj)
  
//   }
//   res.json(postMedLocArr)
// });

// ./api/posts (post)
//takes in form data from CreatePost Page, and creates the tables in the backend.
//first it tries to find the location if exists otherwise creates new location instance. 
//then creates post instance and associates the location id to it.
//then the media instance is created for that post. 
//finally an array containing the location, post, and media json objects is returned. in the format [{location}, {post}, {media}]


router.post('/', passport.isAuthenticated(), async (req, res) => {
  let content  = req.body;
  let resArr = [];

        try{
          let location = await Location.findOrCreate({where: {lat: parseFloat(content.lat), lng: parseFloat(content.lng)}, defaults: {state: content.state, city: content.city, zipCode: content.zip, streetAddress: content.streetAddress, apartment: content.apartment}})
          // console.log(location)
          resArr.push(location)
          let post = await Post.create({postDesc: content.postDesc, postTitle: content.postTitle, locationId: location[0].id,  postStatus: "Listed", fkUserName: content.userName})
          resArr.push(post)

          for(let i=0; i<content.catNames.length; i++){
            let category = await Category.findOrCreate({where: {name: content.catNames[i]}, default: {}})
            resArr.push(category)
            // console.log(category[0])
            await post.addCategory(category[0])
          }
          
          
          
          let media = await Media.create({link: content.link, postId: post.id})
          resArr.push(media)
          res.status(201).json(resArr);
        }catch{
          res.sendStatus(400)
        }
          

});

//./api/posts/category/:catName
//this api endpoint takes in a category as a query param and returns an array of all the posts in that category
//each element in the returned array will be an object containing a post obj, a media obj and location obj
//{"post": {post obj stuff},
//  "media": {media obj stuff},
//  "location": {location obj stuff}  


// router.get('/category/:catName', passport.isAuthenticated(), async (req, res)=> {
//   const catName = req.params.catName;

//   try{
//     let cat = await Category.findOne({where: {name : catName}})
//     let posts = await cat.getPosts();
//     // console.log(posts)
  
//     let postMedLocArr = []
//     for(let i=0; i<posts.length; i++){
//       const post = posts[i]
//       let media = await post.getMedia()
//       let location = await post.getLocation()
//       let postMedLocObj = {};

//       postMedLocObj.post = post;
//       postMedLocObj.media = media;
//       postMedLocObj.location = location
//       postMedLocArr.push(postMedLocObj)
//     }
     
 
//     res.status(200).json(postMedLocArr)

//   }catch{
//     res.sendStatus(400)
//   }
 
// })

router.get('/categories', passport.isAuthenticated(), async (req, res)=> {
  const catNames = req.body.catNames;

  try{

    let map = new Map()
    for(let i=0; i<catNames.length; i++){
      let cat = await Category.findOne({where: {name : catNames[i]}})
      if(cat){
        let posts = await cat.getPosts();
        console.log(posts)
        for(let j=0; j<posts.length; j++){
          map.set(posts[j].id, posts[j]);
        }
      }
      


    }
    
    // console.log(map.size)
    let postMedLocArr = []

    for(const post of map.values()){
      console.log(post)
      let media = await post.getMedia()
      let location = await post.getLocation()
      let postMedLocObj = {};

      postMedLocObj.post = post;
      postMedLocObj.media = media;
      postMedLocObj.location = location
      postMedLocArr.push(postMedLocObj)
    }
     
 
    res.status(200).json(postMedLocArr)

  }catch{
    res.sendStatus(400)
  }
 
})






// ./api/posts/:id 
//this api endpoint would return a json object containing the post instance, media instance and location instance in the format
// {"post": {post obj stuff},
//  "media": {media obj stuff},
//  "location": {location obj stuff}  
//}
router.get('/:id', passport.isAuthenticated(), async (req, res) => {
  const {id}  = req.params;
  let post = await Post.findByPk(parseInt(id, 10))
    
  if(!post) {
    return res.sendStatus(404);
  }

  let postMedLocObj = {}
  let media = await post.getMedia();
  let location = await post.getLocation();
  postMedLocObj.post = post;
  postMedLocObj.media = media;
  postMedLocObj.location = location;
  res.json(postMedLocObj);
});





// ./api/posts/getByUser
// pass the userName in the query param
// call this endpoint with the userName and get an array of all posts made by that user. 
// the array holds objects that have the properties post, media and location. 
// in the following format [{"post": {post data}, "media": {media data}, "location": {location data}}]
router.get('/getByUser/:userName', passport.isAuthenticated(), async (req,res) => {
  const  userName  = req.params.userName;
  // console.log(userName)
  const user = await User.findByPk(userName);
  // console.log(user)
  // res.json(user)
  const posts = await user.getPosts();
  // const posts = await Post.findAll({where:{fkUserName : userName}});
  if(posts.length === 0){
    res.sendStatus(404);
  }

  let postMedLocArr =[]
  for(let i=0; i<posts.length; i++){
    const post = posts[i]
    let media = await post.getMedia()
    let location = await post.getLocation()
    let postMedLocObj= {}
    
    postMedLocObj.post =  post 
    postMedLocObj.media = media
    postMedLocObj.location = location
    postMedLocArr.push(postMedLocObj)
  

    if(i === posts.length-1){
      res.json(postMedLocArr)
    }
  }
});

//./api/posts/borrowing
//pass the userName in the query param
//call this endpoint with the userName and get an array of all posts borrowed by that user.
//the array holds objects that have the properties post, media and location.
//in the following format [{"post": {post data}, "media": {media data}, "location": {location data}}]

router.get('/borrowing/:userName', passport.isAuthenticated(), async (req,res) => {
  const  userName  = req.params.userName;
  // console.log(userName)
  const user = await User.findByPk(userName);
  // console.log(user)
  // res.json(user)
  const posts = await Post.findAll({where: {borrowerId : userName}})
  // const posts = await Post.findAll({where:{fkUserName : userName}});
  if(posts.length === 0){
    res.sendStatus(404);
  }

  let postMedLocArr =[]
  for(let i=0; i<posts.length; i++){
    const post = posts[i]

    if(post.postStatus == "Borrowed"){
      let media = await post.getMedia()
      let location = await post.getLocation()
      let postMedLocObj= {}
      
      postMedLocObj.post =  post 
      postMedLocObj.media = media
      postMedLocObj.location = location
      postMedLocArr.push(postMedLocObj)
    }

    if(i === posts.length-1){
      res.json(postMedLocArr)
    }
  }
});

//./api/posts/borrow/:userName/:postId
//pass the userName and the postId in the query param
//call this endpoint with the userName and postId to add the userName as borrowerId in that given post. In otherwords, the user with given userName is borrowing the post with given postId
//The controller will not allow user to borrow their own post.
router.post('/borrow/:userName/:postId', passport.isAuthenticated(), async (req, res) =>{
    const userName = req.params.userName;
    const postId = req.params.postId;

    const user = await User.findByPk(userName);
    const post = await Post.findByPk(postId);
    // console.log(user);
    // console.log(post);
    try{
      if(post.fkUserName == userName){
        res.sendStatus(405);
      }else{
        user.setPost(post);
        post.postStatus = "Borrowed";
        await post.save();
        res.sendStatus(200);
      }

    }catch{
      res.sendStatus(500)
    }
});

//./api/posts/pickUp/:postId
//pass the postId in the query param
//call this endpoint with the postId to pick up the tool, in other words, the pickedUp attribute of the post will be marked as true
//indicating that the user picked up the posted tool.

router.post('/pickUp/:postId', passport.isAuthenticated(), async (req, res) =>{
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);

    try{
      if(post.pickedUp == false && post.returned == false){
        post.pickedUp = true;
        await post.save();
        res.sendStatus(200);
      }else{
        res.sendStatus(405);
      }

    }catch {
      res.sendStatus(500);
    }

});

//./api/posts/returned/:postId
//pass the postId in the query param
//call this endpoint with the postId to indicate that the item was returned, in other words, the returned attribute of the post will be true

router.post('/returned/:postId', passport.isAuthenticated(), async (req, res) =>{
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);

    try{
      if(post.returned == false && post.pickedUp == true){
        post.returned = true;
        post.postStatus = "Returned";
        await post.save();
        res.sendStatus(200);
      }else{
        res.sendStatus(405);
      }

    }catch{
      res.sendStatus(500);
    }
});


router.delete('/:id', passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  let post = await Post.findByPk(parseInt(id, 10))
    
  if(!post) {
    return res.sendStatus(404);
  }

  let mediaInst = await Media.findOne( {where : {postId: post.id}});
  mediaInst.destroy();
  post.destroy();
  res.sendStatus(204);
});


module.exports = router;