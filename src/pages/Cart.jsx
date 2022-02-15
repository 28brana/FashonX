import NavBar from '../components/Navbar'
import  Announcement  from '../components/Announcement';
import StripeCheckOut from 'react-stripe-checkout'
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';
import './cart.css';

const Key=process.env.REACT_APP_STRIPE_KEY ;

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
const CartBox=(props)=>{
    props=props.data
    // console.log(props)
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
                        <span>-</span>
                        <div>{props.quantity}</div>
                        <span>+</span>
                    </div>
                    <div>Rs {props.price * props.quantity}</div>
            </div>
        </div>
    )
}

const Cart=()=>{
    const cart=useSelector(state=>state.cart);
    const productList=cart.products.map((item)=>{
        return {
            "productId":item._id,
            "quantity":item.quantity
        }
    })

    console.log(productList)
    const onToken=(token)=>{

        console.log(token.card.address_line1)
        const productList=cart.products.map((item)=>{
            return {
                "productId":item._id,
                "quantity":item.quantity
            }
        })
        const data={
            "userId":"61fcad96024f28c825886273",
            "products":productList,
            "amount":cart.total,
            "address":token.card.address_line1
        }
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
                <h1>Your Bag</h1>
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
                            amount={cart.total}
                            token={onToken}
                            stripeKey={Key}
                          
                        >
                        <button className='order-btn' >CHECKOUT NOW</button>
                        </StripeCheckOut>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart