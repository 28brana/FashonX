import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './productbox.css';
import { addProduct } from '../redux/reducers/cartReducer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Toast from './Toast'
const ProductBox = (props) => {
    const dispatch=useDispatch();
    const [get,set]=useState(0);
    const handleCart=()=>{
        dispatch(addProduct({...props.product,quantity:1,size:props.product.size.split(',')[0]}));
        set(1)
        setTimeout(()=>{
            set(0)
        },1000)
    }
    return (
        <div className="productBox">
            <img  loading="lazy" src={props.src} alt="Product Img" className="productBox-img" />
            <div className="productBox-title">{props.title}</div>
            <span className='productBox-price'>Rs.{props.price}</span>
            <div className="productBox-cart"><ShoppingCartOutlinedIcon onClick={handleCart}   className='product-icon' />
                <Link to={`/product/${props.id}`}>
                    <SearchIcon className='product-icon' />
                </Link>
            </div>
            {
                get===1 && <Toast msg="Added to Cart"/>
            }
        </div>
    )
}

export default ProductBox;