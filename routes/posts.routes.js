const express = require('express');
const router = express.Router();

// const homeRoutes = require("./routes/home.routes");
// app.use("/home", homeRoutes);


router.get("/new", (req, res, next) => {
    res.render("home/post/new-post")
})

router.post("/new", (req, res, next) => {

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