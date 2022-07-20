const {validationResult,body} =require("express-validator")


exports.validateFactor=[
  
    body("descriptionFactor").notEmpty().withMessage("description dont be empty")
    .not().isNumeric().withMessage("description should be string"),
    body("client").notEmpty().withMessage("client dont be empty")
    .not().isNumeric().withMessage("client shsould be a string"),
    body("imageFactor").notEmpty().withMessage("image dont be empty")
    .not().isNumeric().withMessage("image name sould be a string"),
    body("dateFactor").notEmpty().withMessage("date factor can't be enpty"),
    body("valueToPay").notEmpty().withMessage("value to pay  can't be empty")
    .isNumeric().withMessage("value to pay should be a character"),
    body("remainFactor").notEmpty().withMessage("remain factor can't be empty")
    .isNumeric().withMessage("remain factor should be number")
    
    
  
    
   
]

exports.validationFactor=async(req,res,next)=>{
    console.log(req.body)
    try {
        const error=validationResult(req.body)
        next()

        if(!error.isEmpty()){
    
            return res.status(400).send({error:error.array()})
        }
    
    
     
    } catch (error) {

        
        return res.status(500).send(error)
    }
  


}