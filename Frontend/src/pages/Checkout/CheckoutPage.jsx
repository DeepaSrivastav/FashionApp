import React, { useEffect, useState } from 'react'
import { useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCreateOrderMutation } from '../../redux/orders/ordersApi'
import { getCart } from '../../redux/cart/cartSlice'
import  Swal  from 'sweetalert2'

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
const CheckoutPage = () => {
  
  const dispatch = useDispatch()
  const { currentUser} = useAuth()


  useEffect(()=>{
         dispatch(getCart(currentUser?.email))     
      },[dispatch])

  const cart = useSelector(state => state.cart?.cartItems);
  const totalPrice = cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2)

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm()

const [createOrder, {isLoading, error}] = useCreateOrderMutation();
const navigate = useNavigate()

const [isChecked, setIsChecked] = useState(false)

  const onSubmit = async(data) => {
   
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address:{
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode
      },
      phone: data.phone,
      productIds: cart.map(item => item?._id),
      totalPrice: totalPrice
    }
    console.log(newOrder)

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Confirmed Order",
        text: "Your order placed successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay!"
      });
      navigate("/orders")

    } catch (error) {
      console.error("Error place an order", error);
      alert("Failed to place an order")
  }
  }

  if(isLoading) return <div>Loading....</div>
  return (
    <section>
      <div className='min-h-screen p-6 bg-gray-100 flex items-center justify-center'>
        {/* Container is a component for fixing an element's width to the current breakpoint. mx-auto is usedto center the container element*/}
        <div className='container max-w-screen-lg mx-auto'>
           <div>
              <div>
                <h2 className='font-semibold text-xl text-gray-600 mb-2'>Cash on Delivery</h2>
                <p className='text-gray-500 mb-2'>Total Price: ${totalPrice}</p>
                <p className='text-gray-500 mb-6'>Items: {cart?.length > 0 ? cart.length : 0}</p>
              </div>
              <div className='bg-white rounded shadow-lg p-4 px-4 md:0-8 mb-6'>
                <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8'>
                  <div className='text-gray-600'>
                     <p className='font-medium text-lg'>Personal Details</p>
                     <p>Please fill out all the fields</p>
                  </div>

                  <div className='lg:col-span-2'>
                    <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
                    <div className="md:col-span-5">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                            {...register("name", { required: true })}
                             type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                      </div>

                      <div className="md:col-span-5">
                          <label html="email">Email Address</label>
                              <input
                                defaultValue={currentUser?.email}
                                type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                disabled
                                placeholder="email@domain.com" />
                        </div>

                        <div className="md:col-span-5">
                          <label html="phone">Phone Number</label>
                              <input
                                {...register("phone", { required: true })}
                                type="Number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                        </div>

                        <div className="md:col-span-3">
                          <label htmlFor="address">Address / Street</label>
                              <input
                                {...register("address", { required: true })}
                                type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="city">City</label>
                              <input
                                {...register("city", { required: true })}
                                type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                          </div>

                          <div className="md:col-span-2">
                            <label htmlFor="country">Country / region</label>
                                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                    <input
                                        {...register("country", { required: true })}
                                        type="text"
                                        name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                    <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                    </button>
                                </div>
                           </div>

                           <div className="md:col-span-2">
                              <label htmlFor="state">State / province</label>
                              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                  <input
                                      {...register("state", { required: true })}
                                      type="text" name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                  <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                      <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <line x1="18" y1="6" x2="6" y2="18"></line>
                                          <line x1="6" y1="6" x2="18" y2="18"></line>
                                      </svg>
                                  </button>
                                  <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                      <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                  </button>
                              </div>
                          </div>

                          <div className="md:col-span-1">
                              <label htmlFor="zipcode">Zipcode</label>
                              <input
                                  {...register("zipcode", { required: true })}
                                  type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                          </div>

                          <div className='md:col-span-5 mt-3'>
                            <div className='inline-flex items-center'>
                               <input
                                   onChange={(e)=>setIsChecked(e.target.checked)}
                                   type='checkbox' name='billing_name' className='form-checkbox'/>
                                <label htmlFor='billing_name' className='ml-2'>I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms and Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy.</Link></label>
                            </div>

                          </div>

{/* inline-flex: utility to create an inline flex-container that flows with text                           */}
                           <div className="md:col-span-5 text-right">
                              <div className="inline-flex items-end">
                                  <button
                                      disabled={!isChecked}
                                      className={`${!isChecked ? "bg-gray-500" : "bg-blue-gray"}  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>Place an Order</button>
                              </div>
                          </div>
                    </div>
                  </div>
                </form>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage