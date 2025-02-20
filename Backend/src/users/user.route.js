const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const { postProduct, UpdateProduct, deleteProduct, getAllProducts, handleImageUpload } = require('./products-controller');
const { upload } = require('../../Helpers/cloudinary');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

//route for signing in as admin. you need to manually create admin on database and then sign in using this route.

router.post("/", async (req, res) => {
  const { username, password} = req.body;

  try{
    const admin = await User.findOne({username});
    if(!admin) {
        res.status(404).send({nessage:"Admin not found!"})
    }
    if(admin.password != password){
        res.status(401).send({message:'Invalid password!'})
    }

    const token = jwt.sign(
        {id: admin._id, username: admin.username, role: admin.role},
        JWT_SECRET,
        {expiresIn:'1h'}
    )

    return res.status(200).json({
        message:'Authentication successful',
        token: token,
        user:{
            username: admin.username,
            role: admin.role
        }
    })
  } catch(error){
    console.error('Failed to login as admin', error)
    res.status(401).send({message: 'Failed to login as admin'})
  }
})

router.post("/upload-image", upload.single("my-file"), handleImageUpload);
router.post("/add", postProduct);
router.put("/edit/:id", UpdateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", getAllProducts);


module.exports = router;