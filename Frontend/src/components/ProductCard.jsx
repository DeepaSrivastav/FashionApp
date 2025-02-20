import React from 'react'
import { getImgUrl } from '../utils/getImgUrl'
import { FiShoppingCart} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { use } from 'react'
import { useDispatch} from 'react-redux'
import { addToCart} from '../redux/cart/cartSlice'
import Swal from 'sweetalert2'

const ProductCard = ({product}) => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
 const email = currentUser?.email;

  const handleAddToCart = (id) => {
    console.log(id)
    const cartData = {
      id,
      email
     }
    if(currentUser){
      dispatch(addToCart(cartData))
    } else {
      Swal.fire({
        title:"Please login",
        text:'You need to login before adding to cart',
        icon:"warning"
      })
    }
  }
  return (
    <div className='flex flex-col w-[300px] gap-2.5 rounded-md' >
      <div className='relative h-[340px] content-center self-stretch'>
        <img src={product?.coverImage}
        alt="product"
        className='h-[340px] w-full flex-1 object-cover rounded-tr rounded-tl'
        />
      </div>
      <div className='flex flex-col items-start justify-center gap-1.5 self-stretch'>
          <h6 className='text-[16px] font-semibold'>
            {product?.name.length > 80 ? `${product.name.slice(0, 80)}...`: product?.name}
          </h6>
          <div className='flex flex-wrap gap-[9px] self-stretch'>
            <h6 className='text-[18px] font-bold'>
             ${product?.price}
            </h6>
           {/* <p className='text-[18px] font-normal text-gray-400 line-through'>Rs 1000</p> */}
          </div>
        </div>
        <button
           onClick={()=> handleAddToCart(product._id)}
           className='btn-primary bg-blue-gray text-white px-6 space-x-1 flex items-center gap-1 p-4 rounded-md'>
                <FiShoppingCart className=''/>
                <span>Add to Cart</span>
          </button>
    </div>
    // <div className='flex flex-row items-center justify-between h-72 w-80 rounded-lg transition-shadow duration-300 mb-20 mt-5 gap-20 flex-wrap'>
    //   <div className='flex flex-col items-center  justify-center gap-4'>
    //     <div className='h-[70%] w-full sm:flex-shrink-0 border rounded-md'>
    //        <Link to={`/books/${product.id}`}>
    //         <img 
    //             src={`${getImgUrl(product?.coverImage)}`}
    //             alt='product'
    //             className='w-full bg-cover object-fit p-2 rounded-md cursor-pointer hover: scale-105 transition-all duration-200'
    //         />
    //        </Link>
    //     </div>
    //     <div>
    //       <Link to={`/books/${product.id}`}>
    //         <h3 className='text-xl font-semibold hover:text-blue-600 mb-3'>
    //           {product?.category}
    //         </h3>
    //         </Link>
    //         <p className='text-gray-600 mb-5'>{product?.name.length > 80 ? `${product.name.slice(0,80)}...`: product?.description}</p>
    //         <p className='font-medium mb-5'>
    //           ${product?.price}
    //         </p>
    //       <button
    //        onClick={()=> handleAddToCart(product.id)}
    //        className='btn-primary px-6 space-x-1 flex items-center gap-1'>
    //             <FiShoppingCart className=''/>
    //             <span>Add to Cart</span>
    //       </button>
    //     </div>
    //   </div>
      
    // </div>
  )
}

export default ProductCard