import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {Link} from 'react-router-dom'
import './adminsidebar.css';
const AdminSideBar=()=>{
    return (
    <div className="admin-sideBar">
        <h1>Admin Dashboard</h1>
        <ul className='admin-sideBar-link'>
            <li >  <Link to='/admin/'>   <HomeOutlinedIcon  className='admin-icon'  /> Home  </Link> </li>
            <li >  <Link to='/admin/users'>  <PersonOutlineOutlinedIcon className='admin-icon' /> Users </Link> </li>
            <li> <Link to='/admin/products'>   <ShoppingBagOutlinedIcon className='admin-icon' /> Products </Link> </li>
            <li>  <Link to='/admin/addproduct'>  <Inventory2OutlinedIcon className='admin-icon' /> Add Product </Link> </li>
            <li>  <Link to='/admin/transactions'>   <AttachMoneyOutlinedIcon className='admin-icon' /> Transactions </Link> </li>
        </ul>
    </div>
    )
}

export default AdminSideBar;