import AdminAddProduct from "../../components/AdminAddProduct";
import AdminNav from "../../components/AdminNav";
import AdminProductList from "../../components/AdminProductList";
import AdminSideBar from "../../components/AdminSideBar";
import AdminTransaction from "../../components/AdminTransaction";
import AdminUserList from "../../components/AdminUserList";
import './admin.css';
import { Route, Routes,Link } from 'react-router-dom';
import AdminUpdateProduct from "../../components/AdminUpdateProduct";

const Admin=()=>{
    return (
        <div className="admin-page">
            <AdminSideBar/>
            <div className="admin-container">
            <AdminNav/>
                {/* <AdminNav/>
                <AdminProductList/>
                <AdminUserList/>
                <AdminTransaction/>
                <AdminAddProduct/> */}

                <Routes>
                    <Route path="/products" element={<AdminProductList/>}/>
                    <Route path="/addproduct" element={<AdminAddProduct/>} />
                    <Route path="/updateproduct/:id" element={<AdminUpdateProduct/>} />
                    <Route path="/users" element={<AdminUserList/>}/>
                    
                </Routes>
               
            </div>
        </div>
    )
}

export default Admin;