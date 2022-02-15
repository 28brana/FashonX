import { loginFailure, loginStart, loginSuccess } from "./userReducer";
import { publicRequest } from "../../requestMethods";

export const login = async (dispatch, user) => {
  
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    if(res.data==="Wrong Password"){
      dispatch(loginFailure());
      return 
    }
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register= async (dispatch, user) => {
  
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register/", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};