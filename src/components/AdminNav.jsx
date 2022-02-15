import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import './adminnav.css';
const AdminNav=()=>{
    
    return(
        <div className="admin-nav" >
        <SettingsIcon className='admin-nav-icon'/>
         <Avatar className='admin-nav-icon'/>
        </div>
    )
}

export default AdminNav;