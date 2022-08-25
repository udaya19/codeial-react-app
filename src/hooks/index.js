import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {login as userLogin,register} from '../api';
import { setItemInLocalStorage,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage } from '../utils';
import { getItemInLocalStorage } from '../utils/index';
import jwt from 'jwt-decode'
export const useAuth = ()=>{
    return useContext(AuthContext);
}
export const useProvideAuth = () =>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if(userToken){
            const user = jwt(userToken);
            setUser(user);
        }
        setLoading(false)
    },[]);
    const login = async (email,password)=>{
        const response = await userLogin(email,password);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.token?response.data.token:null);
            return{
                success:true
            }
        }
        else{
            return{
                success:false,
                message:response.message
            }
        }
    };
    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
        if (response.success) {
            return {
              success: true,
            };
          } else {
            return {
              success: false,
              message: response.message,
            };
          }
    }
    return{
        user,
        loading,
        login,
        logout,
        signup
    }
}