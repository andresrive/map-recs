const express = require('express');
const router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const upload = require("../config/cloudinary.config");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const categoryArr = ["Restaurant", "Park", "Disco", "Beach", "Pharmacy", "Night Life", "Sports", "Others"]

router.get("/profile", isLoggedIn, (req, res, next) => {
    User.findById(req.session.currentUser._id)
        .populate("pinPersonal")
        .populate("pinFav")
        .populate("interests")
        .then((user) => {
            console.log('PIN PERSONAL:', user)
            res.render("home/profile", { user })
        })
        .catch(err => next(err));
});

router.get("/profile/edit", isLoggedIn, (req, res, next) => {
    User.findById(req.session.currentUser._id)
        .populate("pinPersonal")
        .populate("pinFav")
        .populate("interests")
        .then((user) => {
            res.render("home/edit", { user });
        })
        .catch(err => next(err));
});

router.post("/profile/edit", isLoggedIn, upload.single('image'), (req, res, next) => {
    const { city, interests } = req.body;
    let image;
    if (!req.file) {
        image = req.session.currentUser.path
    } else {
        image = req.file.path
    }
    console.log(image)
    User.findByIdAndUpdate(req.session.currentUser._id, { city, interests, image }, { new: true })
        .then((user) => {
            res.render("home/profile", { user })
        })
        .catch(err => next(err));
});




router.get("/map", isLoggedIn, (req, res, next) => {
    Post.find()
        .then(result => {
            let data = {
                result,
         /*        : result.map(resu => {
                    if (resu.author == req.session.currentUser._id || req.session.currentUser.admin) {
                        resu.userRol = true
                    }
                    return resu
                }), */
                categoryArr,
            }
            //console.log("resultado: ", data);
            res.render("home/map", data)
        })
        .catch(err => next(err))
})

router.post("/map", isLoggedIn, (req, res, next) => {
    // ESCOGER CATEGORIAS
/*     let body = JSON.parse(JSON.stringify(req.body));
    console.log("que da:", body);
    Post.find({nameCategory : {$all:[body.nameCategory]}})
    .then(result => {
        let data = {
            result,
            categoryArr
        }
        console.log("resultado", result)
        res.render("home/map", data)
    }) */
})

router.get("/markers", isLoggedIn, (req, res, next) => {
    Post.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => next(err))
})

router.get("/list", isLoggedIn, (req, res, next) => {
    //let userId = req.session.currentUser._id
    Post.find()
        .then(result => {
            let data = {
                result: result.map(resu => {
                    if (resu.author == req.session.currentUser._id || req.session.currentUser.admin) {
                        resu.userRol = true
                    }
                    if (resu.author == req.session.currentUser._id || req.session.currentUser.admin) {
                        resu.userOk = true
                    }
                    return resu
                }),
                categoryArr,
            }
            //console.log("resultado: ", data.result);
            res.render("home/list", data)
        })
        .catch(err => next(err))
})

router.post("/list", isLoggedIn, (req, res, next) => {
    // ESCOGER CATEGORIAS
    let body = JSON.parse(JSON.stringify(req.body));
    console.log("que da:", body);
    Post.find({nameCategory : {$all:[body.nameCategory]}})
    .then(result => {
        let data = {
            result,
            categoryArr
        }
        console.log("resultado", result)
        res.render("home/list", data)
    })
})



module.exports = router;