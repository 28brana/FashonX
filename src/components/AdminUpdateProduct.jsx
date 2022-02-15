import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom"
import { userRequest } from "../requestMethods";
import Button from '@mui/material/Button';

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


const AdminUpdateProduct=()=>{

    // New Product 
    const [product,setProduct]=useState({
        title:'',
        desc:'',
        size:'',
        color:'',
        price:0
    })
    const [getCategory,setCategory]=useState([]);
    const handleCategory=(e)=>{
        setCategory(e.target.value.split(','));
    }
    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setProduct({
            ...product,
            [name]:value
        })
    }
    const [getError,setError]=useState(0);

// --------------------------------------

    // Getting Id from Url and find Product Detail using id
    const [getProductDetail,setProductDetail]=useState(
        {
            title:'',
        desc:'',
        size:'',
        color:'',
        price:0,
        categories:[]
        }
    );
    const location=useLocation();
    const id=location.pathname.split('/')[3];
    useEffect(()=>{
        const getProduct= async ()=>{
            try{
                const res=await userRequest.get(`/products/find/${id}`);
                console.log(res)
                setProductDetail(res.data)
                setProduct({
                    title:res.data.title,
                    desc:res.data.desc,
                    size:res.data.size,
                    color:res.data.color,
                    price:res.data.price
                })
                setCategory(res.data.categories)
            }catch(err){
                console.log(err);
                setError(2)
            }
        }
        getProduct();

    },[id])

    // console.log(getProductDetail)
// Error Handling
    const Error=()=>{
        let msg='Something went wrong';
        if(getError === 1){
          msg='* All Fields are Mandatory'
        }
  
        return <div style={{color:'red'}}>{msg}</div>
      }

    const handleSubmit=()=>{
        if(product.title === '' || product.desc ==='' || product.color ==='' || !product.price  || product.size === ''  || getCategory.length === 0 ){
            setError(1);
    
            return ;
        }
        const data = { ...product, categories: getCategory };
        // console.log(data)
        const updateRequest= async()=>{
            try{
                const res=await userRequest.put(`/products/${id}`,data);
                console.log(res);
                setError(0);
            }catch(err){
                console.log(err);
                setError(2);
            }
        }
        updateRequest();
    }

    
    return (
        <div className="admin-update-product" style={{display:'flex',justifyContent:'center'}} >
           <div className="add-product-container" style={{width:'80%'}} >
               <div className="update-product-item" style={{display:'flex'}} >
                   <img src={getProductDetail.img} alt="img" style={{width:"200px",objectFit:'contain'}}/>
                   <div style={{display:'flex',flexDirection:'column',padding:'1em',justifyContent:'space-between'}} >
                       <p>{getProductDetail.title}</p>
                        <ColorBox color={getProductDetail.color}/>
                       <p>{getProductDetail.size}</p>
                       <p>{getProductDetail.categories}</p>
                       <p>Rs {getProductDetail.price}</p>
                   </div>
                </div>
                <div className="add-product-item">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' id='title' value={product.title}  onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="color">Color</label>
                    <input type="text" name='color' id='color' value={product.color} onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="size">Size</label>
                    <input type="text" name='size' id='size' value={product.size} onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="price">Price</label>
                    <input type="number" name='price' id='price' value={product.price} onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="categories">Categories</label>
                    <input type="text" value={getCategory.join(',')} onChange={handleCategory} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc"  id="desc" cols="30" rows="10" value={product.desc} onChange={handleInput} />
                </div>
                {
                  getError!==0  && <Error/>
                }
                <div className="add-product-item">
                  <Button onClick={handleSubmit} variant="contained">Contained</Button>
                </div>
                
                
            </div>
        </div>
    )
}

export default AdminUpdateProduct