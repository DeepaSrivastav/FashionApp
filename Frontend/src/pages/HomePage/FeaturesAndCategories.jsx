
const benefitsList = [
    {headingText:'Free Shipping', descriptionText:'Free Shipping for orders above Rs 200'},
    {headingText:'Flexible Payment', descriptionText:'Multiple secure payment options'},
    { headingText:'24*7 Support', descriptionText:'We Support Online all days'},
];

const categoryList = [
    { userImage:'src/assets/women-section.jpg', userTitle:'WOMEN'},
    { userImage:'src/assets/male-section.webp', userTitle:'MEN'},
    { userImage:'src/assets/kids-section.jpg', userTitle:'KIDS'},
    
]

export default function FeaturesAndCategories(){
    return (
        <>
        <div className="flex flex-col items-center self-stretch">
         <div className="flex flex-row gap-[90px] px-5"> 
           {
            benefitsList.map((item,index)=>(
                <div key={index} className="flex w-full flex-row  items-center justify-center gap-[20px]">
                   <img src='src/assets/box-image.png' alt='Free Shipping icon' className="h-[54px] w-[16%] object-contain"/>
                   <div className="flex flex-col items-center">
                     <p className="text-[22px] font-semibold text-blue-gray">{item.headingText}</p>
                     <p className="text-[16px] font-medium text-gray-600">{item.descriptionText}</p>
                    </div>
                </div>
            
            ))
        }
         </div>
         <div className="flex flex-row gap-[90px] px-5 my-20"> 
         {
            categoryList.map((item,index)=>(
                <div className="h-[484px] w-[32%] md:w-full md:h-auto relative">
                
                   <img key={index} src={item.userImage} alt='categories image' className="h-[484px] w-full flex-1 rounded-md object-cover">
                   </img>
                   <h3 className="text-4xl absolute bottom-[9%] left-0 right-0 mx-auto w-max text-[30px] font-extrabold tracking-[15.00px] text-white">
                    {item.userTitle}
                   </h3>

                   
                </div>
            ))
        }
            
         </div>
        </div>
        </>
    )
}