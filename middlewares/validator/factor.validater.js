const {validationResult,body} =require("express-validator")


exports.validateFactor=[
  
    body("descriptionFactor").notEmpty().withMessage("description dont be empty")
    .not().isNumeric().withMessage("description should be string"),
    body("client").notEmpty().withMessage("client dont be empty")
    .not().isNumeric().withMessage("client shsould be a string"),
    body("imageFactor").custom((value, {req}) => {
        
        console.log("2",req.file,req.file.mimetype == "image/png")
      
        if(req.file.mimetype == "image/png" || req.file.mimetype == "image/jpg" || req.file.mimetype == "image/jpeg"){
            return req.file.mimetype; // return "non-falsy" value to indicate valid data"
        }else{
            return false; // return "falsy" value to indicate invalid data
        }
    })
    .withMessage('Please only submit a image.'),
    body("dateFactor").notEmpty().withMessage("date factor can't be empty"),
    body("valueToPay").notEmpty().withMessage("value to pay  can't be empty")
    .isNumeric().withMessage("value to pay should be a character"),
    body("remainFactor").notEmpty().withMessage("remain factor can't be empty")
    .isNumeric().withMessage("remain factor should be number")
    
    
  
    
   
]

exports.validationFactor=async(req,res,next)=>{
    
    console.log("3",req.file )
    try {
        const error=validationResult(req)
      
     
        if(!error.isEmpty()){
    
         
            return res.status(400).send({error:error.array()})
        }
    
    
     
    } catch (error) {
        console.log("2")    
        
        return res.status(500).send(error)
    }
    next()


}