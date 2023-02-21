module.exports = (req, res, next) => {
  if(req.session.currentUser) res.redirect("/user/profile");
  else next();
}