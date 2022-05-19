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

    const [CategoryInput, setCategory] = useState({
        name:"",
        Is_Active:"Active",
        description:"",

        Is_Client_Visible:"Active",
        external_code:"",
        error_list: [],
    });
  

    
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
       
        setCategory({...CategoryInput, [e.target.name]: e.target.value });
    }
    const AddCategory = (e) => {
    
       
        e.preventDefault();
        
       
            const  data = {
                name: CategoryInput.name,
                Is_Active: CategoryInput.Is_Active,
                description: CategoryInput.description,

                Is_Client_Visible:CategoryInput.Is_Client_Visible,
                external_code:CategoryInput.external_code,
            }
      

    axios.post(`api/Category/create`, data).then(res=>{
        if(res.data.status === 200)
        {
            
            swal("Created",CategoryInput.name,"success");
           history.push('/category')
        }
        else if(res.data.status === 404)
        {
            swal("Error",CategoryInput.name,"error");
        }
        else if(res.data.status === 422)
        {
         
                     setCategory({...CategoryInput, error_list: res.data.validate_err });
        }
    });
}

  
  


  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={AddCategory} onError={() => null}>
              <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Name</label>
                        <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={CategoryInput.name}  />
                        <span className="text-danger">{CategoryInput.error_list.name}</span>
                </div>
                

                                          
                      
                <label htmlFor="exampleFormControlInput1" className="Is_Active">Is Active</label>
                      <div className="input-group mb-3">
                    <label className="input-group-text" name="Is_Active" htmlFor="inputGroupSelect01">{CategoryInput.Is_Active}</label>
                    <select className="form-select" name="Is_Active" value={CategoryInput.Is_Active} onChange={handleInput} id="inputGroupSelect01">
                    <option defaultValue value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                    </select>
                    <span className="text-danger">{CategoryInput.error_list.Is_Active}</span>
                     </div>

                     <label htmlFor="exampleFormControlInput1" className="Is_Client_Visible">Is Client Visible</label>
                      <div className="input-group mb-3">
                    <label className="input-group-text" name="Is_Client_Visible" htmlFor="inputGroupSelect01">{CategoryInput.Is_Client_Visible}</label>
                    <select className="form-select" name="Is_Client_Visible" value={CategoryInput.Is_Client_Visible} onChange={handleInput} id="inputGroupSelect01">
                    <option defaultValue value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                    </select>
                    <span className="text-danger">{CategoryInput.error_list.Is_Client_Visible}</span>
                     </div>

                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                        <input type="text" name="description" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={CategoryInput.description}/>
                        <span className="text-danger">{CategoryInput.error_list.description}</span>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="external_code">External Code</label>
                        <input type="text" name="external_code" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={CategoryInput.external_code}  />
                        <span className="text-danger">{CategoryInput.error_list.external_code}</span>
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
