import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './heroslider.css';
import pic3 from './demo/pic10.png';
import pic2 from './demo/pic9.png';
import pic1 from './demo/pic8.png';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from "react-router-dom";
const SliderBox=(props)=>{
    return(
        <div className="sliderBox">
            <img  className="sliderBox-img" key={props.key} src={props.src} alt='slider-img' />
         
           
            <div className="sliderBox-right">
                <div className="sliderBox-content">

                    <h1>{props.title}</h1>
                    <p>DONT COMPROMISE ON STYLE GET FLAT 30% OFF FOR NEW ARRIVALS</p>
                    <Link to="/products">
                     <Button variant="outlined">Shop now <ArrowRightIcon/> </Button>
                    </Link>


                </div>
            </div>
        </div>
    )
}



const HeroSlider=()=>{
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
     
      };
    return (
        <div className="slider-container">
            <Slider {...settings}>
               <SliderBox key={1} src={pic1} title="WINTER SALE" />
               <SliderBox key={2} src={pic2} title="WOMENS COLLECTION" />
               <SliderBox key={3} src={pic3} title="WESTERN COLLECTION" />
              
            </Slider>
        </div>
    )
}

export default HeroSlider;