import AuthUser from './AuthUser';
import React from 'react'
  
export default function Logout() {
    
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token !== undefined){
            logout();
        }
    }
   
    return(
       
        <div role="button" onClick={logoutUser}>Logout </div> 
    )}