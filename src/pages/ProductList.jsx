import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProductBox from "../components/ProductBox";
import Footer from "../components/Footer";
import {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import './productlist.css';


const Products=(props)=>{
  const [getData,setData]=useState([]);
  const [filterProducts,setFilteredProducts]=useState([]);
  useEffect(()=>{
    const getProducts=async ()=>{
      try{
        const res=props.cat ? await publicRequest.get(`/products?category=${props.cat}`): await publicRequest.get('/products/');
        setData(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getProducts()
  },[props.cat])

  useEffect(()=>{
    setFilteredProducts
      (getData.filter((item )=>{
          return Object.entries(props.filter).every(([key,value])=>{
            // console.log(key,value," ",item[key],"=",item[key].includes(value));
            return item[key].includes(value);
          })
        
      })
    )
  },[getData,props.cat,props.filter])


  useEffect(()=>{
    if(props.sort ==="Newest"){
     
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>{
          return a.createdAt-b.createdAt;
        }))
    }
    else if((props.sort)==="Asc"){
     
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>{
          return a.price-b.price;      
        }))
    }else{
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>{
          return b.price-a.price;  
        }))
    }
    
  },[props.sort])



  return (
    <div className="product">
      {filterProducts.map((item)=>{
        return <ProductBox title={item.title} key={item._id} price={item.price} src={item.img} id={item._id}
        product={item}
        />
      })}
    </div>
  )
}



const ProductList=()=>{
  const Location=useLocation();
  const cat=Location.pathname.split('/')[2];
 
  const [getState,setState]=useState({
    color:"",
    size:"",
    sort:""
  });

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setState({
      ...getState,
      [name]:value
    })

  }

  const handleClear=()=>{
    setState({
      color:"",
      size:"",
      sort:""
    })
  }

  // console.log(getState)
    return (
        <div className="productlist">
        <Navbar/>
        <Announcement/>
        <div className="productlist-container">
            <h1 style={{padding:'1em'}} >{cat} clothes 🛍️</h1>
            
            <div className="product-operations-container">
                <div className="filter">
                    <span>Filter Products: </span>
                   
                    <FormControl fullWidth className="select-box" >
                        <InputLabel id="color">color</InputLabel>
                        <Select name="color" labelId="color" value={getState.color} label="color" onChange={handleChange}>
                          <MenuItem value={"red"}>Red</MenuItem>
                          <MenuItem value={"black"}>Black</MenuItem>
                          <MenuItem value={"yellow"}>Yellow</MenuItem>
                          <MenuItem value={"green"}>Green</MenuItem>
                          <MenuItem value={"orange"}>Orange</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <FormControl fullWidth className="select-box">
                        <InputLabel id="size">size</InputLabel>
                          <Select name="size" labelId="size" value={getState.size} label="size" onChange={handleChange}>
                            <MenuItem value={"XS"}>XS</MenuItem>
                            <MenuItem value={"S"}>S</MenuItem>
                            <MenuItem value={"M"}>M</MenuItem>
                            <MenuItem value={"L"}>L</MenuItem>
                            <MenuItem value={"XL"}>XL</MenuItem>
                            <MenuItem value={"XXL"}>XXL</MenuItem>
                        </Select>
                    </FormControl>
                <div id="clear-filter" onClick={handleClear}>CLEAR ALL</div>
                </div>
                <div className="sort">
                    <span>Sort Products</span>
                    <FormControl fullWidth className="select-box">
                        <InputLabel id="sort">sort</InputLabel>
                          <Select name="sort" labelId="sort" value={getState.sort} label="sort" onChange={handleChange}>
                            <MenuItem value={"Newest"}>Newest</MenuItem>
                            <MenuItem value={"Asc"}>Price(asc)</MenuItem>
                            <MenuItem value={"Desc"}>Price(desc)</MenuItem>
                            
                        </Select>
                    </FormControl>
                </div>
            </div>
           
            <Products cat={cat} filter={{color:getState.color,size:getState.size}} sort={getState.sort}/>
        </div>
        <Footer/>


        </div>
    )
}

export default ProductList;


