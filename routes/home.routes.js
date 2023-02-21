const express = require('express');
const router = express.Router();

router.get("/map", (req, res, next) => {
    res.render("home/map")
})

router.post("/map", (req, res, next) => {
    // ESCOGER CATEGORIAS
})

router.get("/list", (req, res, next) => {
    res.render("home/list")
})

router.post("/list", (req, res, next) => {
    // ESCOGER CATEGORIAS
})


module.exports = router;