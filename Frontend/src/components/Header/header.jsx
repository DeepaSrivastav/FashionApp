import { Component, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { LiaUserLockSolid } from "react-icons/lia";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from '../../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { getCart } from "../../redux/cart/cartSlice";
import { getAuth } from "firebase/auth";


const navigation = [
  {name:'Dashboard', href:'/'},
  {name:'Orders', href:'/orders'},
  {name:'Cart Page', href:'/cart'},
  {name:'Check Out', href:'/checkout'},
  {name:'Admin Login', href:'/admin'}
]




export default function Header(){

    const [Close, setClose] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const dispatch = useDispatch()

    const { currentUser, logout} = useAuth()


    useEffect(()=>{
       dispatch(getCart(currentUser?.email))       
    },[dispatch, logout])

    const cartItems = useSelector(state => state.cart?.cartItems)
    console.log(cartItems)


    const handleLogOut = () => {
      logout()
    }
    return(
        <header className="w-full">
            <div className={`${Close ? "hidden":"visible"} w-full bg-blue-gray
             py-3`}>
                <div className="flex  w-full items-center justify-between  md:px-5">
                   <p className='text-[16px] font-normal !text-white-a700'>
                     <span className="text-white">
                       Sign up now and enjoy a 25% discount on your first order. 
                     </span>
                     <Link to="/signup">
                     <span className="font-semibold text-blue-500"> Signup now</span>
                     </Link>
                   </p>
                   <button onClick={()=>setClose(true)}>
                     <img src='src/assets/png-close-x-logo-white-icon-73581169686041574qndouypm.png' alt='Promo Icon' className="h-[24px] md:w-full color-white" >
                     </img>
                     </button>    
                </div>

            </div>
            <div className="flex justify-center self-stretch border-b border-solid border-gray-600 bg-white py-6 sm:py-5">
             <div className="flex w-full items-center justify-between gap-5 md:flex-row md:px-5">
              <a href="/">
               <img src='src/assets/fashion-logo.webp' alt='fashion logo' className="h-[80px] w-[126px] object-contain"/>
               </a>
               <ul className="flex flex-wrap gap-5">
                       <li>
                        <a href='/'>
                          <h2 className="text-[14px] font-semibold">
                            Home
                          </h2>
                        </a>
                       </li>
                       <li>
                        <a href='/productlist'>
                          <h2 className="text-[14px] font-semibold text-gray-600 hover:text-blue-gray">
                            Shop
                          </h2>
                        </a>
                       </li>
                       <li>
                        <a href='/women'>
                          <h2 className="text-[14px] font-semibold text-gray-600 hover:text-blue-gray ">
                            Women
                          </h2>
                        </a>
                       </li>
                       <li>
                        <a href='/men'>
                          <h2 className="text-[14px] font-semibold text-gray-600 hover:text-blue-gray">
                            Men
                          </h2>
                        </a>
                       </li>
                       <li>
                        <a href='/accessories'>
                          <h2 className="text-[14px] font-semibold text-gray-600 hover:text-blue-gray">
                            Accessories
                          </h2>
                        </a>
                       </li>
                       {/* <li>
                        <a href='#'>
                          <h2 className="text-[14px] font-semibold text-gray-600 hover:text-blue-gray">
                            About Us
                          </h2>
                        </a>
                       </li>
                       <li>
                        <a href='#'>
                          <h2 className="text-[14px] font-semibold text-gray-600 hover:text-blue-gray">
                            Contact Us
                          </h2>
                        </a>
                       </li> */}
                       
                     </ul>
                     <div className="relative flex items-center md:space-x-3 space-x-2">
                     <a href="/admin" className="hidden sm:block bg-blue-gray p-2 text-white rounded text-sm">
                      Admin Login
                    </a>
                    <div >
                      
                        {
                            currentUser ? <>
                            
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                            </button>
                            {/* show dropdowns */}
                            {
                                isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {
                                                navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <button
                                                onClick={handleLogOut}
                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </>  : (
                                <Link to="/signin"> <HiOutlineUser className="size-6" /></Link>
                            )
                        }
                    </div>
                 
                    
                    {/* <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button> */}

                    <Link to="/cart" className="bg-primary flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='size-6' />
                        {
                            cartItems ?  <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> :  <span className="text-sm font-semibold sm:ml-1">0</span>
                        }
                        
                       
                    </Link>
                    
                </div>
                     {/* <div className="flex gap-5">
                       <a href='#' className="h-[24px]">
                       <CiSearch />
                       </a>
                       <a href='#' className="h-[24px]">
                       <MdFavoriteBorder />
                       </a>
                       <a href='#' className="h-[24px]">
                       <IoBagOutline />
                       </a>

                       <a href='#' className="h-[24px]">
                       <LiaUserLockSolid />
                       </a>
                     </div> */}
             </div>
            </div>
        </header>
    )
}