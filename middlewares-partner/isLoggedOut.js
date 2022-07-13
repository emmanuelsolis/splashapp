module.exports = (req, res, next) => {
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  if (req.session.currentPartner) {
    return res.redirect('/');
    // return res.redirect(`user/profile/${currentUser.id}`);
  }
  next();
};
