const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const upload = require("../config/cloudinary.config");

const categoryArr =  ["Restaurant", "Park", "Disco", "Beach", "Pharmacy", "Night Life", "Sports", "Others"]

router.get("/profile", (req, res, next)=> {
    User.findById(req.session.currentUser._id)
    .populate("pinPersonal")
    .populate("pinFav")
    .populate("interests")
    .then((user)=>{
        console.log('PIN PERSONAL:', user)
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

router.post("/profile/edit",upload.single('image'), (req,res, next)=>{
    const { city, interests } = req.body;
    let image;
    if (!req.file) {
        image = req.session.currentUser.path
    } else {
        image = req.file.path
    }
    console.log(image)
    User.findByIdAndUpdate(req.session.currentUser._id, {city, interests, image}, {new: true})
    .then((user) => {
        res.render("home/profile", {user})
    })
    .catch(err => next(err));
});




router.get("/map", (req, res, next) => {
    Post.find()
        .then(result => {
            res.render("home/map", result)
        })
        .catch(err => next(err))

})

router.post("/map", (req, res, next) => {
    // ESCOGER CATEGORIAS
})

router.get("/markers", (req, res, next) => {
    Post.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => next(err))
})

router.get("/list", (req, res, next) => {
    
    Post.find()
    .then(result => {
        let data = {
            result: result.map(resu => {
                if (resu.author == req.session.currentUser._id || req.session.currentUser.admin) {
                    resu.userRol = true
                }
                return resu
            }),
            categoryArr,
        }
        console.log("resultado: ", data.result);
            res.render("home/list", data)
        })
        .catch(err => next(err))
})

router.post("/list", (req, res, next) => {
    // ESCOGER CATEGORIAS
})



module.exports = router;