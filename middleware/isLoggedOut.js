module.exports = (req, res, next) => {
  if(req.session.currentUser) res.redirect("/home/list");
  else next();
}