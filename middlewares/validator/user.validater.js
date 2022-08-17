const {body,validationResult}=require("express-validator")

exports.validateUser=[

    body("firstName").notEmpty().withMessage("firstName can't be empty")
    .not().isNumeric().withMessage("firstName should be a string"),
    body("lastName").notEmpty().withMessage("lastName cant be empty")
    .not().isNumeric().withMessage("lastName should de string"),
    body("age").notEmpty().withMessage("age can't be empty")
    .isNumeric().withMessage("age should be mumeric"),
    body("email").notEmpty().withMessage("email can't be empty")
    .isEmail().withMessage("email not valid"),
    body("password").isStrongPassword().withMessage("password should be a combination of letters with uperCase and lowerCase and numbers and special characteres"),
    body("accountCode").notEmpty().withMessage("acount value can't be empty"),
    body("value").notEmpty().withMessage("value can't be empty")
    .isNumeric().withMessage("value should have  number"),

]

exports.validationUser=(req,res,next)=>{

    try {

        const error=validationResult(req)
        
        if(!error.isEmpty()){

            return res.status(400).send({error:error.array()})
        }
        next()
        
    } catch (error) {

        return res.status(500).send(error)
        
    }
 

}