const router = require("express").Router();
const Partner = require("../models/Partner.model");
const bcryptjs = require("bcryptjs");
const partnersAuthController = require("./../controllers/partnersAuthController")
const Product = require("../models/Product.model");
const isLoggedOut = require("./../middlewares-partner/isLoggedOut");
const isLoggedIn = require("./../middlewares-partner/isLoggedIn");
/* 
create
signup : get, post{redirect}


*/
// TODO --------------------SIGNUP--------------------

router.get("/signup",isLoggedOut, partnersAuthController.viewSignup)


router.post("/signup",isLoggedOut, partnersAuthController.signup)


// TODO --------------------LOGIN--------------------
router.get("/login", partnersAuthController.viewLogin)

router.post("/login", partnersAuthController.login)

// TODO --------------------PROFILE--------------------
router.get("/profile/:id",isLoggedIn, partnersAuthController.viewProfile)


// TODO --------------------READ--------------------



// TODO --------------------DASHBOARD--------------------

router.get("/dashboard", partnersAuthController.viewDashboard)

router.post("/dashboard", partnersAuthController.postDashboard)




// TODO --------------------EDIT--------------------
router.get = ("/edit/:id", partnersAuthController.viewEditProfile)

router.post = ("/edit/:id", partnersAuthController.postEditProfile)


// TODO --------------------DELETE--------------------
// TODO --------------------LOGOUT--------------------
//todo ----------------- CERRAR SESION -----------------
// router.get("/logout", partnersAuthController.logout)


// router.get = ("/delete/:id", partnersAuthController.deletePartner)
// router.get("/delete/:id",(req,res,next)=>{
//     const {id} = req.params
//     Partner.findByIdAndDelete(id)
//     .then(()=> res.redirect("/partners-list"))
//     .catch(err => next(err))
// }) 


module.exports = router