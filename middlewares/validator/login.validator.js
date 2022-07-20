const {body,validationResult}=require("express-validator")


exports.validateLogin=[
    body("email").notEmpty().withMessage("email can't be empty")
    .isEmail().withMessage("email not valid"),
    body("password").isStrongPassword().withMessage("password incorrect")
]

exports.validationLogin=(req,res,next)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty()){

        return res.status(200).send({msg:errors.array()})
    }

    next()

}