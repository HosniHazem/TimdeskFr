import axios from 'axios';
import { useState,useEffect } from 'react';
import { useHistory  } from 'react-router-dom';
import jwt_decode from "jwt-decode";


export default function AuthUser(){
    let history = useHistory();
    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }
   
    
 

    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));
     
        setToken(token);
        
    
    setUser(user);
        history.push("/dashboard");
        window.location.reload();
    }

    const logout = () => {
        sessionStorage.clear();
        history.push("/login");
    }



    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        }
    });


    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        getUser,
        http,
        logout
    }
}