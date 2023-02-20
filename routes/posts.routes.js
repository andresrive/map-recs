const express = require('express');
const router = express.Router();

const upload = require("../config/cloudinary.config")

/* const homeRoutes = require("./routes/home.routes");
app.use("/home", homeRoutes); */
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");


router.get("/new", (req, res, next) => {
    res.render("home/post/new-post")
})

router.post("/new", upload.any(), (req, res, next) => {
    let {namePlace, nameCategory, direction, comment} = req.body;
    if (req.files.length > 0) {
        Post.create({
            namePlace,
            nameCategory,
            direction,
            comment,
            image: req.files,
           // author: req.session.id falta armar auth
        })
        .then(response => {
            let data = {
                response
            }
            res.redirect("home/post/post", data.response)
        })
        .catch(err => next(err));
    }
})

router.get("/:id", (req, res, next) => {
    res.render("home/post/post")
})

router.get("/:id/edit", (req, res, next) => {
    res.render("home/post/post") //no se si esto te lleva aqui
})

router.post("/:id", (req, res, next) => {
    //editar
})

router.post("/:id/delete", (req, res, next) => {

})


module.exports = router;