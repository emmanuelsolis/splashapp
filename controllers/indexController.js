exports.home =  (req,res) => {
    res.render("index")
}

exports.contactUs = (req,res,next) => {
    res.render("contact-us")
}

exports.aboutUs = (req,res,next) => {
    res.render("aboutUs")
}