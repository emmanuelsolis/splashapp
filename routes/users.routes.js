// Importamos las sesiones
const isLoggedOut = require("./../middleware/isLoggedOut");
const isLoggedIn = require("./../middleware/isLoggedIn");     
const router = require("express").Router();
const Partner = require('../models/Partner.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');

//TODO----------------------VIEWPROFILE---------------------
router.get("/profile/:id", (req, res, next) => {
    const {id} = req.params
    const {role, ...restUser } = req.body
    User.findById(id)
    .then(user => {
        
        res.render("user/profile", {user: req.session.currentUser})
    }).catch(error => {
        console.log("error EN ENCONTRAR EL PROFILE", error)
    })
})


//TODO----------------------VIEWEDITPROFILE---------------------
router.get("/edit/:id", (req, res, next) => {
    const {id} = req.params
    User.findById(id)
    .then(user => {
        res.render("user/edit-user",user)
    }).catch(error => {
        console.log("error EN EDITAR PERFIL", error)
    })
  
})

router.post("/edit/:id", (req, res, next) => {
    const {id} = req.params
    const {username,...restUser} = req.body
    console.log("EL ID DE EDIT USER",id)
    User.findByIdAndUpdate(id,{username,...restUser}, {new: true})
    .then(userUpdated => {
        req.session.currentUser=userUpdated
        res.redirect(`/profile/${id}`)
    })
    .catch(err => {
        console.log("Error in updating user",err)
        next(err)
    }   )
})


// //TODO----------------------VIEWEDITPROFILE---------------------

//TODO----------------------VIEWDASHBOARD---------------------

module.exports = router;