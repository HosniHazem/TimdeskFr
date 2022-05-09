import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from './Typography'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import axios from 'axios';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}))

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


  
  export default function SimpleForm (props) {

    const id=props.match.params.id;
    const [levels, setlevels] = useState([]);

    useEffect(() => {
      axios.get(`api/Levels/${id}/show`).then((res) => {
        if(res.status === 200){
        setlevels(res.data.Levels);
   }
      });
    }, []);
  
 
console.log(levels)

  const [state, setState] = useState({
      date: new Date(),
  })


  const handleSubmit = (event) => {
      // console.log("submitted");
      // console.log(event);
  }

  const handleChange = (event) => {
      event.persist()
      setState({
          ...state,
          [event.target.name]: event.target.value,
      })
  }


  return (   
    
      <Container>
      <div>
      <div>
    {console.log(levels.name)}
  </div>  
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                          type="text"
                          name="username"
                          id="standard-basic"
                          onChange={handleChange}
                          defaultValue={levels.name}
                          validators={[
                              'required',
                              'minStringLength: 4',
                              'maxStringLength: 9',
                          ]}
                          label="User"
                          errorMessages={['this field is required']}
                      />
                                          
                      

                      <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Is Active</label>
                    <select className="form-select" id="inputGroupSelect01">
                    <option defaultValue value="1">Active</option>
                    <option value="2">Inactive</option>
                    
                    </select>
                </div>


                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                          label="Description"
                          onChange={handleChange}
                          type="text"
                          name="firstName"
                          
                          defaultValue="salem"
                          validators={['required']}
                          errorMessages={['this field is required']}
                      />

                      
                      
                      
                      <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Is Default</label>
                    <select className="form-select" id="inputGroupSelect01">
                    <option defaultValue value="1">Active</option>
                    <option value="2">Inactive</option>
                    </select>
                </div>



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
