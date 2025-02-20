import { useEffect, useState } from "react";
import Footer from "../../../components/Footer"
import Header from "../../../components/Header/header"
import { BsChevronCompactLeft} from 'react-icons/bs';
import { BsChevronCompactRight} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/products/productSlice";
import ProductCard from "../../../components/ProductCard";

const Men = () => {

    const dispatch = useDispatch();

    const featureImages = [
        '/src/assets/feature-image10.jpeg',
        '/src/assets/feature-image6.jpg',
        '/src/assets/feature-image7.webp',
        '/src/assets/feature-image8.webp',
        '/src/assets/feature-image9.jpeg'
    ]

    const [currentSlide, setCurrentSlide] = useState(0);


    useEffect(() => {
        dispatch(getProducts());
    },[dispatch])

    const products = useSelector((state) => state.product?.products)

    const filteredProducts = products.filter(product =>  product.category.includes("Men"))
    console.log(filteredProducts,"filtered Products")


   

   

  
    return(
        <>
        <Header/>
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
               {featureImages && featureImages.map((item, index) => (
                <img
                   src={item}
                   key={index}
                   className={`${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}/>               ))}
               <button
                variant="outline"
                onClick={()=>setCurrentSlide(
                    (prevSlide) =>                       
                        (prevSlide - 1 + featureImages.length)% featureImages.length
                )}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white"
               >
                <BsChevronCompactLeft size={30}/>
               </button>
               <button
                variant="outline"
                size={30}
                onClick={() => setCurrentSlide(
                    (prevSlide) => (prevSlide + 1) % featureImages.length
                )}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white"
               >
                <BsChevronCompactRight size={30}/>
               </button>
            </div>
            <div className="flex flex-row flex-wrap flex-1 gap-10 self-stretch ml-10 mt-20 mb-20">
                {
                    filteredProducts?.map((item,index)=>(
                        <ProductCard key={index} product={item}/>
                    ))
                }
            </div>
            </div>

        <Footer/>
        </>
    )
}

export default Men