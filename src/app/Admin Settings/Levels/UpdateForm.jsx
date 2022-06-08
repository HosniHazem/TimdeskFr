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
import {  ChromePicker } from 'react-color';
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

    const { id } = useParams();
    const [LevelsInput, setLevels] = useState([]);
    const [errorInput, setError] = useState([]);
    const [colorInput, setcolor]= useState('#210998')

    useEffect(() => {
      axios.get(`api/Levels/${id}/show`).then((res) => {
        if(res.data.status === 200){
        setLevels(res.data.Levels);
        setcolor(res.data.Levels.color)      
   } else if(res.data.status === 404){
    
   }
      });
    }, [id]);

    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
        setLevels({...LevelsInput, [e.target.name]: e.target.value });
    }

    const updateLevels = (e) => {

       
        e.preventDefault();
        
       
            const  data = {
                name: LevelsInput.name,
                Is_Active: LevelsInput.Is_Active,
                description: LevelsInput.description,
                color: colorInput.hex,
        
            }
        
   

    axios.put(`api/Levels/${id}/update`, data).then(res=>{
        
      
        if(res.data.status === 200)
        {
            swal("Updated",LevelsInput.name,"success");
            setError([]);
            
           history.push('/Levels')
        } if(res.data.status === 422)
        {
            swal("All fields are mandetory","","error");
            setError(res.data.validate_err);
        }
        else if(res.data.status === 404)
        {
            swal("Error",LevelsInput.name,"error");
            setError([]);
        }
    });
}

  
  


  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={updateLevels} >
              <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Name</label>
                        <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={LevelsInput.name}  />
                        <span className="text-danger">{errorInput.name}</span>
                </div>
                      
                <label htmlFor="exampleFormControlInput1" className="Is_Active">Is Active</label>
                      <div className="input-group mb-3">
                    <label className="input-group-text" name="Is_Active" htmlFor="inputGroupSelect01">{LevelsInput.Is_Active}</label>
                    <select className="form-select" name="Is_Active" value={LevelsInput.Is_Active} onChange={handleInput} id="inputGroupSelect01">
                    <option defaultValue value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                    </select>
                    <span className="text-danger">{errorInput.Is_Active}</span>
                     </div>


                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                        <input type="text" name="description" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={LevelsInput.description}/>
                        <span className="text-danger">{errorInput.description}</span>
                </div>

                      
              
                <ChromePicker
                  onChange={updatedColor => setcolor(updatedColor)}
                color={colorInput}
              
      />
                 <span className="text-danger">{errorInput.color}</span>
                



                  </Grid>
              </Grid>
              <Button color="primary" variant="contained" type="submit">
                  <IMG
                                    src="/assets/send.png"
                                    alt=""
                                />
                  <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                      update
                  </Span>
              </Button>
          </ValidatorForm>
      </div>
      </Container>
  )
}
