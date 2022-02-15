import pic1 from './demo/pic4.jpg'
import pic2 from './demo/pic5.jpg'
import pic3 from './demo/pic6.jpg'
import './category.css'
import { Link } from 'react-router-dom';

const data=[
    { 
        id:1,
        src:pic1,
        title:"Women"
    },
    { 
        id:2,
        src:pic2,
        title:"Men"
    },
    { 
        id:3,
        src:pic3,
        title:"Summer"
    },
    
]


const CategoryBox=(props)=>{
    return(
        <Link style={{textDecoration:'none'}} to={`products/${props.title}`}>
            <div className="categoryBox">
                <img src={props.src} alt="Category Pic" className="categoryBox-img" />
                <div className="categoryBox-content">
                    <h1>{props.title}</h1>
                    <button>SHOP NOW</button>
                </div>
            </div>
        </Link>
       
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