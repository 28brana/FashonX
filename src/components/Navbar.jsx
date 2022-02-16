// import React from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { logout } from '../redux/reducers/userReducer';
const data=[
    'mens',
    'womens',
    'kids',
    'dress',
    'summers',
    'winters',
    'cultural',
    'girls',
    'party',
    'lehenga'

]
const Navbar=()=>{
    const {quantity}=useSelector(state=>state.cart);
    const user=useSelector(state=>state.user);
    const dispatch=useDispatch();
    
    const [cat,setCat]=useState('');
    const logOut=()=>{
        dispatch(logout());
    }

    return (
        <div className="navbar-container">
            <ul className="navbar">
                <li className="navbar-left"> 
                    <div className="language">EN</div>
                    <div  className="navbar-search">
                        <Autocomplete
                       style={{transform:'scale(0.8)'}}
                            disablePortal
                            onChange={(e,value)=>{(value===null)?setCat(''):setCat(value)}}
                            id="combo-box-demo"
                            options={data}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField  {...params} label="Search categories" />}
                            />
                        <Link to={'/products/'+cat}>
                            <SearchIcon/> 
                        </Link>
                    </div>
                </li>
                <li className="logo">FashonX</li>
                <li className="navbar-right">
                    
                    {
                        user.currentUser && user.currentUser.isAdmin && <Link to="/admin"><div>Go To Admin</div></Link>
                    }
                    <Link to="/register">

                        <div>Register</div> 
                    </Link>
                    {
                        user.currentUser ?  
                        
                        <div style={{cursor:'pointer'}} onClick={logOut}>Log Out</div>
                         :
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