const {body,validationResult}=require("express-validator")


exports.validateLogin=[
    body("email").notEmpty().withMessage("email can't be empty")
    .isEmail().withMessage("email not valid"),
    body("password").isStrongPassword().withMessage("password should be a combination of letters with uperCase and lowerCase and numbers and special characteres"),
]

exports.validationLogin=(req,res,next)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty()){

        return res.status(400).send({error:errors.array()})
    }

    next()

}