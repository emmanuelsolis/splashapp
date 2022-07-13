const bcryptjs = require("bcryptjs")
const User = require("./../models/User.model")
const Partner = require("./../models/Partner.model");
const Product = require("./../models/Product.model");
const bodyParser = require('body-parser')
// const fileUploader = require('../config/cloudinary.config');
// const {checkRole} = require("../middleware/customMiddleware")
// const mongoose = require('mongoose');
// const nodemailer = require("nodemailer")
//TODO----------Rednderiza partner signup
exports.viewSignup = (req,res,next) => {
    res.render("partner/signup")
}
//TODO-------Post de formulario de signup te manda al profile
exports.signup = (req,res,next) => {
    const {role, ...restPartner } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const newPassword = bcryptjs.hashSync(restPartner.password, salt);

    Partner.create({...restPartner, password: newPassword})
        .then(partner => {
            req.session.currentPartner = partner
            res.redirect(`/partner/profile/${partner._id}`)
            console.log("partner created", partner);
        })
        .catch(err => next(err))
}
//TODO----------Rednderiza partner login
exports.viewLogin =(req,res,next) => {
    res.render("partner/login")
}
//TODO-------Manejo de formulario de login ----->> te manda al profile
exports.login = (req,res,next) => {
    const {email,password} = req.body
	console.log("EL RQUESTTTTT",req.body)
// Validacion de campos vacios
	// if(!password || !password.length || !username || !username.length){
    //     const errorMessage = ["Debes de llenar todos los campos"]
    //     return res.render("auth/login", {errorMessage})
    // }

	// Validacion de parametros en contraseña
	// if( !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/) ){
    //     const errorMessage = ["La contraseña debe cumplir con los parametros"]
    //     return res.render("auth/login", {errorMessage})
    // }

	Partner.findOne({email})
	.then(partner => {

		// if(!user){
        //     const errorMessage = ["El correo o contraseña es incorrecto"]
        //     return res.render("auth/register",{errorMessage,isSignUp:true})
        // }
        // //verificar si la contraseña ya está registrada
        // if(!bcryptjs.compareSync(password,user.password)){
        //     const errorMessage = ["El correo o contraseña es incorrecto"]
        //     return res.render("auth/register",{errorMessage,isSignUp:true})
        // }

        //si todo lo anterior es correcto se manda a perfil

		console.log(partner)
		req.session.currentPartner = partner
        res.redirect(`/partner/profile/${partner._id}`)

		
	})
	.catch(error=>{
        const errorMessage = ["Intentalo mas tarde"]
        return res.render("partner/login",{errorMessage,isSignUp:true})
    })

}
//TODO----------Rednderiza partner profile
exports.viewProfile = (req,res,next) => {
    const {id} = req.params;
    const {role, ...restPartner } = req.body;
    Partner.findById(id)
    .then(partner => {
        res.render("partner/profile", {partner: req.session.currentPartner})
        // res.render("partner/profile", user)
    }).catch(error=>{
        next(error)
    })
}

//TODO -------Busqueda de cada partner para renderizar en la lista
exports.viewDashboard = (req,res,next) => {
    const { id } = req.params;
    const { role, ...Product } = req.body
    Partner.find()
    .then(partners => {
        // .populate("_product _user_order")
        let hbPartList = {}
            res.render("partner/dashboard", {hbPartList:partners})
        console.log("Lista de Partners", hbPartList)
        })
        .catch(err => {
            console.log("error in post/dashboard", err);
            next()
    })
}

exports.postDashboard = (req,res,next) => {
    const {id} = req.params;
const {role, ...restPartner } = req.body;

Partner.findById(id)
    .then(partner => {
        res.redirect(`/product/edit-product/${id}`)
    })
    .catch(error=>{
        console.log("error in post Dashboard", error)
        next()
    })
}

// TODO --------------------EDIT--------------------

exports.viewEditProfile = (req,res,next) => {
    const {id} = req.params
    Partner.findById(id)
    .then(partner => {
        // {partner: restPartner}
    res.render("partner/edit-partner", partner)
    console.log("Estoy en editar perfil", partner)
    })
    .catch(err => {
        console.log("error en mostrar el edit-profile", err);
        next()
    }   )   
}
exports.postEditProfile = (req,res,next) => {
    const {id} = req.params
    const {role, ...partnerEdited} = req.body
    Partner.findByIdAndUpdate(id, {partnerEdited}, {new: true})
    .then(partnerEdited => res.redirect(`/partner/profile/${id}`))
    .catch(err => {
        console.log("Error in updating partner",err)
        next(err)
    })
}
// TODO --------------------LOGOUT--------------------

exports.logout = (req,res,next) => {

    req.session.destroy((error)=>{
        if(error){
            console.log("req.session.currentPartner",req.session);
            console.log(error)
            return res
                .status(500)
                .send("Error in logout")

        }

        res.redirect("/")
        
        console.log("CERRANDO LA SESION")

    })
}