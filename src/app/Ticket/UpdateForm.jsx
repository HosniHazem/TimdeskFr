import React,{ useState,useEffect,Image } from "react";
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
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MDBInput } from "mdbreact";


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
  
    const [TicketInput, setTicket] = useState([]);
   
    const [value, setValue] = React.useState(null);

    useEffect(() => {
      axios.get(`api/Tickets/${id}/show`).then((res) => {
        if(res.data.status === 200){
        setTicket(res.data.Ticket);
        setValue(res.data.Ticket.DueDate);
   } else if(res.data.status === 404){
    
   }
      });
    }, [id]);

    const [Fich, setFich] = useState(TicketInput.attach);
  
const [Category, setCategory] = useState([]);

    useEffect(() => {
      axios.get('api/Category').then((res) => {
        if(res.status === 200){
        setCategory(res.data.Category);
   }
      });
    }, []);
   
    const [SubCategory, setsubCategory] = useState([]);

    useEffect(() => {
      axios.get('api/SubCategory').then((res) => {
        if(res.status === 200){
        setsubCategory(res.data.SubCategory);
   }
      });
    }, []);

    const [RequestType, setRequestType] = useState([]);

    useEffect(() => {
      axios.get('api/RequestType').then((res) => {
        if(res.status === 200){
        setRequestType(res.data.RequestType);
   }
      });
    }, []);
    
    const [Levels, setLevels] = useState([]);

    useEffect(() => {
      axios.get('api/Levels').then((res) => {
        if(res.status === 200){
        setLevels(res.data.Levels);
   }
      });
    }, []);
   
    const [Status, setStatus] = useState([]);

    useEffect(() => {
      axios.get('api/Status').then((res) => {
        if(res.status === 200){
        setStatus(res.data.Status);
   }
      });
    }, []);
    
    const [Priority, setPriority] = useState([]);

    useEffect(() => {
      axios.get('api/Priority').then((res) => {
        if(res.status === 200){
        setPriority(res.data.Priority);
   }
      });
    }, []);

    const [User, setUser] = useState([]);

    useEffect(() => {
      axios.get('api/User').then((res) => {
        if(res.status === 200){
        setUser(res.data.User);
   }
      });
    }, []);
    
  
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
        setTicket({...TicketInput, [e.target.name]: e.target.value });
    }
    const [picture,setPicture] = useState({
      attach:""
    });
    const [error,setError] = useState([]);
    const handleImage = (e) => {
      e.preventDefault();
      setPicture({attach : e.target.files[0]});
     
      setFich(e.target.files[0].name)
     
    
    }
    const updateTicket = (e) => {
    
      const formData = new FormData();
      formData.append('attach',picture.attach);
       axios.post('api/image',formData).then(res=>{
         if(res.status=== 200){
          
           setError(res.data.error);
    
         }
         else if (res.status=== 422){
           setError(res.data.error);
         }
       },
       )
       
        e.preventDefault();
        
       
            const  data = {
              Subject: TicketInput.Subject,
              Description:TicketInput.Description,
              EstimatedTime:TicketInput.EstimatedTime,
              EstimatedDate:TicketInput.EstimatedDate,
              StatusID:TicketInput.StatusID,
              RequestedUser:TicketInput.RequestedUser,
              RequestTypeID:TicketInput.RequestTypeID,
              SolutionDescription:TicketInput.SolutionDescription,
              DueDate:value,
              AssignedUser:TicketInput.AssignedUser,
              SubCategoryID:TicketInput.SubCategoryID,
              CategoryID:TicketInput.CategoryID,
              PriorityID:TicketInput.PriorityID,
              attach:Fich,
              LevelID:TicketInput.LevelID,
            }
        

    axios.put(`api/Tickets/${id}/update`, data).then(res=>{
        
      
        if(res.data.status === 200)
        {
            swal("Updated","Ticket","success");
            
           history.push('/ticket')
        } if(res.data.status === 422)
        {
            swal("All fields are mandetory","","error");
    
        }
        else if(res.data.status === 404)
        {
            swal("Error","Ticket","error");
    
        }
    });
}

  
  



  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={updateTicket} onError={() => null} encType="multipart/form-data">
              <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  
                <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Demander</label>
    <select
                        name="RequestedUser"
                        className="form-control"
                        defaultValue={TicketInput.RequestedUser}
                      >
                         <option value={TicketInput.RequestedUser}>
                              {TicketInput.RequestedUser}
                            </option>
                      </select>
  </div>

  {/* <IMG
                                    src={`http://localhost:8000/images/uploads/${TicketInput.attach}`}
                                    alt=""
                                /> */}
           
                
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Request type</label>
    <select
                        name="RequestTypeID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.RequestTypeID}
                      >
                        <option value="DEFAULT"></option>
                        {RequestType.map((item,index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
  </div>
                    
                   
                <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Category</label>
    <select
                        name="CategoryID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.CategoryID}
                      >
                        <option value="DEFAULT"></option>
                        {Category.map((item,index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
  </div>
                   
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Priority</label>
    <select
                        name="PriorityID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.PriorityID}
                      >
                        <option value="DEFAULT"></option>
                        {Priority.map((item,index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
  </div>
 
  <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="DueDate"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider> 

                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Agent</label>
    <select
                        name="AssignedUser"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.AssignedUser}
                      >
                        <option value="DEFAULT"></option>
                        {User.map((item,index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
  </div>
                <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Status</label>
    <select
                        name="StatusID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.StatusID}
                      >
                        <option value="DEFAULT"></option>
                        {Status.map((item,index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
  </div>

  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Module</label>
    <select
                        name="SubCategoryID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.SubCategoryID}
                      >
                        <option value="DEFAULT"></option>
                        {SubCategory.map((item,index) => {
                          if((item.category_id==TicketInput.CategoryID))
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Level</label>
    <select
                        name="LevelID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.LevelID}
                      >
                        <option value="DEFAULT"></option>
                        {Levels.map((item,index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
  </div>
  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Estimated Time</label>
                        <input type="text" name="EstimatedTime" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1" value={TicketInput.EstimatedTime}  />
                       
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="name">Estimated Date</label>
                        <input type="text" name="EstimatedDate" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1" value={TicketInput.EstimatedDate}  />
                       
                </div>

                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="name">Sujet</label>
                        <input type="text" name="Subject" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1" value={TicketInput.Subject}  />
                        
                </div>

 <label htmlFor="exampleFormControlInput1" >Description</label>
<MDBInput type="textarea" name="Description"  value={TicketInput.Description} onChange={handleInput}  rows="5" />
<div className="mb-5">

<Button 
className="bg-secondary"
  variant="contained"
  component="label"
 
 
>
  Upload File
  <input
    type="file"
    name="attach"
    onChange={handleImage}
    hidden
  />
  
</Button>

<div className="font-weight-bold">{Fich}</div>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1"  >Solution</label>
<MDBInput type="textarea" name="SolutionDescription" value={TicketInput.SolutionDescription} onChange={handleInput}  rows="5" />
</div>
                  </Grid>
              </Grid>
           
              
              <Button color="primary" variant="contained" type="submit">
                  <IMG
                                    src="/assets/send.png"
                                    alt=""
                                />
                  <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                      Update
                  </Span>
              </Button>
          </ValidatorForm>
      </div>
      </Container>
  )
}
