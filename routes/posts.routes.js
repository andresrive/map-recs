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
  let { namePlace, nameCategory, direction, comment } = req.body;
  if (namePlace == "" || nameCategory == "" || direction == "" || comment == "") {
    res.render("post/new-post", { message: "FAlta algun campo por completar!" })
    return
  }
  // if (req.files.length > 0) {
  Post.create({
    namePlace,
    nameCategory,
    direction,
    comment,
    image: req.file.path
    // author: req.session.id falta armar auth
  })
    .then((response) => {
      // return User.findByIdAndUpdate(author, {$push: { pinPersonal: response._id}});
      res.redirect("/");
    })
    .catch((err) => next(err));
  //}  else if (req.file.length == 0) {

  //}
});

router.get("/:id", (req, res, next) => {
    const {postId} = req.params.id;//lo recibimos de /map o /list cualquierda de los dos
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
        res.render("post/post", {post: result}); // mirar ruta, medio rara en navegador no se ve bien
    })
    .catch(err => next(err));
});

router.get("/:id/edit", (req, res, next) => {
    const {postId} = req.params.id;
    Post.findById(postId)
    .populate("author")
    .then(result => {
        res.render("post/post", result); //no se si esto te lleva aqui
    })
    .catch(err => next(err));
});

router.post("/:id/edit", (req, res, next) => {
    let { namePlace, nameCategory, direction, comment } = req.body;
    let {postId} = req.params.id;
    Post.findOneAndUpdate(postId, {namePlace, nameCategory, direction, comment}, {new : true} ) 
    .populate("author usersComments")
    .populate({
      path: "usersComments",
      populate: {
        path: "author",
        model: "User"
      }
    })
    .then(result => {
        res.render("post/post", {post: result});
    })
    .catch(err => next(err));
});

router.post("/:id/delete", (req, res, next) => {
    let postId = req.params.id;
    Post.findByIdAndDelete(postId)
    .then(result => {
        res.redirect("/home/list", {message: "El post ha sido elimindo"})
    })
});

module.exports = router;
