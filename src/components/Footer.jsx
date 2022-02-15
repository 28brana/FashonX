import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const Footer=()=>{
    return (
        <footer>
        <div className="footer-left">
            <h1>Fashon.</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid et porro quisquam amet soluta velit, ratione dolores commodi magni temporibus cumque aliquam nihil possimus dignissimos obcaecati repudiandae voluptates alias. Dolore, commodi! Omnis, nemo quae ea iure, libero </p>
            <div>
                <FacebookIcon color="primary"  className='footer-icon'/>
                <InstagramIcon color="secondary" className='footer-icon'/>
                <TwitterIcon color="primary" className='footer-icon'/>
            </div>
        </div>
        <div className="footer-center">
            <h1>Useful link</h1>
            <div className='footer-links'>
               <div>
                <a href="/">Home</a>
                <a href='/cart'>Cart</a>
                <a href='/product'>Product</a>
                <a href='/term'>Term</a>
                <a href="/login">login</a>
               </div>
               <div>
                <a href="/">Home</a>
                <a href='/cart'>Cart</a>
                <a href='/product'>Product</a>
                <a href='/term'>Term</a>
                <a href="/login">login</a>
               </div>
              
            </div>
        </div>
        <div className="footer-right">
        <h1>Contact</h1>
        <p> <LocationOnIcon/> 662 street , Amritsar</p>
        <p> <CallIcon/> +91 121221 </p>
        <p> <MailOutlineIcon/> 28brana@gmail.com </p>
        </div>
        </footer>
    )
}

export default Footer;