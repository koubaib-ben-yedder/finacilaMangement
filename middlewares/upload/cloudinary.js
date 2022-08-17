

  
   
const cloudinary = require('cloudinary').v2;

exports.cloudinaryFn=async(req,res,next)=>{
    

    console.log("---------------------", process.env.CLOUD_NAME, process.env.API_KEY,process.env.API_SECRET_KEY)

    cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET_KEY,
    secure: true
  })

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  
  }
  


  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(req.file.path, options);
    console.log(result);
  

  } catch (error) {

    console.error(error);
  }

  next()
}
  