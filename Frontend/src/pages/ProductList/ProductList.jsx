import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header/header";
import ProductCard from "../../components/ProductCard";
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../../redux/products/productSlice";
import { getAuth } from "firebase/auth";


// const products = [
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
//     {
//         "id": 4,
//         "name": "Flip Flops, Red",
//         "category": "Men's footwear",
//         "coverImage":"menfootwear2.jpg",
//         "price": 19.00,
//         "stock": 6
//     },
//     {
//         "id": 5,
//         "name": "Flip Flops, Blue",
//         "category": "Men's footwear",
//         "coverImage":"menfootwear3.jpg",
//         "price": 19.00,
//         "stock": 0
//     },
//     {
//         "id": 6,
//         "name": "Gold Button Cardigan, Black",
//         "category": "Women's casual",
//         "coverImage":"womencasual1.jpg",
//         "price": 167.00,
//         "stock": 6
//     },
//     {
//         "id": 7,
//         "name": "Cotton Shorts, Medium Red",
//         "category": "Women's casual",
//         "coverImage":"womencasual2.jpg",
//         "price": 30.00,
//         "stock": 5
//     },
//     {
//         "id": 8,
//         "name": "Fine Stripe Short Sleeve￼Shirt, Grey",
//         "category": "Men's casual",
//         "coverImage":"mencasual.webp",
//         "price": 49.99,
//         "stock": 9
//     },
//     {
//         "id": 9,
//         "name": "Fine Stripe Short Sleeve￼Shirt, Green",
//         "category": "Men's casual",
//         "coverImage":"mencasual2.jpg",
//         "price": 49.99,
//         "stock": 9
//     },
//     {
//         "id": 10,
//         "name": "Sharkskin Waistcoat, Charcoal",
//         "category": "Men's formal",
//         "coverImage":"menformal1.jpg",
//         "price": 75.00,
//         "stock": 2
//     },
//     {
//         "id": 11,
//         "name": "Lightweight Patch Pocket￼Blazer, Deer",
//         "category": "Men's formal",
//         "coverImage":"menformal2.jpg",
//         "price": 175.50,
//         "stock": 1
//     },
//     {
//         "id": 12,
//         "name": "Bird Print Dress, Black",
//         "category": "Women's formal",
//         "coverImage":"womenformal1.jpg",
//         "price": 270.00,
//         "stock": 10
//     },
//     {
//         "id": 13,
//         "name": "Mid Twist Cut-Out Dress, Pink",
//         "category": "Women's formal",
//         "coverImage":"womenformal2.jpg",
//         "price": 540.00,
//         "stock": 5
//     }
//     ]
const categories = ["Category", "Men's casual","Women's casual", "Men's formal","Women's formal", "Men's footwear","Women's footwear"]

export default function ProductList(){
    const dispatch = useDispatch()
 
    const [selectedCategory, setSelectedCategory] = useState("Category")
    
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const products = useSelector((state)=>state.product?.products)
    console.log(products)

    const filteredProducts = selectedCategory === "Category" ? products : products.filter(product => product.category === selectedCategory)
    
    return(
       <>
       <Header/>
         <Helmet>
            <title>Product List - Explore Fashion Essentials</title>
            <meta
              name="description"
              content="Browse our product list for the latest fashion deals. Enjoy 25% off on essential tees, vintage-inspired tops, and more from brands like H&M and Zara"
            />
         </Helmet>
         <div className="flex flex-row gap-20 self-stretch">
            <div className="flex flex-col gap-5">
              
                <div className='mb-8 mt-10 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border-none  rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option className="mb-5" key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>
            </div>
            <div className="flex flex-row flex-wrap flex-1 gap-10 self-stretch mt-20 mb-20">
                {
                    filteredProducts?.map((item,index)=>(
                        <ProductCard product={item}/>
                    ))
                }
            </div>
         </div>
         
       <Footer/>
       </>
    )
}