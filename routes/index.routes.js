const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup")
// })

// router.post("/signup", (req, res, next) => {

// })

// router.get("/login", (req, res, next) => {
//   res.render("auth/login")
// })

// router.post("/login", (req, res, next) => {
//   let {username, password} = req.body;

//   if(username == "" || password == "") {
//     res.render("auth/login", { mensajeError: "Faltan campos" });
//     return;
//   } 

// })


// router.get("/profile/:id", (req, res, next) => {
//   res.render("profile")
// })

// router.post("/profile/:id", (req, res, next) => {

// })


module.exports = router;
