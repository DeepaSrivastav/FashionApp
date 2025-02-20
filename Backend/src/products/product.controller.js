const Product = require('./product.model')



const getAllProducts = async(req, res) => {
    try{
        const products = await Product.find().sort({createdAt: -1})
        res.status(200).send(products)
    } catch(error){
        console.error('Error fetching products',error);
        res.status(500).send({message:'Failed to fetch books'})
    }
}

const getSingleProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            res.status(404).send({message:'product not found'})
        }
        res.status(200).send(product)
    } catch(error){
        console.error('Error fetching product', error);
        res.status(500).send({message:'Failed to fetch product'})
    }
}




module.exports = {
    getAllProducts,
    getSingleProduct,
}