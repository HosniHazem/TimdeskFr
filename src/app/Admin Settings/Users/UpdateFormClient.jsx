import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from './Typography'

import { ValidatorForm} from 'react-material-ui-form-validator'
import axios from 'axios';
import {useHistory,useParams} from 'react-router-dom';
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

const {http,token} = AuthUser()  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { id } = useParams();
    const [UserInput, setUser] = useState([]);
    const [errorInput, setError] = useState([]);
    const [soldInput, setsold] = useState([]);

    useEffect(() => {
      axios.get(`api/User/${id}/show`).then((res) => {
        if(res.data.status === 200){
        setUser(res.data.User);
        setsold(res.data.User.sold_total)
   } else if(res.data.status === 404){
    
   }
      });
    }, [id]);
    if(UserInput===undefined){
        sessionStorage.clear();
        window.location.reload();
      }
   
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
        setUser({...UserInput, [e.target.name]: e.target.value });
    }
    const updateUser = (e) => {
        var ID=UserInput.RoleID
        e.preventDefault();
        
            const  data = {
                
                name: UserInput.name,
                
                RoleID: "3",
                Is_Active: UserInput.Is_Active,
                email:UserInput.email,
                organization:UserInput.organization,
                profile_picture:UserInput.profile_picture,
                
                phone_no:UserInput.phone_no,
                city:UserInput.city,
                country:UserInput.country,
                sold_total:UserInput.sold_total,
                sold:(Number(UserInput.sold_total)-Number(soldInput))+Number(UserInput.sold),
                sold_consumed:UserInput.sold_consumed,
            }
        
   console.log(data)

    axios.put(`api/User/${id}/update`, data).then(res=>{
        
      
        if(res.data.status === 200)
        {
            swal("Updated",UserInput.name,"success");
            setError([]);
            
           history.push('/User')
        } if(res.data.status === 422)
        {
            swal("All fields are mandetory","","error");
            setError(res.data.validate_err);
        }
        else if(res.data.status === 404)
        {
            swal("Error",UserInput.name,"error");
            setError([]);
        }
    });
}

  
  


  return (   
    
    <Container>
    <div>
  
        <ValidatorForm onSubmit={updateUser} onError={() => null}>
            <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                   
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="name">Name</label>
                      <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.name}  />
                      <span className="text-danger">{errorInput.name}</span>
              </div>
              
              <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="email">Email</label>
                      <input type="text" name="email" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.email}  />
                      <span className="text-danger">{errorInput.email}</span>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="city">City</label>
                      <input type="text" name="city" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.city}  />
                      <span className="text-danger">{errorInput.city}</span>
              </div>                       
                    
           
              
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Organization</label>
                      <input type="text" name="organization" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.organization}/>
                      <span className="text-danger">{errorInput.organization}</span>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                      <input type="text" name="phone_no" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.phone_no}/>
                      <span className="text-danger">{errorInput.phone_no}</span>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Country</label>
                      <input type="text" name="country" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.country}/>
                      <span className="text-danger">{errorInput.country}</span>
              </div>  
              <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Solde</label>
                      <input type="text" name="sold_total" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={UserInput.sold_total}/>
                      <span className="text-danger">{errorInput.sold_total}</span>
              </div>  

              <label htmlFor="exampleFormControlInput1" className="Is_Active">Is Active</label>
                    <div className="input-group mb-3">
                  <label className="input-group-text" name="Is_Active" htmlFor="inputGroupSelect01">{UserInput.Is_Active}</label>
                  <select className="form-select" name="Is_Active" value={UserInput.Is_Active} onChange={handleInput} id="inputGroupSelect01">
                  <option defaultValue value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  
                  </select>
                  <span className="text-danger">{errorInput.Is_Active}</span>
                   </div>


                </Grid>
            </Grid>
            <Button color="primary" variant="contained" type="submit">
                <IMG
                                  src="/assets/send.png"
                                  alt=""
                              />
                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                    Update
                </Span>
            </Button>
        </ValidatorForm>
    </div>
    </Container>
  )
}
