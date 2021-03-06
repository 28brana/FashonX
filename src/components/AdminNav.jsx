import Avatar from '@mui/material/Avatar';
import './adminnav.css';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
const AdminNav=()=>{
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const logOut=()=>{
        dispatch(logout());
        navigate('/');

    }
    return(
        <div className="admin-nav" >
        <div className='logo' style={{marginRight:'auto',marginLeft:'1em'}}>
            FashonX
        </div>
        <Link to="/">
         <div style={{cursor:'pointer'}} >
            Go to Home
         </div>
        </Link>
         <div style={{cursor:'pointer'}} onClick={logOut} >
            Logout
         </div>
         
         <Avatar className='admin-nav-icon'>A</Avatar>
        </div>
    )
}

export default AdminNav;