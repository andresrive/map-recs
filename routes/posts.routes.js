const express = require("express");
const router = express.Router();

const upload = require("../config/cloudinary.config");

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoffedOut = require("../middleware/isLoggedOut");
const categoryArr =  ["Restaurant", "Park", "Disco", "Beach", "Pharmacy", "Night Life", "Sports", "Others"]

router.get("/new", (req, res, next) => {
  let data = {
      categoryArr
  }
  console.log(data)
  res.render("post/new-post", data);
});

router.post("/new", /*upload.any(),*/ (req, res, next) => {
router.post("/new", upload.single('image'), (req, res, next) => {
  let author = req.session.currentUser._id;
  let { namePlace, nameCategory, direction, comment, latitud, longitud } = req.body;
  console.log("la foto:", req.files)
  console.log(req.body);
  //console.log("la foto:", req.file)
  if (
    namePlace == "" ||
    nameCategory == "" ||
    direction == "" ||
    comment == ""
  ) {
    res.render("post/new-post", {
      message: "Falta algun campo por completar!",
    });
    return;
  }
  if (req.file) {
    Post.create({
      namePlace,
      nameCategory,
      direction,
      comment,
      latitud,
      longitud,
      image: req.file.path,
      author
    })
      .then((response) => {
        console.log(author, response._id);
        return User.findByIdAndUpdate(author, {
          $push: { pinPersonal: response._id },
        });
      })
      .then(() => res.redirect("/home/list"))
      .catch((err) => next(err));
  } else {
    res.render("post/new-post", {
      message: "FAlta algun campo por completar!"
    })
  }

  /* else if (!req.files) {
    Post.create({
      namePlace,
      nameCategory,
      direction,
      latitud,
      longitud,
      comment,
      author,
    })
      .then((response) => {
        return User.findByIdAndUpdate(author, {
          $push: { pinPersonal: response._id },
        });
      })
      .then(() => res.redirect("/home/list"))
      .catch((err) => next(err)); */
});

router.get("/:id", isLoggedIn, (req, res, next) => {
  let user = req.session.currentUser.username;
  const postId = req.params.id;
  Post.findById(postId)
    .populate("author usersComments")
    .populate({
      path: "usersComments",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .then((result) => {
      let data = {
        post: result,
        user,
      };
      //console.log("data: ", data.post.usersComments)
      res.render("post/post", data);
    })
    .catch((err) => next(err));
});

router.post("/:id", isLoggedIn, (req, res, next) => {
  //console.log("params:", req.params)
  let postId = req.params.id;
  let { title, comment } = req.body;
  Comment.create({ title, comment })
    .then((response) => {
      //console.log("respo:", response._id);
      return Post.findByIdAndUpdate(postId, {
        $push: { usersComments: response._id },
      });
    })
    .then(() => res.redirect("/home/list"))
    .catch((err) => next(err));
});

router.get("/:id/edit", isLoggedIn, (req, res, next) => {
  //console.log("a ver que es esto", req.params.id)
  const postId = req.params.id;
  Post.findById(postId)
    .populate("author")
    .then((result) => {
      res.render("post/edit", result);
    })
    .catch((err) => next(err));
});

router.get("/:id/edit/pre", /* upload.single('image'), */ isLoggedIn, (req, res, next) => {
  //console.log("PRIMER CONSOL:", req.file);
  let { namePlace, nameCategory, direction, comment } = req.query;
  //let image = req.file.path;
  let postId = req.params.id;
  Post.findByIdAndUpdate(
    postId,
    {
      namePlace,
      nameCategory,
      direction,
      comment,
      //image
    },
    { new: true }
  )
    .then((result) => {
      //console.log("resultado AAAAAA: ", result);
      res.redirect(`/post/${postId}`);
    })
    .catch((err) => next(err));
});

router.get("/:id/post", isLoggedIn, (req, res, next) => {
  const postId = req.params.id;
  User.findById(postId)
    .populate("pinPersonal")
    .then((result) => {
      //console.log("postUSER :", result)
      res.render("post/postUser", result);
    })
    .catch((err) => next(err));
});

router.post("/:id/delete", isLoggedIn, (req, res, next) => {
  let postId = req.params.id;
  Post.findByIdAndDelete(postId)
    .then((result) => {
      res.redirect("back");
    })
    .catch((err) => next(err));
});

module.exports = router;
