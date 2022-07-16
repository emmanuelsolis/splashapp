const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const partnerSchema = new Schema({
  partner_photo:{
    type: String,
    require:true,
    default:"https://cdn.worldvectorlogo.com/logos/splash-2.svg"

  },

  name:{
    type: String,
    require:true
  },
  email:{
    type: String,
    require:true
  },
  phone_number:{
    type:Number,
    require:true
  },
  address:{
    type:String,
    require:true
  },
  password: {
    type:String,
    require:true
  },
  services: [{type: Schema.Types.ObjectId,
    ref: "Partner"}],
  role: {
    type: String,
    require:true,
    default: "partner"
  },
  open_hours:{
    type:String,
    require:true
  },
  _product: [{type:Schema.Types.ObjectId, ref:'Product'}], // productos ofrecidos]
  _user_order: [{type:Schema.Types.ObjectId, ref:'Product'}],// productos adquiridos por el usuario
  
});

const Partner = model("Partner", partnerSchema);

module.exports = Partner;
