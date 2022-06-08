import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import React from 'react';
export default function Getname() {
    const {http} = AuthUser();
    const [userdetail,setUserdetail] = useState('');

    useEffect(()=>{
        const fetchUserDetail = () =>{
            http.post('/me').then((res)=>{
                setUserdetail(res.data);
            });
        }
        fetchUserDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function renderElement(){
        if(userdetail){
            return <div>
                <p>{userdetail.name}</p>
            </div>
        }

    }

    return(
        <div>
       { renderElement() }
        </div>
    )
}
