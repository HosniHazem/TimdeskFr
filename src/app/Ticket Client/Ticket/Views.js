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
import AuthUser from '../../Session/AuthUser';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { pickBy } from 'lodash'



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

const customIcons = {
  5: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  4: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  2: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  1: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}



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
  const [loading, setloading] = useState(true) 
  const [Clicked, setClicked] = React.useState(false);
 let info = sessionStorage.getItem("token");
   
  const token = JSON.parse(info);  
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [StatutActive, setStatutActive] = React.useState();
  const [TicketInput, setTicket] = useState([]);
  const [RateInput, setRate] = useState(2);
  
  useEffect(() => {
    axios.get(`api/Tickets/${id}/show`).then((res) => {
      if(res.data.status === 200){
      setTicket(res.data.Ticket);
      setloading(false)
      
 } else if(res.data.status === 404){
  
 }
    });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setTicket({...TicketInput, [e.target.name]: e.target.value });
    
    setClicked(true)  
  }
  console.log(TicketInput.rate)
if(Clicked){
  const  data = {
    Subject: TicketInput.Subject,
    Description:TicketInput.Description,
    EstimatedTime:TicketInput.EstimatedTime,
    EstimatedDate:TicketInput.EstimatedDate,
    StatusID:TicketInput.StatusID,
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
    Organization:TicketInput.Organization,
    SpentTime:TicketInput.SpentTime,
    StatusCloseReason:TicketInput.StatusCloseReason,
    ClosedDate:TicketInput.ClosedDate,
    TicketClose:TicketInput.TicketClose ,
    rate:Number(TicketInput.rate),
  }
  axios.put(`api/Tickets/${id}/update`, data).then(res=>{


    if(res.data.status === 200)
    {
     
     
    } if(res.data.status === 422)
    {
      swal("not Updated");   
    }
   
  });
}

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
     if(n.Is_Active==="Active")
      return ( 
       
      
 
          n.name
        
    
     
       );
       
    
    })
    const cleanedObject = Object.values(pickBy(dataRows, v => v !== undefined))
   

  const [open, setOpen] = React.useState(false);
 
 var i=0
  const handleClickOpen = () => {
    setOpen(true);
    if(TicketInput){
      if(TicketInput.priority!=null){
      setPriority(TicketInput.priority.name)
      }
      if(TicketInput.users!=null){
        setUser(TicketInput.users.name)
      }
      if(TicketInput.levels!=null){
        setLevels(TicketInput.levels.name)
      }
      if(TicketInput.category!=null){
        setCategory(TicketInput.category.name)
      }
        if(TicketInput.request_types!=null){
        setRequestType(TicketInput.request_types.name)
        }
        if(TicketInput.sub_category!=null){
        setSubCategory(TicketInput.sub_category.name)
        }
        if(TicketInput.status!=null){
          setStatutActive(TicketInput.status.id-1)
            }
  if(StatutActive){
    if(TicketInput.status!=null){
     i=TicketInput.status.id-1
    }
  }
    }
  };
  const handleClose = () => {
    setOpen(false);
    if(Clicked){
      window.location.reload();
    }
  };



  const steps = cleanedObject;

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
        Organization:TicketInput.Organization,
        rate:TicketInput.rate,
      }
  


  }

  const handleBack = () => {
      setStatutActive((prevActiveStep) => prevActiveStep - 1)
      const  data = {
        Subject: TicketInput.Subject,
        Description:TicketInput.Description,
        EstimatedTime:TicketInput.EstimatedTime,
        EstimatedDate:TicketInput.EstimatedDate,
        StatusID:TicketInput.StatusID,
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
        Organization:TicketInput.Organization,
        SpentTime:TicketInput.SpentTime,
        StatusCloseReason:TicketInput.StatusCloseReason,
        ClosedDate:TicketInput.ClosedDate,
        TicketClose:TicketInput.TicketClose ,
        rate:TicketInput.rate,
      }
  
  }

  const handleReset = () => {
      setStatutActive(1)

  }

  if(!loading)
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
                {TicketInput.TicketClose==="1"
                ?
                <>
                <label className="font-weight-bold">Rate the Agent:</label>
                <Rating
      name="rate"
      onChange={handleInput}
      value={TicketInput.rate}
      IconContainerComponent={IconContainer}
      highlightSelectedOnly
    />
    </>
    :
    <>
    <label className="font-weight-bold">Rate the Agent:</label>
    <Rating
      name="rate"
      onChange={handleInput}
      disabled
      value={TicketInput.rate}
      IconContainerComponent={IconContainer}
      highlightSelectedOnly
    />
    </>
  }
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
                    <Grid item  lg={15} md={6} sm={12} xs={6} sx={{ mt: 2 }}>
                     
                     <div>
                     <label className="font-weight-bold" >Close Reason:</label>
                     <p>{TicketInput.StatusCloseReason}</p>
                     </div>
                     <div>
                     <label className="font-weight-bold">Ticket Spent Time(H):</label>
                     <p>{TicketInput.SpentTime}</p>
                     </div>
                     <div>
                     <label className="font-weight-bold">Close Date and Time:</label>
                     <p>{TicketInput.ClosedDate}</p>
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
