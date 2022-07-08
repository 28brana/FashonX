import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Navbar from '../components/Navbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/reducers/apiCalls';
import { useNavigate } from 'react-router-dom';
import './register.css'
import { logout } from '../redux/reducers/userReducer';

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
const Register=()=>{
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const User=useSelector(state=>state.user)
    const navigate=useNavigate();
    
    useEffect(()=>{
        if(User.currentUser){
            navigate('/');  
        }
    },[User,navigate])


    const [getUser,setUser]=useState({
        username:"",
        email:"",
        password:""
    })

    const [getCheck,setCheck]=useState(true);
    const [getError,setError]=useState(0);
    const handleForm=(e)=>{
        if(User.error){
            dispatch(logout());
        }
        const name=e.target.name;
        const value=e.target.value;
        setUser({
            ...getUser,
            [name]:value
        })
    }
    const dispatch=useDispatch();
    const handleSubmit=()=>{
        if(getUser.username===""){
            setError(1);
            return;
        }else if(getUser.email===""){
            setError(2);
            return;
        }else if(getUser.password===""){
            setError(3);
            return;
        }else if(getCheck===false){
            setError(4);
            return;
        }else if(!validateEmail(getUser.email)){
            setError(5);
            return ;
        }
        register(dispatch,getUser);
        if(User.currentUser){
            setError(0)
        };

    }
    const Error=()=>{
        return (
            <div className="input-error">
                {getError ===5 ? "Email is not Valid":"Field is Empty"}
            </div>
        )
    }
    return (
        <>
        <Navbar/>
            <div className="register-container">
                <form action="" className="register-form">
                    <input name='username'  onChange={handleForm} required type="text" placeholder='Enter username' />
                    {
                        (getError ===1 ) && <Error/>
                    }
                    <input name='email' onChange={handleForm} required type="text" placeholder='Enter email' />
                    {
                        (getError ===2 || getError === 5 ) && <Error/>
                    }
                    <div id="password-container">
                        <input name='password' onChange={handleForm} required type={showPassword ? "text" : "password"} placeholder='Enter password' />
                        <div id="show-hidePass" onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityIcon/>:<VisibilityOffIcon/>}
                        </div>
                    </div>
                    {
                        (getError ===3 ) && <Error/>
                    }
                    <div className="check-box">
                        <Checkbox  defaultChecked onChange={()=>setCheck(!getCheck)}  />
                        <span>I accept the terms of use</span>
                    </div>
                    {
                        (getError ===4 ) && <Error/>
                    }
                    
                    {(User.error) ? <div style={{color:'red',marginLeft:'1.4em'}}>Either username is taken or email is taken</div>:""}
                    

                    <Button onClick={handleSubmit} className='register-submit' variant="contained">Register</Button>
                </form>
            </div>
        </>
    )
}

export default Register;