module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentPartner) {
   
    return res.redirect("/partner/login");
  
  }
  // req.session.currentPartner = partner;
  req.partner = req.session.currentPartner;
  next();
};
