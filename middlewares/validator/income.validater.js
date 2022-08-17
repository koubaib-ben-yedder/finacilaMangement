const {validationResult,body} =require("express-validator")


exports.validateIcome=[
   
    body("nameIncome").notEmpty().withMessage("name icome cant be empty")
    .not().isNumeric().withMessage("name should be a string"),
    body("descriptionIncome").notEmpty().withMessage("description icome can't be empty")
    .not().isNumeric().withMessage("should be a string"),
    body("dateIncome").notEmpty().withMessage("date Income can't be empty")
    .isNumeric().withMessage("should be a number"),
    body("manyToHave").notEmpty().withMessage("many to have can't be empty")
    .isNumeric().withMessage("many to have to have should be number"),
    body("remainIncome").notEmpty().withMessage("remain income can't be empty")
    .isNumeric().withMessage("remain income should be a number" )
   
]
console.log("--------------")

exports.validationIcome=(req,res,next)=>{
    
console.log("--------")
    console.log(req.body)
   
    const error=validationResult(req)

    if(!error.isEmpty()){

        return res.status(400).send({error:error.array()})
    }

    next()

}