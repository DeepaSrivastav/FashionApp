const Cart = require('./cartModel')
const Product = require('../products/product.model')

const getCart = async(req, res) => {
    try{
        const {email} = req.params
        const cartItems = await Cart.find({emailId:email}).sort({createdAt: -1});
        res.status(200).send(cartItems)
    } catch(error){
        res.status(500).send({message:'Failed to fetch cart'})
    }

}

const addToCart = async(req, res) => {
     
     const  id= req.body.id
     const email = req.body.email

    console.log(id)

    // const { id } = req.params;


    try {
    //     let cart = await Cart.findOne({ productId: req.body.id })

        const productDetails = await Product.findById(id);
    //     if(cart){
    //         cart.items.push({
    //             productId: productId,
    //             image:productDetails.coverImage,
    //             price:productDetails.price,
    //             name:productDetails.name,
    //             category:productDetails.category
    //         })
    //     } else {
            const cartData = {
                emailId: email,
                productId: id,
                    image:productDetails.coverImage,
                    price:productDetails.price,
                    name:productDetails.name,
                    category:productDetails.category
            
            }
            cart = new Cart(cartData);
            let data = await cart.save();
            res.json(data);
         
        // } else{
        //      cart.products.push({ productId, image, price, productTitle, productCategory});
        //      cart = await cart.save();
        //      return res.status(201).send(cart);
        // }

        // else {
        //     const newBook = await Cart.create({userId, products:[{ productId, image, price, productTitle, productCategory}]});
        //     await newBook.save();
        //     res.status(200).send({message:'Item added successfully',cart: newBook})
        // }
        

    } catch(error){
        console.error('Error adding to cart', error);
        res.status(500).send({message:'Failed to add to cart'})
    }
}


const deleteCartItem = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedItem = await Cart.findByIdAndDelete(id);
        if(!deletedItem) {
            res.status(404).send({message:'Item not found'})
        }
        res.status(200).send({
            message:'Item deleted successfully',
            Cart: deletedItem
        })
    } catch(error) {
        console.log('Error deleting cart item',error);
        res.status(500).send({message:'Failed to delete the item'})
    }
}
const clearCart = async (req, res) => {
    try {
        const response = await Cart.deleteMany({});
        if(!response) {
            res.status(404).send({message:'Item not found'})
        }
        res.status(200).send({
            message:'Item deleted successfully',
            Cart: response
        })
    } catch(error) {
        console.log('Error deleting cart item',error);
        res.status(500).send({message:'Failed to delete the item'})
    }
}

module.exports = {
    getCart,
    addToCart,
    deleteCartItem,
    clearCart
}