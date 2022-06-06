import axios from 'axios';
import { useState } from 'react';
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
        if (jwt_decode(token).exp < Date.now() / 1000) {
            axios.post('api/refresh').then((res) => {
                const token = res.data.access_token;
                sessionStorage.removeItem('token');
            sessionStorage.setItem('token',JSON.stringify(token));
          })
        }else{
        setToken(token);
        
    }
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