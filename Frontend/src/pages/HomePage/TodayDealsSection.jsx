
const denimAndShirtProductList = [
{
    productImage:"src/assets/womendenimjacket.webp",
    productName:"Womens Denim Jacket",
    brandName:"ZARA",
    rating:"4.4",
    currentPrice:"Rs. 700",
    originalPrice:"Rs.1000",
    discountOffer:"(30% off)"
},
{
    productImage:"src/assets/vnecktee.webp",
    productName:"Stylish V-Neck Shirt",
    brandName:"ZARA",
    rating:"4.4",
    currentPrice:"Rs. 700",
    originalPrice:"Rs.1000",
    discountOffer:"(30% off)"
},
{
    productImage:"src/assets/womencoat.webp",
    productName:"Bold Statement Tee",
    brandName:"ZARA",
    rating:"4.4",
    currentPrice:"Rs. 700",
    originalPrice:"Rs.1000",
    discountOffer:"(30% off)"
},

]
export default function TodayDealsSection(){

    return(
        <>
          <div className="flex flex-row w-full justify-center items-center self-stretch">
             <div className="flex w-full flex-col justify-center items-center gap-[46px] md:px-5 self-stretch">
               <div className="flex w-full flex-col items-center justify-center gap-3.5 self-stretch">
                  <h2 className="text-[18px] font-semibold text-gray-800">
                    Today's deals
                  </h2>
                  <h3 className="text-[30px] font-semibold md:text-[28px] sm:text-[26px]">
                     Deals of the Day
                  </h3>
               </div>
               <div className="flex w-full flex-row items-center justify-center gap-12 rounded-md self-stretch ">
                  {
                    denimAndShirtProductList.map((item,index)=>(
                      <>
                      <div className="w-[368px]">
                      <img src={item.productImage} alt='Product Image' className="h-[350px] w-full rounded-tl-md rounded-tr-md object-cover"/>
                      <div className="mx-4 mb-3.5 flex flex-col items-start gap-1.5 self-stretch">
                        <p className="text-[18px] font-medium">
                          {item.productName}
                        </p>
                        <div className="flex-self-stretch">
                         <p className="text-[16px] font-medium text-gray-600">
                          {item.brandName}
                         </p>
                         <div className="flex flex-1 items-center px-2">
                           <p className="text-[16px] font-normal text-gray-600">
                            {item.rating}
                           </p>
                           <img src="src/assets/yellow star.webp" alt="Rating signal" className="h-[16px] objkect-cover"/>
                         </div>
                        </div>
                        <div className="flex flex-wrap items-center self-stretch">
                          <h4 className="text-[24px] font-bold">
                            {item.currentPrice}
                          </h4>
                          <p className="ml-[3.5] text-[18px] font-normal text-gray-600 line-through ">
                            {item.originalPrice}
                          </p>
                          <h6 className="ml-3.5 self-end text-[18px] font-bold text-green-900">
                             {item.discountOffer}
                          </h6>
                        </div>
                      </div>
                      </div>
                      </>
                    ))
                  }
               </div>
             </div>
          </div>
        </>
    )
}