import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {login} from '../redux/reducers/apiCalls';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Animation=()=>{
    return (
        <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>

    )
}

const Login=()=>{
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const User=useSelector(state=>state.user)
    const navigate=useNavigate();
    
    useEffect(()=>{
        if(User.currentUser){
        
            navigate('/');  
        }
    },[User,navigate])
    const [getUser,setUser]=useState({
        username:'',
        password:''
    })
    const [getError,setError]=useState(0);


    const handleForm=(e)=>{
        const key=e.target.name;
        const value=e.target.value;
        setUser(
            {
                ...getUser,
                [key]:value
            }
        )
    }

    const dispatch= useDispatch();
    const handleLogin=()=>{
        if(getUser.username===""){
            setError(1);
            return;
        }else if(getUser.password===""){
            setError(2);
            return ;
        }
        login(dispatch,getUser)
        if(User.currentUser){
            setError(0)
        }
        
    }

    return (
        <>
        <Navbar/>
        <div className="login-container">
        <Animation/>
        <div className="login">
                <TextField error={getError ===1}  helperText={getError === 1 ? "Field is Empty":""} onChange={handleForm} id="username" name='username' label="username" variant="standard" />
                <TextField type={showPassword ? "text" : "password"} error={getError ===2} helperText={getError === 2 ? "Field is Empty":""} onChange={handleForm} id="password" name='password' label="password" variant="standard"  
          InputProps={{ 
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </InputAdornment>
                )
             }}/>
              {User.error ? <div id="user-error">Either password is wrong or username !!!</div>:""}
                <Button onClick={handleLogin}  disabled={User.isFetching} variant="contained">Login</Button>
            </div>
        </div>
        </>
    )
}

export default Login;