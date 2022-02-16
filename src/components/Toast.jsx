import './toast.css'
import Alert from '@mui/material/Alert';

const Toast=(props)=>{
   
    // const [get,set]=useState('');
   
    return <Alert className={`toast toast-show`} variant="filled" severity={props.color}>
    {props.msg}
  </Alert>
}

export default Toast;