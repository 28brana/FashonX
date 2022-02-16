import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {Link, useLocation} from 'react-router-dom'
import './adminsidebar.css';
const AdminSideBar=()=>{
   
    const Location=useLocation();
    const name=Location.pathname.split('/')[2];
    
    return (
    <div className="admin-sideBar">
        <h1>Admin Dashboard</h1>
        <ul className='admin-sideBar-link'>
            <li className={name ===''? 'admin-active':''} > <Link to='/admin/'>   <HomeOutlinedIcon  className='admin-icon'  />  <span className='admin-nav-hide'>  Home </span>  </Link> </li>
            <li className={name ==='users'? 'admin-active':''} > <Link to='/admin/users'>  <PersonOutlineOutlinedIcon className='admin-icon' /> <span className='admin-nav-hide'>  Users</span> </Link> </li>
            <li className={name ==='products'? 'admin-active':''}> <Link to='/admin/products'>   <ShoppingBagOutlinedIcon className='admin-icon' />  <span className='admin-nav-hide'> Products</span> </Link> </li>
            <li className={name ==='addproduct'? 'admin-active':''}> <Link to='/admin/addproduct'>  <Inventory2OutlinedIcon className='admin-icon' />  <span className='admin-nav-hide'> Add Product </span></Link> </li>
            <li className={name ==='transactions'? 'admin-active':''}> <Link to='/admin/transactions'>   <AttachMoneyOutlinedIcon className='admin-icon' />  <span className='admin-nav-hide'> Transactions </span></Link> </li>
        </ul>
    </div>
    )
}

export default AdminSideBar;