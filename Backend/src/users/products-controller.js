const { imageUploadUtil} = require("../../Helpers/cloudinary");
const Product = require('../products/product.model')



const handleImageUpload = async (req, res) => {
    try {
       console.log(req.file)
        // if(req.file) {const file = dataUri.content};
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url)

      res.json({
        success: true,
        result
      });
    } catch(error) {
        console.error(error)
       res.send({message:error.message})
    }
}


const postProduct = async(req, res) => {
    try {
        const newProduct = await Product({...req.body});
        await newProduct.save();
        res.status(200).send({message:'Product posted successfully',product:newProduct})
    } catch(error){
        console.error('Error creating product', error)
        res.status(500).send({message:'Failed to create product'})
    }
}

const getAllProducts = async(req, res) => {
    try{
        const products = await Product.find().sort({createdAt: -1})
        res.status(200).send(products)
    } catch(error){
        console.error('Error fetching products',error);
        res.status(500).send({message:'Failed to fetch books'})
    }
}


const UpdateProduct = async(req, res) => {
  try {
      const {id} = req.params
      const newProduct = await Product.findByIdAndUpdate(id,{...req.body}, {new:true});
      await newProduct.save();
      res.status(200).send({message:'Product posted successfully',product:newProduct})
  } catch(error){
      console.error('Error updating product', error)
      res.status(500).send({message:'Failed to update product'})
  }
}

const deleteProduct = async(req, res) => {
    try{
       const {id} = req.params;
       const deletedProduct = await Product.findByIdAndDelete(id);
       if(!deleteProduct){
        res.status(404).send({message:"Product is not found"})
       }
       res.status(200).send({
        message:"Product deleted successfully",
        product: deletedProduct
       })
    } catch(error){
       console.error("Error deleting a product", error);
       res.status(500).send({message:"Failed to delete a product"})
    }
}

module.exports = {
    postProduct,
    getAllProducts,
    UpdateProduct,
    deleteProduct,
    handleImageUpload

}

