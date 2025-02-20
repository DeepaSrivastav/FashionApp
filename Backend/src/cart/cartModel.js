const mongoose = require('mongoose');

let cartSchema = new mongoose.Schema(
    {
        emailId:{
           type:String,
           required:true
        },
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        image:{
            type:String,
            required: true
        },
        price:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);



module.exports = mongoose.model('Cart', cartSchema)