import React, { Suspense, lazy,useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Loader from './Loader'
import './home.css'
const  Footer =lazy(() => import('../components/Footer'));
const HeroSlider = lazy(() =>import ('../components/HeroSlider'));
const Product = lazy(() =>import('../components/Product'));
const Category = lazy(() =>import ('../components/Category'));

const Home=()=>{
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        setTimeout(setLoading(false),3000);
    },[])
    if(loading){
        return <Loader/>
    }
    return (
        <>
        <Announcement/>
        <Navbar/>
      
        <Suspense fallback={<Loader/>}>
            <HeroSlider/>
        </Suspense>
        <Suspense fallback={<Loader/>}>
            <Category/>
            <Product/> 
            <Footer/>
        </Suspense>
        </>
    )
}

export default Home;