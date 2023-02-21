const express = require("express");
const router = express.Router();

const upload = require("../config/cloudinary.config");


const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

router.get("/new", (req, res, next) => {
  res.render("post/new-post");
});

router.post("/new", upload.single("image"), (req, res, next) => {
  let author = req.session.currentUser._id;
  let { namePlace, nameCategory, direction, comment } = req.body;
  if (namePlace == "" || nameCategory == "" || direction == "" || comment == "") {
    res.render("post/new-post", { message: "FAlta algun campo por completar!" })
    return
  }
  if (!req.file) {
  Post.create({
    namePlace,
    nameCategory,
    direction,
    comment,
    author
  })
    .then((response) => {
      return User.findByIdAndUpdate(author, {$push: { pinPersonal: response._id}});
    })
    .then(() => res.redirect("/"))
    .catch((err) => next(err));
  } else {
    Post.create({
      namePlace,
      nameCategory,
      direction,
      comment,
      image: req.file.path,
      author
    })
    .then((response) => {
      return User.findByIdAndUpdate(author, {$push: { pinPersonal: response._id}});
    })
    .then(() => res.redirect("/"))
    .catch((err) => next(err));
  }
  
  //}  else if (req.file.length == 0) {

  //}
});

router.get("/:id", (req, res, next) => {
    let user = req.session.currentUser.username;
  const postId = req.params.id;
    Post.findById(postId)
    .populate("author usersComments")
    .populate({
      path: "usersComments",
      populate: {
        path: "author",
        model: "User"
      }
    })
    .then(result => {
      let data = {
        post: result,
        user
      }
      //console.log("data: ", data.post.usersComments)
        res.render("post/post", data); 
    })
    .catch(err => next(err));
});

  router.post("/:id", (req, res, next) => {
  //console.log("params:", req.params)
  let postId = req.params.id
  let {title, comment} = req.body
  Comment.create({title, comment})
  .then(response => {
    console.log("respo:", response._id)
    return Post.findByIdAndUpdate(postId, {$push: { usersComments: response._id}});
  })
  .then(() => res.redirect("/home/list"))
  .catch(err => next(err));
}) 

router.get("/:id/edit", (req, res, next) => {
  //console.log("a ver que es esto", req.params.id)
    const postId = req.params.id;
    Post.findById(postId)
    .populate("author")
    .then(result => {
        res.render("post/edit", result);
    })
    .catch(err => next(err));
});

router.post("/:id/edit", (req, res, next) => {
    let { namePlace, nameCategory, direction, comment } = req.body;
    let postId = req.params.id;
    console.log("PRIMER CONSOL:", req.body)
    Post.findByIdAndUpdate(postId, {
      namePlace, 
      nameCategory, 
      direction, 
      comment}, {new : true} ) 
/*     .populate("author usersComments")
    .populate({
      path: "usersComments",  MIRAR ESTO
      populate: {
        path: "author",
        model: "User"
      }
    }) */
    .then(result => {
      console.log("resultado AAAAAA: ", result)
        res.redirect(`/post/${postId}`);
    })
    .catch(err => next(err));
});

router.get("/:id/post", (req, res, next) => {
  const postId = req.params.id;
  User.findById(postId)
  .populate('pinPersonal')
  .then(result => {
    console.log("postUSER :", result)
    res.render("post/postUser", result)
  })
  .catch(err => next(err));
})

router.post("/:id/delete", (req, res, next) => {
    let postId = req.params.id;
    Post.findByIdAndDelete(postId)
    .then(result => {
        res.redirect("/home/list")
    })
    .catch(err => next(err));
});

module.exports = router;
