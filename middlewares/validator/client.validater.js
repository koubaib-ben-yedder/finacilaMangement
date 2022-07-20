const {validationResult,body} =require("express-validator")


exports.validateClient=[
  
    body("firstName").notEmpty().withMessage("fisrtname can't be empty")
    .not().isNumeric().withMessage("firstName should be string"),
    body("lastName").notEmpty().withMessage("lastname can't be empty")
    .not().isNumeric().withMessage("lastName should de string"),
    body("age").notEmpty().withMessage("age can't be empty")
    .isNumeric().withMessage("age you should be number"),
    body("job").notEmpty().withMessage("job can't be empty")
    .not().isNumeric().withMessage("job should be string")
]

exports.validationClient=(req,res,next)=>{

    const error=validationResult(req)

    if(!error.isEmpty()){

        return res.status(400).send({error:error.array()})
    }


    next()
}