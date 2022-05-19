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

    const [ImpactInput, setImpact] = useState({
        name:"",
        Is_Active:"Active",
        description:"",
  
        Is_Client_Visible:"Active",
        error_list: [],
    });
  

    
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
       
        setImpact({...ImpactInput, [e.target.name]: e.target.value });
    }
    const AddImpact = (e) => {
    
       
        e.preventDefault();
        
       
            const  data = {
                name: ImpactInput.name,
                Is_Active: ImpactInput.Is_Active,
                description: ImpactInput.description,
             
                Is_Client_Visible:ImpactInput.Is_Client_Visible,
            }
      

    axios.post(`api/Impact/create`, data).then(res=>{
        if(res.data.status === 200)
        {
            
            swal("Created",ImpactInput.name,"success");
           history.push('/impact')
        }
        else if(res.data.status === 404)
        {
            swal("Error",ImpactInput.name,"error");
        }
        else if(res.data.status === 422)
        {
         
                     setImpact({...ImpactInput, error_list: res.data.validate_err });
        }
    });
}

  
  


  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={AddImpact} onError={() => null}>
              <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Name</label>
                        <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={ImpactInput.name}  />
                        <span className="text-danger">{ImpactInput.error_list.name}</span>
                </div>
                

                                          
                      
                <label htmlFor="exampleFormControlInput1" className="Is_Active">Is Active</label>
                      <div className="input-group mb-3">
                    <label className="input-group-text" name="Is_Active" htmlFor="inputGroupSelect01">{ImpactInput.Is_Active}</label>
                    <select className="form-select" name="Is_Active" value={ImpactInput.Is_Active} onChange={handleInput} id="inputGroupSelect01">
                    <option defaultValue value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                    </select>
                    <span className="text-danger">{ImpactInput.error_list.Is_Active}</span>
                     </div>

                     <label htmlFor="exampleFormControlInput1" className="Is_Client_Visible">Is Client Visible</label>
                      <div className="input-group mb-3">
                    <label className="input-group-text" name="Is_Client_Visible" htmlFor="inputGroupSelect01">{ImpactInput.Is_Client_Visible}</label>
                    <select className="form-select" name="Is_Client_Visible" value={ImpactInput.Is_Client_Visible} onChange={handleInput} id="inputGroupSelect01">
                    <option defaultValue value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                    </select>
                    <span className="text-danger">{ImpactInput.error_list.Is_Client_Visible}</span>
                     </div>

                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                        <input type="text" name="description" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={ImpactInput.description}/>
                        <span className="text-danger">{ImpactInput.error_list.description}</span>
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
