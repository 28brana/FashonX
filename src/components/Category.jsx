import pic1 from './demo/pic1.jpg'
import pic2 from './demo/pic2.jpg'
import pic3 from './demo/pic3.jpg'
import './category.css'
import { Link } from 'react-router-dom';

const data=[
    { 
        id:1,
        src:pic1,
        title:"cultural"
    },
    { 
        id:2,
        src:pic2,
        title:"mens"
    },
    { 
        id:3,
        src:pic3,
        title:"kids"
    },
    
]


const CategoryBox=(props)=>{
    return(
        
        <div className="categoryBox">
            <img src={props.src}  loading="lazy" alt="Category Pic" className="categoryBox-img" />
            <div className="categoryBox-content">
                <h1>{props.title}</h1>
                <Link to={`/products/${props.title}`}>

                    <button>SHOP NOW</button>
                </Link>
            </div>
        </div>
        
       
    )
}

const Category= ()=>{
    return (
        <div className='category'>
            {data.map((content)=>{
                return  <CategoryBox key={content.id} src={content.src} title={content.title}/>
            })}
           
        </div>
    )
}

export default Category