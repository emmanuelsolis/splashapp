//todo -------------- IMPORTACIONES --------------
// Para manejar las rutas necesitamos importar Express.
const router            = require("express").Router();

// Importamos los "Controlles" los cuales contienen toda la funcionalidad de la ruta.
const usersController   = require("./../controllers/usersController")


// Importamos las sesiones
const isLoggedOut = require("./../middleware/isLoggedOut");
const isLoggedIn = require("./../middleware/isLoggedIn");       


// TODO --------------------PROFILE--------------------

// http://localhost:3000/users/profile/:id
router.get("/profile/:id", isLoggedIn ,usersController.viewProfile)



// TODO --------------------EDIT--------------------
// router.get = ("/edit-user/:id", usersController.viewEditProfile)
// router.post = ("/edit-user/:id", usersController.postEditProfile)


    






module.exports = router;