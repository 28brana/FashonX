import NavBar from '../components/Navbar'
import  Announcement  from '../components/Announcement';
import StripeCheckOut from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';
import './cart.css';
import { counterProduct, removeItem } from '../redux/reducers/cartReducer';
import { useState } from 'react';

const Key=process.env.REACT_APP_STRIPE_KEY ;

const ColorBox=({color})=>{
    const colorStyle={
        width:'20px',
        height:'20px',
        backgroundColor:color,
        borderRadius:'50%',
        display:'inline-block',
        boxShadow:'#000000a6 0px 0px 3px 1px'
    }
    return (
        <div style={colorStyle}></div>
    )
}
const CartBox=(props)=>{
    props=props.data
    const dispatch=useDispatch();

   

    const [count,setCount]=useState(props.quantity);

    const handleCount=(type)=>{
        if(type==='ADD'){
            setCount(count+1);
            dispatch(counterProduct({...props,type}));
        }else if(count>1){
            setCount(count-1);
            dispatch(counterProduct({...props,type}));
        }

    }
    const handleRemove=()=>{
        console.log("REmoved");
        dispatch(removeItem({id:props._id}));
    }
    return (
        <div className="cartBox">
            <div className="cartBox-img">
                <img src={props.img} alt="pic" />
            </div>        
            <div className="cartBox-center">
                <div><span>Product :</span>{props.title}</div>
                <div><span>Id :</span>{props._id}</div>
                <div><ColorBox color={props.color}/></div>
                <div><span>Size :</span>{props.size}</div>
            </div>    
            <div className="cartBox-right">
                    <div className='cart-product-count'>
                        <span onClick={()=>handleCount('SUB')} >-</span>
                        <div>{count}</div>
                        <span onClick={()=>handleCount('ADD')}>+</span>
                    </div>
                    <div>Rs {props.price * props.quantity}</div>
                    <button onClick={handleRemove} className='remove-cart'>Remove</button>
            </div>
        </div>
    )
}

const Cart=()=>{
    const cart=useSelector(state=>state.cart);
    const user=useSelector(state=>state.user);
    
    console.log(user);
    cart.products.map((item)=>{
        return {
            "productId":item._id,
            "quantity":item.quantity
        }
    })

    const onToken=(token)=>{
        const productList=cart.products.map((item)=>{
            return {
                "productId":item._id,
                "quantity":item.quantity
            }
        })
        const data={
            "userId":user.currentUser._id,
            "products":productList,
            "amount":cart.total,
            "address":token.card.address_line1
        }
        console.log(data)
        const makeOrder=async()=>{
            const res= await userRequest.post('/orders/',data) 
            console.log(res)
        }
        makeOrder();
    }

    
    return (
        <>
            <NavBar/>
            <Announcement/>
            <div className="cart-container">
                <h1 style={{padding:'1em'}}>Your Bag 🛒 </h1>
                <div className="cart-list-container">
                    <div className="cart-list">
                       {cart.products.map((item)=>{
                           return <CartBox key={item._id} data={item}/>
                       })}
                    </div>
                    <div className="cart-summery">
                        <h1>ORDER SUMMARY</h1>
                        <div className="cart-sub-summery">
                            <span>SubTotal</span>
                            <span>Rs {cart.total}</span>
                        </div>
                        <div className="cart-sub-summery">
                            <span>Shipping Price</span>
                            <span>Rs 20</span>
                        </div>
                        <div className="cart-sub-summery">
                            <span>Discount</span>
                            <span>Rs -20</span>
                        </div>
                        <div className="cart-sub-summery" style={{fontWeight:'bold',fontSize:'1.2em'}}>
                            <span>Total</span>
                            <span>$ {cart.total}</span>
                        </div>
                        <StripeCheckOut 
                            name='Fashon'
                            billingAddress
                            shippingAddress={true}
                            description={`Your Total is ${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={Key}
                          
                          
                        >
                        <button disabled={!user.currentUser} className='order-btn' >CHECKOUT NOW</button>
                        </StripeCheckOut>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart