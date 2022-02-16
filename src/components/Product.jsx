
import ProductBox from './ProductBox';
import { useEffect, useState } from 'react';
import './product.css';
import { publicRequest} from '../requestMethods'
const Products=()=>{
    const [getData,setData]=useState([]);
    useEffect(()=>{
      const getProducts=async ()=>{
        try{
          const res=await publicRequest.get('/products/');
          // console.log(res);
          setData(res.data.slice(0,6));
        }catch(err){
          console.log(err)
        }
      }
      getProducts()
    },[])

    // console.log(getData)
  
    return (
      <div className="product">
        {getData.map((item)=>{
          return <ProductBox title={item.title} key={item._id} price={item.price} src={item.img} id={item._id} product={item}/>
        })}
      </div>
    )
  }
  
  

const Product =()=>{
    return (
        <div className="product">
            <Products/>
        </div>
    )
}


export default Product