//todo -------------- IMPORTACIONES --------------
const bcryptjs = require("bcryptjs")
const User = require("./../models/User.model")

const bodyParser = require("body-parser")

// renderiza form de sign up
exports.viewSignup = (req,res,next) => {
    res.render("auth/signup")
}

exports.signup = (req,res,next) => {

    


    //1.- Obtenemos los datos del formulario

    const {role,profile_pic, username, email, description, password, phone_number} = req.body

    console.log("DATOS DEL USUARIO",{profile_pic,username, email, description, password, phone_number})

    

    // //==============> VALIDACIONES
    // //  A) Campos vacios
    // if(!restUser.password || !restUser.password.length || !restUser.username || !restUser.username.length){
    //     res.render("auth/signup", {
    //         errorMessage:"Por favor llena todos los campos"
    //     })
    //     return
    // }

    // //  B) Fortalecimiento del Password
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // if(!regex.test(restUser.password)){
		
	// 	res.render("auth/signup", {
	// 		errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
	// 	})		

	// 	return
	// }


    //3.- Creamos usuario nuevo
    const salt = bcryptjs.genSaltSync(10);
    const newPassword = bcryptjs.hashSync(password, salt);

    User.create({profile_pic, username, description, phone_number, email, password: newPassword})
        .then(user => {
            req.session.currentUser = user

            res.redirect(`/profile/${user.id}`)
            //! res.redirect("/auth/login") pruebas para sessions
            console.log("user created", user)
        })
        .catch(err => next(err))
    .catch(error => {
        console.log("EL ERROR ======>". error)
        res.status(500).render("/signup",{
            errorMessage:"Tu correo no es válido, por favor vuelve a ingresar los datos."
        })
    })
    
}

exports.viewLogin =(req,res,next) => {
    res.render("auth/login")
}

exports.login = (req,res,next) => {
    //1.- Obtenemos los datos del formulario

    const { email, password, role} = req.body


   
   
    //==============> VALIDACIONES


    //  //A)validamos que se ingrese datos    
    //  if(!password || !password.length || !email || !email.length ){
    //     res.render("auth/login", {
    //         errorMessage:"Por favor llenar todos los campos"
    //     })

    //     return
    // }

    // B)validamos que la contraseña cumpla con los parametros indicados .

    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // if(!regex.test(password)){
		
	// 	res.render("auth/login", {
	// 		errorMessage: "Tu password debe contener mínimo 6 caracteres, un número y una mayúscula."
	// 	})		

	// 	return
	// }

    const user = req.body

    User.findOne({email})
    .then(user=> {
        if(!user){
            res.render('auth/login')
            console.log("this is THE RQ:BODYYYYYYYYYYY", req.body)
            return
        }else if(bcryptjs.compareSync(password,user.password)){
            req.session.currentUser = user
            res.redirect(`/profile/${user.id}`);
        }
    })
    .catch(error => {
        console.log("error in post de login", error)
    })
    .catch(error => {
        console.log("EL ERROR ======>",error)
        res.status(500).render("auth/login",{
            errorMessage:"Tus datos no son validos por favor vuelve a ingresarlos"
        })
    })
    
    
}

exports.viewProfile = (req,res) => {

    // const {id} = req.params
    // User.findById(id)
    // .then(user => {
        res.render("user/profile",{ userConnected: req.session.currentUser })
    // }).catch(error => {
    //     console.log("error in post Dashboard", error)
    // }    )
}


exports.logout = (req,res,next) => {
    //! NO BORRA SESION DE MONGO
    req.session.destroy((error)=>{
        if(error){
            console.log(error)
            return
        }

        res.redirect("/")
        
        console.log("CERRANDO LA SESION")

    })
}
