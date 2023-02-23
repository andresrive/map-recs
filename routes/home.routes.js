const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");



router.get("/profile", (req, res, next)=> {
    User.findById(req.session.currentUser._id)
    .populate("pinPersonal")
    .populate("pinFav")
    .populate("interests")
    .then((user)=>{
        console.log('PIN PERSONAL:', user.pinPersonal)
        res.render("home/profile", {user})
    })
   .catch(err => next(err));
});

router.get("/profile/edit", (req, res, next) => {
    User.findById(req.session.currentUser._id)
    .populate("pinPersonal")
    .populate("pinFav")
    .populate("interests")
    .then((user)=>{
        res.render("home/edit", {user});
    })
   .catch(err => next(err));
});

router.post("/profile/edit", (req,res, next)=>{
    const { city, interests } = req.body;

    User.findByIdAndUpdate(req.session.currentUser._id, {city, interests}, {new: true})
    .then((user) => {
        res.render("home/profile", {user})
    })
    .catch(err => next(err));
});




router.get("/map", (req, res, next) => {
    res.render("home/map")
})

router.post("/map", (req, res, next) => {
    // ESCOGER CATEGORIAS
})

router.get("/list", (req, res, next) => {
    Post.find()
    .then(result => {
        let data= {
            result
        }
        console.log("resultado: ", data);
        res.render("home/list", data)
    })
    .catch(err => next(err))
})

router.post("/list", (req, res, next) => {
    // ESCOGER CATEGORIAS
})



module.exports = router;