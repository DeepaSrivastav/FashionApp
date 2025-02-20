import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteCartItem, getCart } from '../../redux/cart/cartSlice';
import Swal from 'sweetalert2'

// const cart = [
//     {
//         "id": 1,
//         "name": "Almond Toe Court Shoes, Patent Black",
//         "category": "Womens Footwear",
//         "coverImage":"womenfootwear1.jpg",
//         "price": 99.00,
//         "stock": 5
//     },
//     {
//         "id": 2,
//         "name": "Suede Shoes, Blue",
//         "category": "Womens Footwear",
//         "coverImage":"womenfootwear2.jpg",
//         "price": 42.00,
//         "stock": 4
//     },
//     {
//         "id": 3,
//         "name": "Leather Driver Saddle Loafers, Tan",
//         "category": "Men's footwear",
//         "coverImage":"menfootwear1.jpeg",
//         "price": 34.00,
//         "stock": 12
//     },
// ]

const CartPage = () => {

    const { currentUser } = useAuth()
    const dispatch = useDispatch()
  

    useEffect(()=>{
       dispatch(getCart(currentUser?.email))     
    },[dispatch])

    const cart = useSelector((state) => state.cart.cartItems)
    console.log(cart)


    // const totalPrice =  cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
   
    const calculateTotal = (cart) => {
        if(cart.length){
            let total = 0;
            for(let i=0; i<cart.length; i++)
             total += cart[i].price
            return total;
        } else {
            return 0;
        }
        
    }
    const totalPrice = calculateTotal(cart).toFixed(2);



    const handleRemoveFromCart = (id) => {
        dispatch(deleteCartItem(id))
    }

    const handleClearCart  = () => {
        dispatch(clearCart())
    }
    return (
      
            <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                        <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                        <div className="ml-3 flex h-7 items-center ">
                            <button
                                type="button"
                                onClick={()=>handleClearCart() }
                                className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
                            >
                                <span className="">Clear Cart</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">

                            {
                                cart.length > 0 ? (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {
                                            cart.map((product) => (
                                                <li key={product?._id} className="flex py-6">
                                                    
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            alt=""
                                                            src={product?.image}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <Link to='/'>{product?.name}</Link>
                                                                </h3>
                                                                <p className="sm:ml-4">Rs {product?.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category: </strong>{product?.category}</p>
                                                        </div>
                                                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                            <p className="text-gray-500"><strong>Qty:</strong> 1</p>

                                                            <div className="flex">
                                                                <button
                                                                onClick={() => handleRemoveFromCart(product._id)}
                                                                type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                </li>
                                            ))
                                        }



                                    </ul>
                                ) : (<p>No product found!</p>)
                            }


                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs {totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-blue-gray px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to="/">
                            or
                            <button
                                type="button"

                                className="font-medium text-blue-gray hover:text-indigo-500 ml-1"
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    
        
    )
}

export default CartPage