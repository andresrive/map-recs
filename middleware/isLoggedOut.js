module.exports = (req, res, next) => {
  if(req.session.currentUser) res.redirect("/home/profile");
  else next();
}