//todo -------------- IMPORTAMOS LIBRERIAS --------------
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs")


//todo -------------- MODELO DE USUARIO --------------
const userSchema = new Schema({
    profile_pic:{
        type: String,
        default: "https://w0.peakpx.com/wallpaper/753/644/HD-wallpaper-perfil-cool-tecnologia-thumbnail.jpg" 
    },
    username:{
        type: String, 
        require:true
    },
    phone_number:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:[true,"Email es requerido"],// por si el camio se encuentra vacio
        unique:true,// unico en la base de datos 
        match: [/^\S+@\S+\.\S+$/, "Por favor, ingresa un email válido"],
        lowercase:true, // email solo e minusculas
        trim: true // sin espacios vacios

    },
    password: {
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["USER","PARTNER"],
        default:"USER"
       },
    
    _acquired_product: [{type:Schema.Types.ObjectId, ref:'Service'}], // productos adquiridos]
    _acquired_services: [{type:Schema.Types.ObjectId, ref:'Partner'}],// productos adquiridos del Partner]

    
});




module.exports = model("User", userSchema);
