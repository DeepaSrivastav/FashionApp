const cloudinary = require("cloudinary").v2;
const multer = require("multer")
// const DataUri = require('datauri') 
// const path = require('path') 

// const dUri = new DataUri();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new multer.memoryStorage();
 
    async function imageUploadUtil(file){
        const result = await cloudinary.uploader.upload(file, {
           resource_type: "auto",
        });
       
        return result;
       }
    //    const dataUri = req => dUri.format(path.extname(req.file).toString(), req.file.buffer);


const upload = multer({storage});

module.exports = { upload, imageUploadUtil};