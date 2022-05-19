import AuthUser from './AuthUser';
import {
    Card,
    Grid,
    Button,
    
    CircularProgress,

  } from '@mui/material'
  import { useState } from "react";
  import {Box, styled } from '@mui/system'
  import { Paragraph } from './Typography'
  import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
  import React from 'react'
  import { Link } from "react-router-dom";

  const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
  }))
  
  const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
  }))
  
  const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
  }))
  
  const IMG = styled('img')(() => ({
    width: '100%',
  }))
  
  const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    position: 'fixed',
      width: '100%',
      height: '100%',
      left: '0',
      top: '0',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
  }))
  
  const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
  }))
  const ERR = () => ({
    color: '#D8000C',
  })
  
export default function Login() {
    
    const {http,setToken} = AuthUser()
    const [email,setEmail] = useState('')
    const [password,setPwd] = useState('')
  
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const submitForm = async (e) =>{
        
        
        // api call
        e.preventDefault();
        setLoading(true);
        try{
            const response = await http.post('/login',{email:email,password:password}).then((res)=>{
            setToken(res.data.user,res.data.access_token);
        })
                setEmail('');
                setPwd('');
                console.log(JSON.stringify(response?.data));
        }catch(err){
            console.log(err);
            setMessage(err.message);
            setLoading(false);
          }


    }
   
    return(
        
        <JWTRoot>
        <Card className="card">
                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>
                            <JustifyBox p={4} height="100%">
                                <IMG
                                    src="/assets/Timsoft.png"
                                    alt=""
                                />
                            </JustifyBox>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <ContentBox>
                                <ValidatorForm onSubmit={submitForm}>
                                    <TextValidator
                                        sx={{ mb: 3, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="Email"
    
                                        type="email"
                                        name="email"
                                        onChange={e=>setEmail(e.target.value)}
                                        value={email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={[
                                            'this field is required',
                                            'email is not valid',
                                        ]}
                                    />
                                    <TextValidator
                                        sx={{ mb: '12px', width: '100%' }}
                                        label="Password"
                                        variant="outlined"
                                        size="small"
    
                                        name="password"
                                        type="password"
    
                                        onChange={e => setPwd(e.target.value)}
                                        value={password}
    
    
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    {/* <FormControlLabel
                                        sx={{ mb: '12px', maxWidth: 288 }}
                                        name="agreement"
    
                                        control={
                                            <Checkbox
                                                size="small"
    
    
    
                                            />
                                        }
                                        label="Remeber me"
                                    /> */}
                                     {message && (
                                        <Paragraph className="Er" sx={{ color: ERR }}>
                                           <span className="text-danger">
                                            {message}
                                            </span>
                                        </Paragraph>
                                    )}
    
                                    <FlexBox mb={2} flexWrap="wrap">
                                        <Box position="relative">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                Sign in
                                            </Button>
                                            {
                                              loading && (
                                                <StyledProgress
                                                    size={24}
                                                    className="buttonProgress"
                                                />
                                              )}
                                        </Box>
    
                                    </FlexBox>
                                    <Button>
                                    <Link to="/forgetpassword" className="link">
                                        Forgot password?
                                        </Link>
                                    </Button>
                                </ValidatorForm>
                            </ContentBox>
                        </Grid>
                    </Grid>
                </Card>
                </JWTRoot>
    )

}





