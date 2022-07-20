const {validationResult,body} =require("express-validator")


exports.validateEdit=[
    body("nameEdit").notEmpty().withMessage("name dont be empty")
    .not().isNumeric().withMessage("name edit should be string")
    
]

exports.validationEdit=(req,res,next)=>{

    const error=validationResult(req)



    if(!error.isEmpty()){

        return res.status(400).send({error:error.array()})
    }

    next()

}