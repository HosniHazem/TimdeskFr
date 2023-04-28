import React, { useState } from "react";
import { Box, styled } from "@mui/system";
import { useHistory } from "react-router-dom";
import { Span } from "../Session/Typography";
import { Card, Grid, Button } from "@mui/material";
import "./style.css";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

function Reset(props) {
	const history = useHistory();
	var [error, setError] = useState(null);
	  const ResetSubmit =async  (e) => {
		  e.preventDefault();
	  
	  await fetch('http://localhost:8000/api/reset',{
	  method:'POST',
	headers:{'Content-Type':'application/json'},
	body: JSON.stringify(
	  {
		token:props.match.params.token,
	  }
	)
	
  
		  });
	  setError('Check your email, you will get the new password');
	  }

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

							<h4 className='p-2 text-success'>{error}</h4>



							<FlexBox>

								<div className={error == null ? " m-3" : "m-3 d-none"}>
									<button
										onClick={ResetSubmit}
										type='submit'
										variant="contained"
										color="primary"
										className='btn btn-primary'

									>
										Edit                    </button>
									

									<Span sx={{ mr: 1, ml: "16px" }}>or</Span>
									<Button
										sx={{ textTransform: "capitalize" }}
										onClick={() => history.push("/login")}
									>
										Sign in
									</Button>
								</div>
								<div 
						className={error == null
					
							? ' m-3 d-none '
							: 'm-3'
					}>
					<Link to='/login' className='btn btn-primary '>
					go to login page{' '}
						</Link>
						</div>
								
							</FlexBox>

						</ContentBox>
					</Grid>
				</Grid>
			</Card>
		</ForgotPasswordRoot>
	);
};

export default withRouter(Reset);
