import { Helmet } from 'react-helmet'
import Header from "../../components/Header/header";
import HeroSection from './HeroSection';
import FeaturesAndCategories from './FeaturesAndCategories';
import LimitedTimeOfferSection from './LimitedTimeOfferSection';
import FashionPromoSection from './FashionPromoSection';
import TodayDealsSection from './TodayDealsSection';
import Footer from '../../components/Footer';


export default function Homepage(){
    return (
        <>
          <Helmet>
            <title>Home - Shop the Latest Fashion Deals</title>
            <meta
             name='description'
             content="Discover your ultimate style destination with a 25% discount on your first order.
              Shop the latest in men's, women's and kid's fashion with exclusive summer sale offers"
            />
          </Helmet>
          <div className="flex w-full flex-col items-center gap-[88px] bg-white md:gap-[66px] sm:gap-11">
            <div className="w-full bg-gray-200">
              <Header/>
              <HeroSection/>
            </div>

            <FeaturesAndCategories/>

            <LimitedTimeOfferSection/>
            <div className='container-xs md:px-5'>
              <div className='flex gap-12 md:flex-row'>
                <FashionPromoSection/>
                <FashionPromoSection
                  discountText = "Flat 25% Discount"
                  headlineText={
                    <>
                    Discover the latest <br/>
                    in Women's Fashion
                    </>
                  }
                  subheadlineText='Elevate Your Wardrobe with Trendsetting Styles'
                  backgroundImage='src/assets/promosectionwomen.png'
                />
              </div>
            </div>

            <TodayDealsSection/>
            <Footer/>
          </div>
        </>
    )
}