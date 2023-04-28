import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DefaultUserPic from "../../images/default.png";

import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert'
import AuthUser from '../Session/AuthUser';


const New = ({ inputs, title }) => {
 let info1 = sessionStorage.getItem("token");
   
  const token = JSON.parse(info1);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 
  const history = useHistory();
  let info = sessionStorage.getItem("user");
   
    const userInfo = JSON.parse(info);
    const [userdetail,setUserdetail] = useState([]);
    const [file, setFile] = useState([]);
    const [filex, setFilex] = useState([]);
    useEffect(() => {
      axios.get(`api/User/${userInfo.id}/show`).then((res) => {
        if(res.status === 200){
          setUserdetail(res.data.User);
          setFile(res.data.User.profile_picture)
   } else if(res.status === 404){
    
   }
      });
    }, []);
    if(userdetail===undefined){
      sessionStorage.clear();
      window.location.reload();
    }
    console.log(file)
  
    
    
   
    const handleInput = (e) => {
      e.persist();
     
      setUserdetail({...userdetail, [e.target.name]: e.target.value });
  }
  const [picture,setPicture] = useState({
    attach:""
  });
  const [error,setError] = useState([]);
  const handleImage = (e) => {
    e.preventDefault();
    setPicture({attach : e.target.files[0]});
    setFile(e.target.files[0].name);
  
  }
 
  const updateProfile = (e) => {

  const formData = new FormData();
  formData.append('attach',picture.attach);
  console.log(formData)
   axios.post('api/imageProfil',formData).then(res=>{
     if(res.status=== 200){
      
       setError(res.data.error);

     }
     else if (res.status=== 422){
       setError(res.data.error);
     }
   },
   )
   e.preventDefault();

  const  data = {  
    name: userdetail.name,
    email: userdetail.email,
    city:userdetail.city,
    country:userdetail.country,
    phone_no:userdetail.phone_no,
    organization:userdetail.organization,
    profile_picture:file,
    Is_Active:userdetail.Is_Active,
    Is_Sendmail_Password:userdetail.Is_Sendmail_Password,
    address:userdetail.address,
    company_id:userdetail.company_id,
    description:userdetail.description,
    email_verified_at:userdetail.email_verified_at,
    external_code:userdetail.external_code,
    job_title:userdetail.job_title,
    RoleID:userdetail.RoleID,
    state:userdetail.state,
    time_zone_id:userdetail.time_zone_id,
    updated_at:userdetail.updated_at,
    sold: userdetail.sold,
    sold_consumed: userdetail.sold_consumed,
    sold_total: userdetail.sold_total,
  }
  const  profil = {
    id:userdetail.id,
    name: userdetail.name,
    email: userdetail.email,
    city:userdetail.city,
    country:userdetail.country,
    phone_no:userdetail.phone_no,
    organization:userdetail.organization,
    profile_picture:file,
    Is_Active:userdetail.Is_Active,
    Is_Sendmail_Password:userdetail.Is_Sendmail_Password,
    address:userdetail.address,
    company_id:userdetail.company_id,
    description:userdetail.description,
    email_verified_at:userdetail.email_verified_at,
    external_code:userdetail.external_code,
    job_title:userdetail.job_title,
    RoleID:userdetail.RoleID,
    state:userdetail.state,
    time_zone_id:userdetail.time_zone_id,
    updated_at:userdetail.updated_at,
    sold: userdetail.sold,
    sold_consumed: userdetail.sold_consumed,
    sold_total: userdetail.sold_total,
  }
  axios.put(`api/User/${userInfo.id}/update`, data).then(res=>{
        
      
    if(res.data.status === 200)
    {
        swal("Updated","Profil","success");
        window.location.reload();
    } if(res.data.status === 422)
    {
        swal("All fields are mandetory","","error");

    }
    else if(res.data.status === 404)
    {
        swal("Error","Profil","error");

    }
});
sessionStorage.removeItem('user');
sessionStorage.setItem('user',JSON.stringify(profil));
  }


  return (
    
    <div className="new">
  
      <div className="newContainer">
   
        <div className="top">
        
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                "http://localhost:8000/images/uploads/" + userdetail.profile_picture
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={updateProfile} encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleImage}
                  style={{ display: "none" }}
                />
              </div>

                <div className="formInput" >
                <label>Name</label>
                <input type="text" name="name"className="form-control" onChange={handleInput} htmlFor="exampleFormControlInput1"  value={userdetail.name} />
                </div>
                <div className="formInput" >
                <label>Phone</label>
                <input type="text" name="phone_no"   className="form-control" onChange={handleInput} htmlFor="exampleFormControlInput1" value={userdetail.phone_no}  />
                </div>
                <div className="formInput" >
             <label>City</label>
             <input type="text" name="city"   className="form-control" onChange={handleInput} htmlFor="exampleFormControlInput1" value={userdetail.city}  />
                </div>
                
                <div className="formInput" >
                <label>Country</label>
                <input type="text" name="country"   className="form-control" onChange={handleInput} htmlFor="exampleFormControlInput1" value={userdetail.country} />
                </div>
                <div className="formInput" >
                <label>Organization</label>
                <input type="text" name="organization"   className="form-control" onChange={handleInput} htmlFor="exampleFormControlInput1" value={userdetail.organization} />
                </div>
                <div>
              <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
