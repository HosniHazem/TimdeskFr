import React, { useState } from 'react'
import {
  Button,
  Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from './Typography'

import { ValidatorForm} from 'react-material-ui-form-validator'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import AuthUser from '../../Session/AuthUser';




const Container = styled('div')(({ theme }) => ({
    margin: '100px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))
const IMG = styled('img')(() => ({
    width: '30%',
  }))
 
  

  export default function SimpleForm () {
 let info = sessionStorage.getItem("token");
   
  const token = JSON.parse(info);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const [UserInput, setUser] = useState({
        name:"",
        RoleID: "Client",
       Is_Active: "Active",
       email:"",
       organization:"",
        phone:"",
        city:"",
        country:"",
        sold_total:"",
        profile_picture:"default.png",
        error_list: [],
    });

    
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
       
        setUser({...UserInput, [e.target.name]: e.target.value });
    }
    const AddUser = (e) => {

        e.preventDefault();
       
       
            const  data = {
                name: UserInput.name,
                
                RoleID: "3",
                Is_Active: UserInput.Is_Active,
                email:UserInput.email,
                organization:UserInput.organization,
                phone_no:UserInput.phone_no,
                city:UserInput.city,
                country:UserInput.country,
                sold_total:UserInput.sold_total,
                profile_picture:"default.png",
            }
            
console.log(data)
    axios.post(`api/User/create`, data).then(res=>{
        if(res.data.status === 200)
        {
            
            swal("Created",UserInput.name,"success");
           history.push('/User')
        }
        else if(res.data.status === 404)
        {
            swal("Error",UserInput.name,"error");
        }
        else if(res.data.status === 422)
        {
         
                     setUser({...UserInput, error_list: res.data.validate_err });
        }
    });
}

  
  


  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={AddUser} onError={() => null}>
              <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Name</label>
                        <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.name}  />
                        <span className="text-danger">{UserInput.error_list.name}</span>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="email">Email</label>
                        <input type="text" name="email" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.email}  />
                        <span className="text-danger">{UserInput.error_list.email}</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="city">City</label>
                        <input type="text" name="city" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.city}  />
                        <span className="text-danger">{UserInput.error_list.city}</span>
                </div>                       
                      
                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Organization</label>
                        <input type="text" name="organization" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.organization}/>
                        <span className="text-danger">{UserInput.error_list.organization}</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                        <input type="text" name="phone_no" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.phone_no}/>
                        <span className="text-danger">{UserInput.error_list.phone_no}</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Country</label>
                        <input type="text" name="country" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.country}/>
                        <span className="text-danger">{UserInput.error_list.country}</span>
                </div>  
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Solde</label>
                        <input type="text" name="sold_total" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.sold_total}/>
                        <span className="text-danger">{UserInput.error_list.sold_total}</span>
                </div>  

                <label htmlFor="exampleFormControlInput1" className="Is_Active">Is Active</label>
                      <div className="input-group mb-3">
                    <label className="input-group-text" name="Is_Active" htmlFor="inputGroupSelect01">{UserInput.Is_Active}</label>
                    <select className="form-select" name="Is_Active" value={UserInput.Is_Active} onChange={handleInput} id="inputGroupSelect01">
                    <option defaultValue value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                    </select>
                    <span className="text-danger">{UserInput.error_list.Is_Active}</span>
                     </div>


                  </Grid>
              </Grid>
              <Button color="primary" variant="contained" type="submit">
                  <IMG
                                    src="/assets/send.png"
                                    alt=""
                                />
                  <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                      ADD
                  </Span>
              </Button>
          </ValidatorForm>
      </div>
      </Container>
  )
}
