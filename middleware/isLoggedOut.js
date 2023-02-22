module.exports = (req, res, next) => {
<<<<<<< HEAD
  if(req.session.currentUser) res.redirect("/home/profile");
=======
  if(req.session.currentUser) res.redirect("/home/list");
>>>>>>> 04f1042679e2294af7e4bf7e179a397eb2c3bb08
  else next();
}