import ProductList from './pages/ProductList';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toast from './components/Toast';

import { useState ,useEffect} from 'react';


function App() {
  const user = useSelector(state => state.user);
  const [get,set]=useState(0);
  useEffect(()=>{
    if(user.currentUser && user.currentUser.isAdmin){
      set(1);
    }
    setTimeout(()=>set(0),1000)
  },[user.currentUser])
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {
          user.currentUser && user.currentUser.isAdmin && <Route path='/admin/*' element={<Admin />} />
        }

        <Route path='*' element={<ErrorPage />} />

      </Routes>
      

        {
         
          get===1 &&<Toast  msg='Admin Mode' color='info'/>
        }
    </>
  );
}





export default App;
