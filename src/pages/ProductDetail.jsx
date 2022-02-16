import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import {useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/reducers/cartReducer';
import './productdetail.css';

const ColorBox=({color})=>{
    const colorStyle={
        width:'20px',
        height:'20px',
        backgroundColor:color,
        borderRadius:'50%',
        display:'inline-block'
    }
    return (
        <div style={colorStyle}></div>
    )
}

const ProductDetail=()=>{
    const Location=useLocation();
    const id=Location.pathname.split('/')[2];
    const [product,setProduct]=useState({});
    const [size,setSize]=useState("");
    const [quantity,setQuantity]=useState(1);
    const dispatch=useDispatch();
    const handleSize=(e)=>{
        setSize(e.target.value);
    }
    useEffect(()=>{
        const getProduct=async()=>{
            try{
                const res=await publicRequest.get("/products/find/"+id);
                setProduct(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getProduct();
    },[id]);

    const handleAddCart=()=>{
        dispatch(addProduct({...product,quantity,size}));
    }
    
    return (
        <>
        <Navbar/>
        <Announcement/>
        <div className="product-detail-container">
            <div className="product-detail-left">
                <img src={product.img} alt="Pic " />
            </div>
            <div className="product-detail-right">
                <h2>{product.title}</h2>
                <pre style={{whiteSpace:'break-spaces'}}>{product.desc}</pre>
                <span>Rs {product.price}</span>
                <div className="product-detail-options">
                    <div className="product-detail-color">
                        Color 
                        <ColorBox color={product.color}/>
                        
                    </div>
                    <div className='product-detail-size'>
                    <FormControl fullWidth className="select-box">
                        <InputLabel id="product-size">Size</InputLabel>
                        <Select labelId="product-size" label="size" value={size} onChange={handleSize} >
                           {
                            product.size ? product.size.split(',').map((s)=>{
                                return <MenuItem value={s} key={s}>{s}</MenuItem>

                            }):<MenuItem value={""}>""</MenuItem>
                           }
                        </Select>
                    </FormControl>
                    </div>
                </div>
                <div className="product-detail-options">
                    <div className='product-count'>
                        <span onClick={()=>{setQuantity(quantity===1?1:quantity-1)}}>-</span>
                        <div>{quantity}</div>
                        <span onClick={()=>setQuantity(quantity+1)}>+</span>
                    </div>
                    <Button onClick={handleAddCart} variant="outlined">Add To Cart</Button>

                </div>
            </div>
        
        </div>
        </>
    )
}

export default ProductDetail;