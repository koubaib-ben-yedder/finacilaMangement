const {validationResult,body} =require("express-validator")


exports.validateIcome=[
   
    body("nameIncome").notEmpty().withMessage("name icome cant be empty")
    .not().isNumeric().withMessage("name should be a string"),
    body("descriptionIncome").notEmpty().withMessage("description icome can't be empty")
    .not().isNumeric().withMessage("should be a string"),
    body("dateIncome").notEmpty().withMessage("date Income can't be empty")
    .not().isNumeric().withMessage("should be a string"),
    body("manyToHave").notEmpty().withMessage("many to have can't be empty")
    .isNumeric().withMessage("many to have to have should be number"),
    body("remainIncome").notEmpty().withMessage("remain income can't be empty")
    .isNumeric().withMessage("remain income should be a number" )
   
]

exports.validationIcome=(req,res,next)=>{
    
    console.log(req.body)
    next()
    const error=validationResult(req.body)

    if(!error.isEmpty()){

        return res.status(400).send({error:error.array()})
    }



}