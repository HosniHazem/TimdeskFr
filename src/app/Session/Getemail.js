import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import React from 'react';
export default function Getemail() {
    const {http} = AuthUser();
    const [userdetail,setUserdetail] = useState('');

    useEffect(()=>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = () =>{
        http.post('/me').then((res)=>{
            setUserdetail(res.data);
        });
    }

    function renderElement(){
        if(userdetail){
            return <div>
                <p>{userdetail.email}</p>
            </div>
        }

    }

    return(
        <div>
       { renderElement() }
        </div>
    )
}