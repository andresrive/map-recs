const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/map", isLoggedIn, (req, res, next) => {
    Post.find()
        .then(result => {
            res.render("home/map", result)
        })
        .catch(err => next(err))

})

router.post("/map", isLoggedIn, (req, res, next) => {
    // ESCOGER CATEGORIAS
})

router.get("/markers", isLoggedIn, (req, res, next) => {
    Post.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => next(err))
})

router.get("/list", isLoggedIn, (req, res, next) => {
    Post.find()
        .then(result => {
            let data = {
                result
            }
            console.log("resultado: ", data);
            res.render("home/list", data)
        })
        .catch(err => next(err))
})

router.post("/list", isLoggedIn, (req, res, next) => {
    // ESCOGER CATEGORIAS
})


module.exports = router;