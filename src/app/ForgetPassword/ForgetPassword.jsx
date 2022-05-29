import React, { useState } from "react";
import { Box, styled } from "@mui/system";
import { useHistory } from "react-router-dom";
import { Span } from "../Session/Typography";
import { Card, Grid, Button } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import "./style.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ButtonGroup } from "react-bootstrap";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const IMG = styled("img")(() => ({
  width: "100%",
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    borderRadius: 12,
    margin: "1rem",
  },
}));

const ForgotPassword = () => {
  const history = useHistory();
  const [state, setState] = useState({});
  var [error, setError] = useState(null);
  var [erreur, setErreur] = useState(null);
  var [forgetValue, setforgetValue] = useState({
    email: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.preventDefault();
    setforgetValue({ ...forgetValue, [e.target.name]: e.target.value });
  };
  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  const ForgetSubmit = (e, props) => {
    e.preventDefault();

    const data = {
        email: forgetValue.email,
    };
    console.log(data);
    axios.post('api/forget', data).then((Response) => {
        if (Response.status == 200) {
            setError(Response.data.message);
            setErreur(Response.data.erreur)

            console.log(Response);
        } else if (Response.status == 500) {
            console.log('eeee');
        }
    });
};


  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <JustifyBox p={4} height="100%">
              <IMG src="/assets/Timsoft.png" alt="" />
            </JustifyBox>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
          
            <ContentBox>
              
              <ValidatorForm onSubmit={ForgetSubmit} methode="POST">
              <h5 className="p-2 text-danger">{erreur}</h5>
              <h4 className="p-2 text-success">{error}</h4>
             
                                    <TextValidator
                                        sx={{ mb: 3, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="Email"
    
                                        type="email"
                                        id="email"
                  name="email"
                  value={forgetValue.email}
                  onChange={handleInput}
                                       
                                        
                                    />
           
                <FlexBox>
                  <div className={error == null ? " m-3" : "m-3 d-none"}>
                    <button
                      variant="contained"
                      color="primary"
                      to='#' className='btn btn-primary' type='submit'
                     
                    >
                      Reset Password
                    </button>
                   
                    <Span sx={{ mr: 1, ml: "16px" }}>or</Span>
                    <Button
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => history.push("/login")}
                    >
                      Sign in
                    </Button>
                  </div>
                </FlexBox>
              </ValidatorForm>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;
