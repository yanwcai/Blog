//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "'Good morning, and in case I don't see ya, good afternoon, good evening, and good night!' --Truman";
const aboutContent = "This is a blog website project using express, ejs, bootstrap, etc. You can create compose your journal and publish it here, and review other posted journals : )";
const contactContent = "Contact us by email: cookieMyCat@cat.com";
let posts = []; // a global variable to store all the posts

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
})

app.get("/about", function (req,res) {
  res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req, res){
  // console.log(req.body.userInput);//by name
  res.render("compose");

})

app.get("/posts/:postName", function(req, res) {
  // if(posts.find(x => x.postTitle === req.params.postName)) {
  //   console.log("match");
  // }

  posts.forEach(function(post) {
    let storedTitle = _.lowerCase(post.postTitle);
    let requestTitle = _.lowerCase(req.params.postName);

    if(storedTitle === requestTitle) {

      res.render("post", {
        title: post.postTitle,
        body: post.postBody
      });
    }
  })
})

app.post("/compose", function(req,res){
  const post = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  };
  posts.push(post);
  res.redirect("/"); // send the user back to the home page
})


app.listen(3000, function(req,res) {
  console.log("Server started on port 3000");
});
