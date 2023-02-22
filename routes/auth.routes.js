const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post("/signup", isLoggedOut, (req, res, next) => {
  console.log(req.body)
  const { username, password, passwordRepeat, city } = req.body;

  // Check that username, password, and city are provided
  if (username === "" || password === "" || city === "" || passwordRepeat === '') {
    res.status(400).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, password and city.",
    });

    return;
  }

  if (password.length < 6) {
    res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });

    return;
  }

  else if (password != passwordRepeat) {
    res.status(400).render("auth/signup", {
      errorMessage: "The password input should match the repeat password input.",
    });
    return
  }

  //   ! This regular expression checks password for special characters and minimum length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

  // Create a new user - start by hashing the password
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      // Create a user and save it in the database
      return User.create({ username: username, password: hashedPassword, city });
    })
    .then((user) => {
      console.log("usuario creado: ", user)
      res.redirect("/home/profile");
    })
    .catch((error) => {
      console.log(error)
     if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "This username is already taken.",
        });
      } else {
        next(error); 
      }
    }); 
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

// POST /auth/login
router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;
  let userData = null;

  // Check that username, email, and password are provided
  if (username === "" ||  password === "") {
    res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide username, and password.",
    });
  }

  if (password.length < 6) {
    res.render("auth/login", { errorMessage: "Credenciales incorrectas" });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send an error message that user provided wrong credentials
      if (!user) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });

          return;
      }

      userData = user;

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      return bcrypt.compare(password, user.password);
    })
    .then((isSamePassword) => {
      if (!isSamePassword) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });

        return;
      }

      // Add the user object to the session object
      req.session.currentUser = userData;
      // Remove the password field
      delete req.session.currentUser.password;

      res.redirect("/home/profile");
    })
    .catch((err) => next(err));
  });

// GET /auth/logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;
