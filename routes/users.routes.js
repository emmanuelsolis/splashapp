const router = require("express").Router();
const Partner = require('../models/Partner.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');

//TODO----------------------VIEWPROFILE---------------------
router.get("/profile/:id", (req, res, next) => {
    const {id} = req.params
    User.findById(id)
    .then(user => {
        res.render("user/profile",)
    }).catch(error => {
        console.log("error EN EDITAR PERFIL", error)
    })
})

//TODO----------------------VIEWEDITPROFILE---------------------
router.get("/edit-user/:id", (req, res, next) => {
    const {id} = req.params
    const {username } = req.body
    User.findById(id)
    .then(userEdited => {
        res.render("user/edit-user.hbs",{userEdited})
    }).catch(error => {
        console.log("error EN EDITAR PERFIL", error)
    }   )
})

router.post("/edit/:id", (req, res, next) => {
    const {id} = req.params
    const {role, ...userEdited} = req.body
    User.findByIdAndUpdate(id, userEdited, {Edit: true})
    .then(userEdited => res.redirect(`/user/profile/${id}`))
    .catch(err => {
        console.log("Error in updating user",err)
        next(err)
    }   )
})




//TODO----------------------VIEWDASHBOARD---------------------

module.exports = router;