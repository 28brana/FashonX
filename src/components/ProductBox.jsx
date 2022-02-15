import {Link} from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './productbox.css';
const ProductBox=(props)=>{
    // console.log(props);
    return(
        <div className="productBox">
            <img src={props.src} alt="Product Img" className="productBox-img" />
            <div className="productBox-title">{props.title}</div>
            <span className='productBox-price'>Rs.{props.price}</span>
            <div className="productBox-cart"><ShoppingCartOutlinedIcon className='product-icon' />
            <Link to={`/product/${props.id}`}>
            <SearchIcon className='product-icon' /> 
            </Link>
            </div>
        </div>
    )
}

export default ProductBox;