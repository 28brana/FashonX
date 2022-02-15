
import ProductBox from './ProductBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './product.css';
const Products=()=>{
    const [getData,setData]=useState([]);
    useEffect(()=>{
      const getProducts=async ()=>{
        try{
          const res=await axios.get('http://localhost:5000/api/products/');
          // console.log(res);
          setData(res.data);
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
          return <ProductBox title={item.title} key={item._id} price={item.price} src={item.img} id={item._id}/>
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