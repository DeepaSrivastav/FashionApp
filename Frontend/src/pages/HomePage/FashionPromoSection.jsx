
export default function FashionPromoSection({
    discountText = "Flat 20% Discount",
    headlineText = "Explore the latest in Men's Fashion",
    subheadlineText = "Step into Style Unveiling the Newest Trends",
    backgroundImage = "src/assets/promosectionman.png",
    ...props
}){
  return(
    <div className="flex sm:flex-row items-center w-[50%] md:w-full px-5 bg-blue-gray rounded-md">
      <div className="relative z-[1] flex flex-1 flex-col items-start justify-center gap-4 sm:gap-4 sm:self-stretch">
        <p className="text-[18px] font-medium text-white sm:text-[15px]">
          {discountText}
        </p>
        <h3 className="text-[30px] font-bold leading-[47px] text-white sm:text-[25px">
            {headlineText}
        </h3>
        <p className="w-full text-[18px] font-medium leading-7 text-white sm:w-full sm:text-[15px]">
            {subheadlineText}
        </p>
        <a href="/productlist">
        <button className="flex items-center justify-center py-2 bg-blue-500 px-[30px] sm:px-5 font-bold rounded min-w-[176px] gap-2.5 ">
                     <span className="text-white text-xl">Shop Now</span><img src='src/assets/right-arrow.png' alt='Frame' className="h-[24px]  w-[24px] object-contain"/>
                </button></a>
      </div>
      <img src={backgroundImage} alt=" Portrait Image" className="relative ml-[-54px] w-[50%] object-contain"/>
      </div>
)
}