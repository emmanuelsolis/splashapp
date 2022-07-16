const router = require("express").Router();
const Partner = require("../models/Partner.model");
const Product = require("../models/Product.model");
const IsLoggedIn = require("./../middlewares-partner/isLoggedIn");
const IsLoggedOut = require("./../middlewares-partner/isLoggedOut");
// TODO --------------------CREATE--------------------
router.get("/create/:id",(req,res,next)=>{
    const {id} = req.params;
    res.render("product/create-product", {id})
    console.log("REQ SESSION", req.session)
})
router.post("/create/:id",IsLoggedIn, (req,res,next)=>{
    
    console.log("Estoy en el create POST")
    const {id} = req.params;
    const {name, description, service_type, price} = req.body
    Product.create({name, description, service_type, price})
    .then(product => {
        const {id} = req.params;
        console.log("ID",id)
        console.log("PRODUCT",product)
        Partner.findByIdAndUpdate(id, {$push: {_product: product}}, {new: true})
        .then(partner => {
            req.session.currentPartner = partner
            console.log("product created", product);
            console.log("PARTNER", partner);
            console.log("REQQQQQQQQ", req.session.currentPartner);
            
        res.redirect(`/product/products/${partner.id}`)
        })  
        .catch(err => {
        console.log("error in creating product", err);
        next(err)
        })       
    })
    .catch(err => {
        console.log("error in creating product", err);
        next(err)
    })
       
})
// TODO --------------------SHOW PRODUCTS LIST--------------------
router.get("/products/:id",(req,res,next)=>{
    const {id} = req.params
    Partner.findById(id)
    .populate("_product _user_order")
    .then(partner => {
        console.log("Lista de Partners", partner)
        res.render("product/productList",{partner, products: partner.products})
    })
    
    .catch(err => next(err))
})


// TODO --------------------EDIT--------------------
router.get("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    Product.findById(id)
    .then(product => {
        console.log("product edited", product);
        res.render("product/edit-product", {product})
    })
    .catch(err => next(err))
})
router.post("/edit/:id",(req,res,next)=>{
    const {id} = req.params
    const {role, ...productEdited} = req.body
    Product.findByIdAndUpdate(id, ...productEdited, {Edit: true})
    .then(productEdited => res.redirect(`/product/products/${id}`))
    .catch(err => {
        console.log("Error in updating product",err)
        next(err)
    })

})
// TODO --------------------DELETE--------------------



module.exports = router;
