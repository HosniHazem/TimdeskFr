import AuthUser from './AuthUser';
import React from 'react'
  
export default function Login() {
    
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token !== undefined){
            logout();
        }
    }
   
    return(
       
        <span role="button" onClick={logoutUser}>Logout </span> 
    )}