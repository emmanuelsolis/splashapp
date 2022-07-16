// ESTA RUTA ESTA RELACIONADA UNICAMENTE CON EL REGISTRO

//todo -------------- IMPORTACIONES --------------
// Para manejar las rutas necesitamos importar Express.
const router = require("express").Router();
const fileUploader = require("./../config/cloudinary.config")

// Importamos los "Controlles" los cuales contienen toda la funcionalidad de la ruta.
const authController = require("./../controllers/authController")


// Importamos las sesiones
const isLoggedOut = require("./../middleware/isLoggedOut");
const isLoggedIn = require("./../middleware/isLoggedIn");


//todo ----------------- CREACION DE USUARIO -----------------

//mostramos formulario
// http://localhost:3000/auth/signup
router.get("/signup",isLoggedOut,authController.viewSignup)
// manejo de formulario
// recibe de: http://localhost:3000/auth/signup -------> GET/POST LIGIN
router.post("/signup",fileUploader.single("profile_pic"),isLoggedOut,authController.signup)


//todo ----------------- INICIAR SESION -----------------
//mostramos formulario
// http://localhost:3000/auth/signup
router.get("/login",authController.viewLogin)
// manejo de formulario
router.post("/login",authController.login)


// //todo ----------------- PERFIL DE USUARIO -----------------
// router.get("/user/profile/:id",isLoggedIn,authController.viewProfile)
router.get("/profile/:id",isLoggedIn,authController.viewProfile)





//todo ----------------- CERRAR SESION -----------------

// router.get("/logout", (req, res, next) => {
//     res.redirect()
// })


router.post("/logout",authController.logout)

module.exports = router


