// import React from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useSelector } from 'react-redux';

const Navbar=()=>{
    const {quantity}=useSelector(state=>state.cart);
    const user=useSelector(state=>state.user);
    return (
        <div className="navbar-container">
            <ul className="navbar">
                <li className="navbar-left"> 
                    <div className="language">EN</div>
                    <div  className="navbar-search">
                        <input type="search" name="" id="" placeholder="search" />
                        <SearchIcon/>
                    </div>
                </li>
                <li className="logo">Fashon.</li>
                <li className="navbar-right">
                    
                    {
                        user.currentUser && user.currentUser.isAdmin && <Link to="/admin"><div>Go To Admin</div></Link>
                    }
                    <Link to="/register">

                        <div>Register</div> 
                    </Link>
                    {
                        user.currentUser ?   <Link to="/login">
                        <div>Log Out</div>
                        </Link> :
                        <Link to="/login">
                        <div>Sign in</div>
                        </Link>
                    }
                  
                    <Link to='/cart'>
                        <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlinedIcon/>
                        </Badge>
                    </Link>
                </li>
               
            </ul>
        </div>
    )
}

export default Navbar