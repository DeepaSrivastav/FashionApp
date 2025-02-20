import { Link } from "react-router-dom";

export default function LimitedTimeOfferSection(){
    return(
        <>
        <div className="self-stretch">
           <div className="flex justify-center bg-gray-50 md:px-5">
            <div className="flex justify-center py-10 md:px-5">

           
             <div className="flex w-full items-center gap-[50px] md:flex-row">
               <img src='src/assets/limitedtimeofferimage.png' alt='Women Image' className="h-[486px] w-[46%] object-contain"/>
               <div className="flex flex-1 flex-col w-full items-start justify-center gap-6 md:stretch"> 
                  <h2 className="text-[22px] font-semibold">
                    Limited Time Offers
                  </h2>
                  <h3 className="w-full text-[46px] font-bold leading-[66px] md:text-[42px] sm:text-[36px]">
                     Get 50% Off All Fashion - Limited Time Offer!
                  </h3>
                  <p className="w-full text-[18px] font-medium leading-7 text-gray-600">
                    Discover Your Signature Look for Less - Enjoy discount All Fashion Items! Limited Time Offer, Act Fast!
                  </p>
                  <Link to="/productlist">
                  <button className="flex items-center justify-center py-4 bg-blue-gray px-[30px] sm:px-5 font-bold rounded min-w-[176px] gap-2.5 ">
                     <span className="text-white text-xl">Shop Now</span><img src='src/assets/right-arrow.png' alt='Frame' className="h-[24px]  w-[24px] object-contain"/>
                </button>
                </Link>
               </div>
             </div>
             </div>
           </div>
        </div>
        </>
    )
}