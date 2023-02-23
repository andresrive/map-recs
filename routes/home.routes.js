const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

const categoryArr =  ["Restaurant", "Park", "Disco", "Beach", "Pharmacy", "Night Life", "Sports", "Others"]

router.get("/profile", (req, res, next)=> {
    console.log(req.session.currentUser)
    let user = req.session.currentUser._id;
    User.findById(user)
    .populate("Post Post")
   // .populate()
    .then(result => {
        console.log("user: ", result)
        res.render("home/profile", result)
    })
    .catch(err => next(err))
});

//router.post("/create-profile", (req,res, next)=>{

//});




router.get("/map", (req, res, next) => {
    let latlng = {
        latitud,
        longitud
    }
    Post.find()
        .then(result => {
            let coordenadasArr = [];
            result.forEach((post) => {
                coordenadasArr.push({
                    latitud: post.latitud,
                    longitud: post.longitud
                })
            })
            console.log(coordenadasArr);
            res.render("home/map")
        })
        .catch(err => next(err))

})

router.post("/map", (req, res, next) => {
    // ESCOGER CATEGORIAS
})

router.get("/list", (req, res, next) => {
    //let userId = req.session.currentUser._id
    Post.find()
        .then(result => {
            let data = {
                result,
                categoryArr
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