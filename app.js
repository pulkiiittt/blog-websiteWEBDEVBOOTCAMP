// //jshint esversion:6
//
// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const _ = require('lodash');
// const mongoose = require('mongoose');
//
//
// const homeStartingContent = "This is my Regular Diary which I keep on Updating with latest events in my Life. Stay tuned...";
// const aboutContent = "Hey, I am Pulkit Saini currently pursuing BE. in Chemical Engineering and MS. in Biological Sciences from Birla Instititue of Technology and Sciences, Pilani Campus. In a nutshell you can describe me as a Chemical Engineering Undergrad which is fascinated by the beauty of Computers and Nature";
// const contactContent = "You can reach out to me on the following:";
//
//
//
// const app = express();
//
// app.set('view engine', 'ejs');
//
// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true},{ useUnifiedTopology: true });
//
//
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
//
//
//
// const postSchema = {
//
//  title: String,
//
//  content: String
//
// };
//
// const Post = mongoose.model("Post", postSchema);
//
//
//
// app.get("/",function(req,res){
//   Post.find(function(err, posts){
//     if(err){
//       console.log(err);
//     }else{
//       res.render("home", {
//         homeStartingContent: homeStartingContent,
//         posts: posts
//       });
//     }
//   });
//
// })
//
// app.get("/about",function(req,res){
//   res.render(__dirname+"/views/about.ejs",{aboutContent:aboutContent});
// })
//
// app.get("/contact",function(req,res){
//   res.render(__dirname+"/views/contact.ejs",{contactContent:contactContent});
// })
//
// app.get("/compose",function(req,res){
//   res.render(__dirname+"/views/compose.ejs");
// })
//
//
//
// app.post("/compose", function(req, res) {
//   const post = {
//     title: req.body.postTitle,
//     body: req.body.postBody
//   };
//
//   post.save(function(err){
//     if(!err){
//       res.redirect("/");
//     }
//   });
// });
//
//
// app.get("/posts/:postId", function(req, res) {
//   const postId = req.params.postId;
//
//   Post.findById(postId, function(err, post){
//     if(err){
//       console.log(err);
//     }else{
//       res.render("post", {
//         postTitle : post.title,
//         postBody : post.body
//       });
//     }
//   });
// });
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const kebabCase = require('lodash/kebabCase');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser:true} );

const homeStartingContent = "This is my Regular Diary which I keep on Updating with latest events in my Life. Stay tuned...";
const aboutContent = "Hey, I am Pulkit Saini currently pursuing BE. in Chemical Engineering and MS. in Biological Sciences from Birla Instititue of Technology and Sciences, Pilani Campus. In a nutshell you can describe me as a Chemical Engineering Undergrad which is fascinated by the beauty of Computers and Nature";
const contactContent = "You can reach out to me on the following:";

const app = express();

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  Post.find(function(err, posts){
    if(err){
      console.log(err);
    }else{
      res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: posts
      });
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postId", function(req, res) {
  const postId = req.params.postId;

  Post.findById(postId, function(err, post){
    if(err){
      console.log(err);
    }else{
      res.render("post", {
        postTitle : post.title,
        postBody : post.body
      });
    }
  });
});

app.post("/", function(req, res) {
  console.log(req.body.journalEntry);
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});


app.listen(4000, function() {
  console.log("Server started on port 3000");
});
