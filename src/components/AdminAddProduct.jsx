import Button from '@mui/material/Button';
import {userRequest} from '../requestMethods'
import { useState } from 'react';
import './adminaddproduct.css';
import Toast from './Toast'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";


import app from '../firebase.js'

const AdminAddProduct = () => {
     const [disable,setDisable]=useState(false);
    const [get,set]=useState(0);
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
    const [file, setFile] = useState(null);
    const [getError,setError]=useState(0);


    const addProductRequest=async (data)=>{
      try{
        await userRequest.post('/products',data);
        set(1);
        
       
      }catch(err){
        setError(2)
        console.log(err);
      }
      setDisable(false);

      setTimeout(()=>set(0),1000);

    }
   
    const Error=()=>{
      let msg='Something went wrong';
      if(getError === 1){
        msg='* All Fields are Mandatory'
      }

      return <div style={{color:'red'}}>{msg}</div>
    }
    const handleSubmit=()=>{
        
      if(product.title === '' || product.desc ==='' || product.color ==='' || product.price ===0 || product.size === '' ||file ===null || getCategory.length === 0 ){
        setError(1);

        return ;
      }
      setDisable(true);

        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              setDisable(false);
              setError(2);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const data = { ...product, img: downloadURL, categories: getCategory };
                setError(0)
                addProductRequest(data);
              });

            }
          );
    }


    return (
        <div className="admin-add-product">
            <div className="add-product-container">
                <div className="add-product-item">
                    <label htmlFor="upload">Upload</label>
                    <input type="file" name="upload" accept="image/*" id="upload" onChange={e=>setFile(e.target.files[0])} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' id='title' placeholder='Enter Title' onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="color">Color</label>
                    <input type="text" name='color' id='color' placeholder='Enter Color' onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="size">Size</label>
                    <input type="text" name='size' id='size' placeholder='Enter size in commas(,)' onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="price">Price</label>
                    <input type="number" name='price' id='price' placeholder='Enter Price' onChange={handleInput} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="categories">Categories</label>
                    <input type="text" placeholder='Enter categories in commas(,)' onChange={handleCategory} />
                </div>
                <div className="add-product-item">
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc"  id="desc" cols="30" rows="10" placeholder='Enter Description' onChange={handleInput} />
                </div>
                {
                  getError!==0  && <Error/>
                }
                <div className="add-product-item">
                  <Button disabled={disable} onClick={handleSubmit} variant="contained">Contained</Button>
                </div>
                
                
            </div>
            {
              get===1 && <Toast msg='Product is Added'/>
            }
        </div>
    )
}


export default AdminAddProduct;