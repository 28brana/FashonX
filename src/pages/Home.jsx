import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Category from '../components/Category';
import HeroSlider from '../components/HeroSlider';
import Product from '../components/Product';
import Footer from '../components/Footer';
import Loader from './Loader'
import './home.css'
const Home=()=>{
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      setLoading(false);
    },[])
    if(loading){
        return <Loader/>
    }
    return (
        <>
        <Announcement/>
        <Navbar/>
        <HeroSlider/>
        <Category/>
        <Product/>
        <Footer/>
        </>
    )
}

export default Home;