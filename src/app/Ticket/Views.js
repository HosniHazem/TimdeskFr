import React,{ useState,useEffect } from "react";
import PropTypes from 'prop-types';
import './Views.scss'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Grid,
 
} from '@mui/material'
import axios from 'axios';
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};




export default function CustomizedDialogs(id) {

  
  const [TicketInput, setTicket] = useState([]);
  useEffect(() => {
    
    axios.get(`api/Tickets/${id}/show`).then((res) => {
      if(res.data.status === 200){
      setTicket(res.data.Ticket);
 } else if(res.data.status === 404){
  
 }
    });
  }, [id]);

  const [Status, setStatus] = useState([]);

 useEffect(() => {
   axios.get('api/Status').then((res) => {
     if(res.status === 200){
     setStatus(res.data.Status);
}
   });
 }, []);

 var dataRows = "";
       
dataRows = Status.map((n) =>{
  return ( 
   
    
   n.name
     

    
   );
   

})

  const [RequestTypeInput, setRequestType] = useState([]);
  useEffect(() => {
    axios.get(`api/RequestType`).then((res) => {
      if(res.data.status === 200){
      setRequestType(res.data.RequestType);
      
 } else if(res.data.status === 404){
  
 }
    });
  }, []);

       
  RequestTypeInput.map((n) =>{
    if(n.id===TicketInput.RequestType)
    return ( 
     
      setRequestType(n.name)
     
       
  
      
     );
     
  
  })
console.log
  const [CategoryInput, setCategory] = useState([]);
  useEffect(() => {
    axios.get(`api/Category/${TicketInput.CategoryID}/show`).then((res) => {
      if(res.data.status === 200){
      setCategory(res.data.Category);

 } else if(res.data.status === 404){
  
 }
    });
  }, []);

  const [SubCategoryInput, setSubCategory] = useState([]);
    useEffect(() => {
      axios.get(`api/SubCategory/${TicketInput.SubCategoryID}/show`).then((res) => {
        if(res.data.status === 200){
        setSubCategory(res.data.SubCategory);

   } else if(res.data.status === 404){
    
   }
      });
    }, [TicketInput.SubCategoryID]);
    const [LevelsInput, setLevels] = useState([]);
    useEffect(() => {
      axios.get(`api/Levels/${TicketInput.LevelID}/show`).then((res) => {
        if(res.data.status === 200){
        setLevels(res.data.Levels);
      
   } else if(res.data.status === 404){
    
   }
      });
    }, [TicketInput.LevelID]);
    const [PriorityInput, setPriority] = useState([]);
    useEffect(() => {
      axios.get(`api/Priority/${TicketInput.PriorityID}/show`).then((res) => {
        if(res.data.status === 200){
        setPriority(res.data.Priority);
    
   } else if(res.data.status === 404){
    
   }
      });
    }, [TicketInput.PriorityID]);
    const [UserInput, setUser] = useState([]);
    useEffect(() => {
      axios.get(`api/User/${TicketInput.AssignedUser}/show`).then((res) => {
        if(res.status === 200){
        setUser(res.data.User);
       
   } else if(res.data.status === 404){
    
   }
      });
    }, [TicketInput.AssignedUser]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [activeStep, setActiveStep] = React.useState(0)
  const steps = dataRows;


  const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
      setActiveStep(0)
  }

  return (
    <div>
     <div
  className="updateButton"
  onClick={handleClickOpen}
  
  
>
  
  View
</div>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography>All steps completed</Typography>
                        <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="secondary"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        
                        <Box pt={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button
                                sx={{ ml: 2 }}
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1
                                    ? 'Finish'
                                    : 'Next'}
                            </Button>
                        </Box>
                    </div>
                )}
            </div>
        </div>
        </BootstrapDialogTitle>
        <DialogActions id="elgrid">

               
                <Grid container spacing={7} id="grid">
                    <Grid item  lg={15} md={6} sm={12} xs={6} sx={{ mt: 2 }}>
                     
                <div>
                <label className="font-weight-bold" >Demander:</label>
                <p>{TicketInput.RequestedUser}</p>
                </div>
                <div>
                <label className="font-weight-bold">Request type:</label>
                <p>{RequestTypeInput.name}</p>
                </div>
                <div>
                <label className="font-weight-bold">Category:</label>
                <p>{CategoryInput.name}</p>
                </div>
                <div>
                <label className="font-weight-bold">Priority:</label>
                <p>{PriorityInput.name}</p>
                </div>
                <div>
                <label className="font-weight-bold">DueDate:</label>
                <p>{TicketInput.DueDate}</p>
                </div>
                    </Grid>
                    <Grid item lg={15} md={6} sm={12} xs={4} sx={{ mt: 2 }}>
                    <div>
                <label className="font-weight-bold">Agent:</label>
                <p>{UserInput.name}</p>
                </div>
                
                <div>
                <label className="font-weight-bold">Module:</label>
                <p>{SubCategoryInput.name}</p>
                </div>
                <div>
                <label className="font-weight-bold">Level:</label>
                <p>{LevelsInput.name}</p>
                </div>
                <div>
                <label className="font-weight-bold">Estimated Time:</label>
                <p>{TicketInput.EstimatedTime}</p>
                </div>
                    </Grid>
                    <Grid item lg={15} md={6} sm={12} xs={4} sx={{ mt: 2 }}>
                    <div>
                <label className="font-weight-bold">Estimated Date:</label>
                <p>{TicketInput.EstimatedDate}</p>
                </div>
                <div>
                <label className="font-weight-bold">Subject:</label>
                <p>{TicketInput.Subject}</p>
                </div>
                <div>
                <label className="font-weight-bold">Description:</label>
                <p>{TicketInput.Description}</p>
                </div>
                <div>
                <label className="font-weight-bold">Solution:</label>
                <p>{TicketInput.SolutionDescription}</p>
                </div>
                <div>
                <label className="font-weight-bold">Ticket Attachment:</label>
                <a href={`http://localhost:8000/images/uploads/${TicketInput.attach}`} >{TicketInput.attach}</a>
                </div> 
                  
                    </Grid>
                   
                </Grid>

   
        </DialogActions>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
