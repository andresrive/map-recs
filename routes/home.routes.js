const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

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
       // console.log("resultado: ", data);
        res.render("home/list", data)
    })
    .catch(err => next(err))
})

router.post("/list", (req, res, next) => {
    // ESCOGER CATEGORIAS
})



module.exports = router;