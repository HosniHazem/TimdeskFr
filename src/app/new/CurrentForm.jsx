import {
  Button,
  Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from './Typography'
import React, { useState, useEffect } from 'react'
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


  const Getdata = (props) => {



    const id=props.match.params.id;
    console.log(id);
    const [levels, setlevels] = useState([]);

    useEffect(() => {
      axios.get(`api/Levels/${id}/show`).then((res) => {
        if(res.status === 200){
        setlevels(res.data.Levels);
   }
      });
    }, []);
   
   console.log(levels);

  }


  
const SimpleForm = () => {

  const [state, setState] = useState({
      date: new Date(),
  })

  useEffect(() => {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          console.log(value)

          if (value !== state.password) {
              return false
          }
          return true
      })
      return () => ValidatorForm.removeValidationRule('isPasswordMatch')
  }, [state.password])

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


  const {
      username,
      description,
  } = state

  return (
   
      <Container>
      <div>
      
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                           sx={{ mb: 3, width: '100%' }}
                           variant="outlined"
                           size="small"
                           label="hh"

                           type="email"
                           name="email"
                        //    onChange={e=>setEmail(e.target.value)}
                           validators={['required', 'isEmail']}
                           errorMessages={[
                               'this field is required',
                               'email is not valid',
                           ]}
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
                           type="text"
                           name="description"
                           id="standard-basic"
                           onChange={handleChange}
                           value={description || ''}
                           validators={[
                               'required',
                               'minStringLength: 4',
                               'maxStringLength: 9',
                           ]}
                           label="descriptions"
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

export default SimpleForm