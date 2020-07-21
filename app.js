// "dependencies"
// 1st npm init
//     "body-parser": "^1.18.3", // npm i body-parser
//     "dotenv": "^6.2.0",      // npm i dotenv
//     "ejs": "^2.6.1",       // npm i ejs
//     "express": "^4.16.4",  // npm i express
//     "lodash": "^4.17.11",  // npm i lodash
//     "mongoose": "^5.4.7",  // npm i mongoose
//     "nodemon": "^1.18.9"   //  npm i nodemon  

//++++++++++++++++++++++++++++++++++++++++++++
// --------------------IN THIS STAGE WE WILL HAVE THE DB FOT THE BLOG----------------
//++++++++++++++++++++++++++++++++++++++++++++


 const express = require("express");
 const bodyParser = require("body-parser");
 const mongoose = require('mongoose');
 const ejs = require("ejs");
 //const _ = require('lodash');  
//  var fs = require('fs');

 
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

 const app = express();

 app.set('view engine', 'ejs');
 
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("public"));

 //create db
 mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}) ;
 
 postsSchema = ({ 
 title: String,
 content: String,
//  img: { data: Buffer, contentType: String }

 });
 
 const Post = mongoose.model('Post', postsSchema);
 
 app.get("/", function(req, res){
 
   Post.find({}, function(err, posts){
     res.render("home", {
       startingContent: homeStartingContent,
       posts: posts
       });
   });
 });
 


app.get('/compose', function (req, res){
  res.render('compose');
} );

//posting post to the server and server response
app.post('/compose', (req, res) => {

  const postTitle =  req.body.postTitle;
  const postContent = req.body.postToPost
  //const postImage = req.body.image

              
         
        const post =  new Post ({
          title: postTitle,
          content: postContent,
         
          });

          // post.img.data = fs.readFileSync(imgPath),
          // a.img.contentType = 'image/png'

          // console.log('posts saved successfully');

          post.save( function(err) {
          if (!err){
            res.redirect("/");
             }
           });

           //console.log(req.body.postTitle);
           //console.log(req.body.postToPost); 
} );


//here we create a route to render posts to the home
app.get('/posts/:postId', function(req, res){ 

  const requestedPostId = req.params.postId;
   console.log(req.params.postId);


 Post.findOne({_id: requestedPostId }, function(err, post){
                
      //console.log(post); 

      res.render('post', {
        title : post.title, 
        content : post.content 
       });
              
    });
  
});

//------------image uploads  ref:https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose/29780816

//const imgPath = '/path/name.png';


// const imageSchema = new imageSchema({
//     img: { data: Buffer, contentType: String }
// });

// const Image = mongoose.model('Image', imageSchema);

// mongoose.connection.on('open', function () {
//   console.error('mongo is open');

//   Image.remove(function (err) {
//     if (err) throw err;

//     console.error('removed old docs');

//     // store an img in binary in mongo
//     var a = new A;
//     a.img.data = fs.readFileSync(imgPath);
//     a.img.contentType = 'image/png';
//     a.save(function (err, a) {
//       if (err) throw err;

//       console.error('saved img to mongo');

      // start a demo server
      //var server = express.createServer();

      // server.get('/', function (req, res, next) {
      //   Image.findById(image, function (err, doc) {

      //     if (err) return next(err);
      //     res.contentType(doc.img.contentType);
      //     res.send(doc.img.data);
      //   });
      // });



//       server.on('close', function () {
//         console.error('dropping db');
//         mongoose.connection.db.dropDatabase(function () {
//           console.error('closing db connection');
//           mongoose.connection.close();
//         });
//       });

      
//     });
//   });

// });
// share
//------end upload


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});
  



app.listen(3000, function() {
  console.log("Server started on port Magima-Blog");
});




