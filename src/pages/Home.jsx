import React from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Category from '../components/Category';
import HeroSlider from '../components/HeroSlider';
import Product from '../components/Product';
import Footer from '../components/Footer';
import './home.css'
const Home=()=>{
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