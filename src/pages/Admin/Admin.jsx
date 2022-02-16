import AdminAddProduct from "../../components/AdminAddProduct";
import AdminNav from "../../components/AdminNav";
import AdminProductList from "../../components/AdminProductList";
import AdminSideBar from "../../components/AdminSideBar";
import AdminTransaction from "../../components/AdminTransaction";
import AdminUserList from "../../components/AdminUserList";
import AdminUpdateProduct from "../../components/AdminUpdateProduct";
import AdminHome from "../../components/AdminHome";
import { Route, Routes } from 'react-router-dom';
import './admin.css';

const Admin=()=>{
    return (
        <div className="admin-page">
            <AdminSideBar/>
            <div className="admin-container">
            <AdminNav/>

                <Routes>
                    <Route path="/products" element={<AdminProductList/>}/>
                    <Route path="/addproduct" element={<AdminAddProduct/>} />
                    <Route path="/updateproduct/:id" element={<AdminUpdateProduct/>} />
                    <Route path="/users" element={<AdminUserList/>}/>
                    <Route path="/transactions" element={<AdminTransaction/>}/>
                    <Route path="/" element={<AdminHome/>}/>
                    
                </Routes>
               
            </div>
        </div>
    )
}

export default Admin;