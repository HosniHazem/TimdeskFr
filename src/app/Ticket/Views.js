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
import swal from 'sweetalert';



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



function getStepContent(stepIndex) {
  switch (stepIndex) {
      case 0:
          return ``
      case 1:
          return ``
      case 2:
          return ``
      default:
          return ``
  }
}


export default function CustomizedDialogs(id) {

  const [StatutActive, setStatutActive] = React.useState();
  const [TicketInput, setTicket] = useState([]);
  
  useEffect(() => {
    axios.get(`api/Tickets/${id}/show`).then((res) => {
      if(res.data.status === 200){
      setTicket(res.data.Ticket);
      
      
 } else if(res.data.status === 404){
  
 }
    });
  }, [id]);

  const [RequestTypeInput, setRequestType] = useState([]);
  const [CategoryInput, setCategory] = useState([]);
  const [SubCategoryInput, setSubCategory] = useState([]);
    const [LevelsInput, setLevels] = useState([]);
    const [PriorityInput, setPriority] = useState([]);
    const [UserInput, setUser] = useState([]);

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
   

  const [open, setOpen] = React.useState(false);
 var i=0
  const handleClickOpen = () => {
    setOpen(true);
    if(TicketInput){
      setPriority(TicketInput.priority.name)
      setUser(TicketInput.users.name)
      setLevels(TicketInput.levels.name)
      setCategory(TicketInput.category.name)
      setRequestType(TicketInput.request_types.name)
      setSubCategory(TicketInput.sub_category.name)
      setStatutActive(TicketInput.status.id-1)
  if(StatutActive){
     i=TicketInput.status.id-1
  }
    }
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };



  const steps = dataRows;

  const handleNext = () => {
      setStatutActive((prevActiveStep) => prevActiveStep + 1)
     
      const  data = {
        Subject: TicketInput.Subject,
        Description:TicketInput.Description,
        EstimatedTime:TicketInput.EstimatedTime,
        EstimatedDate:TicketInput.EstimatedDate,
        StatusID:StatutActive+2,
        RequestedUser:TicketInput.RequestedUser,
        RequestTypeID:TicketInput.RequestTypeID,
        SolutionDescription:TicketInput.SolutionDescription,
        DueDate:TicketInput.DueDate,
        AssignedUser:TicketInput.AssignedUser,
        SubCategoryID:TicketInput.SubCategoryID,
        CategoryID:TicketInput.CategoryID,
        PriorityID:TicketInput.PriorityID,
        attach:TicketInput.attach,
        LevelID:TicketInput.LevelID,
      }
  

axios.put(`api/Tickets/${id}/update`, data).then(res=>{
  

  if(res.data.status === 200)
  {
    swal("Updated Success");   
  } if(res.data.status === 422)
  {
    swal("not Updated");   
  }
 
});
  }

  const handleBack = () => {
      setStatutActive((prevActiveStep) => prevActiveStep - 1)
      const  data = {
        Subject: TicketInput.Subject,
        Description:TicketInput.Description,
        EstimatedTime:TicketInput.EstimatedTime,
        EstimatedDate:TicketInput.EstimatedDate,
        StatusID:StatutActive,
        RequestedUser:TicketInput.RequestedUser,
        RequestTypeID:TicketInput.RequestTypeID,
        SolutionDescription:TicketInput.SolutionDescription,
        DueDate:TicketInput.DueDate,
        AssignedUser:TicketInput.AssignedUser,
        SubCategoryID:TicketInput.SubCategoryID,
        CategoryID:TicketInput.CategoryID,
        PriorityID:TicketInput.PriorityID,
        attach:TicketInput.attach,
        LevelID:TicketInput.LevelID,
      }
  

axios.put(`api/Tickets/${id}/update`, data).then(res=>{
  

  if(res.data.status === 200)
  {
    swal("Updated Success");   
  } if(res.data.status === 422)
  {
    swal("not Updated");   
  }
 
});
  }

  const handleReset = () => {
      setStatutActive(1)
  const  data = {
  Subject: TicketInput.Subject,
  Description:TicketInput.Description,
  EstimatedTime:TicketInput.EstimatedTime,
  EstimatedDate:TicketInput.EstimatedDate,
  StatusID:StatutActive,
  RequestedUser:TicketInput.RequestedUser,
  RequestTypeID:TicketInput.RequestTypeID,
  SolutionDescription:TicketInput.SolutionDescription,
  DueDate:TicketInput.DueDate,
  AssignedUser:TicketInput.AssignedUser,
  SubCategoryID:TicketInput.SubCategoryID,
  CategoryID:TicketInput.CategoryID,
  PriorityID:TicketInput.PriorityID,
  attach:TicketInput.attach,
  LevelID:TicketInput.LevelID,
}


axios.put(`api/Tickets/${id}/update`, data).then(res=>{


if(res.data.status === 200)
{
swal("Updated Success");   
} if(res.data.status === 422)
{
swal("not Updated");   
}

});
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
            <Stepper activeStep={StatutActive} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {StatutActive === steps.length ? (
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
                        <Typography>{getStepContent(StatutActive)}</Typography>
                        <Box pt={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={StatutActive === 0}
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
                                {StatutActive === steps.length - 1
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
                <p>{RequestTypeInput}</p>
                </div>
                <div>
                <label className="font-weight-bold">Category:</label>
                <p>{CategoryInput}</p>
                </div>
                <div>
                <label className="font-weight-bold">Priority:</label>
                <p>{PriorityInput}</p>
                </div>
                <div>
                <label className="font-weight-bold">DueDate:</label>
                <p>{TicketInput.DueDate}</p>
                </div>
                    </Grid>
                    <Grid item lg={15} md={6} sm={12} xs={4} sx={{ mt: 2 }}>
                    <div>
                <label className="font-weight-bold">Agent:</label>
                <p>{UserInput}</p>
                </div>
                
                <div>
                <label className="font-weight-bold">Module:</label>
                <p>{SubCategoryInput}</p>
                </div>
                <div>
                <label className="font-weight-bold">Level:</label>
                <p>{LevelsInput}</p>
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
