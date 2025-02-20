import { PiSealPercentFill } from "react-icons/pi";
import { Link } from "react-router-dom";


export default function HeroSection() {
    return (
        <>
         <div className="flex items-center justify-between gap-[49px] md:flex-row">
          <div className="flex w-[54%] flex-col items-start gap-6 md:w-full md:px-5">
            <button
             className=" flex items-center min-w-[530px] gap-2.5 rounded-[22px] px-5 font-bold text-2xl text-blue-gray bg-white"
            >
              <img src='src/assets/percentage-icon.png' alt='Icon' className="mb-0.5 h-[48px] w-[48px] object-contain"/><span>Enjoy 50% OFF in our Summer Super Sale!</span>
            </button>
            <h1 className="text-[52px] font-bold md:text-[44px] sm:text-[38px]"> 
              Step into Fashion at your <br/>
              Ultimate Style Destination
            </h1>
            <p className="w-full text-[18px] font-medium leading-7 text-gray-600">
              Explore a World of Fashion Possibilties with Exclusive Discounts - Dive into Your Ultimate Style 
              Destination and Elevate your Wardrobe Today!
            </p>
            <Link to="/productlist">

            <button className="flex items-center justify-center py-4 bg-blue-gray px-[30px] sm:px-5 font-bold rounded min-w-[176px] gap-2.5 ">
             <span className="inline-block text-white text-xl">Shop Now</span><img src='src/assets/right-arrow.png' alt='Frame' className="h-[24px]  w-[24px] object-contain"/>
            </button>
            </Link>

          </div>
          <img src='src/assets/hero-section-image.png' alt='Closeup Portrait' className="h-[636px] w-[36%] md-full text-bg-gray-200"/>
         </div>
        </>
    )
}