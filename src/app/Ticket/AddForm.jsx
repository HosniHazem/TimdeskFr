import React,{ useState,useEffect } from "react";
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
import moment from 'moment';
import { MDBInput } from "mdbreact";
import AuthUser from '../Session/AuthUser';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))
const IMG = styled('img')(() => ({
    width: '30%',
  }))
 

  
  
  export default function SimpleForm () {
    const [value, setValue] = React.useState(null);
    const [TicketsInput, setTickets] = useState({
      Subject:"",
      Description:"",
      RequestTypeID:"",
      SolutionDescription:"",
      DueDate:"",
      EstimatedTime:"",
      EstimatedDate:"",
      StatusID:"",
      RequestedUser:"",
      AssignedUser:"",
      SubCategoryID:"",
      CategoryID:"",
      PriorityID:"",
      LevelID:"",
      TicketAttachment:"",
    });
    let info = sessionStorage.getItem("user");
    const userInfo = JSON.parse(info);
        const {http} = AuthUser();
        const [userdetail,setUserdetail] = useState('');
    
        
    
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
       
        setTickets({...TicketsInput, [e.target.name]: e.target.value });
    }
    const AddTickets = (e) => {
    
       
        e.preventDefault();
        
       
            const  data = {
                Subject: TicketsInput.Subject,
                Description:TicketsInput.Description,
                EstimatedTime:TicketsInput.EstimatedTime,
                EstimatedDate:TicketsInput.EstimatedDate,
                StatusID:TicketsInput.StatusID,
                RequestedUser:userInfo.name,
                SolutionDescription:TicketsInput.SolutionDescription,
                DueDate:value,
                RequestTypeID:TicketsInput.RequestTypeID,
                AssignedUser:TicketsInput.AssignedUser,
                SubCategoryID:TicketsInput.SubCategoryID,
                CategoryID:TicketsInput.CategoryID,
                PriorityID:TicketsInput.PriorityID,
                TicketAttachment:TicketsInput.TicketAttachment,
                LevelID:TicketsInput.LevelID,
            }
      
console.log(data)
    axios.post(`api/Tickets/create`, data).then(res=>{
        if(res.data.status === 200)
        {
            
            swal("Created","Ticket","success");
           history.push('/ticket')
        }
        else if(res.data.status === 404)
        {
            swal("Error",TicketsInput.name,"error");
        }
        else if(res.data.status === 422)
        {
         
                     setTickets({...TicketsInput });
        }
    });
 
}

  
  


  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={AddTickets} onError={() => null}>
              <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  
                <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Demander</label>
    <select
                        name="RequestedUser"
                        className="form-control"
                        defaultValue={userInfo.name}
                      >
                         <option value={userInfo.name}>
                              {userInfo.name}
                            </option>
                      </select>
  </div>

                                          
                      
                
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Request type</label>
    <select
                        name="RequestTypeID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketsInput.RequestTypeID}
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
                        value={TicketsInput.CategoryID}
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
                        value={TicketsInput.PriorityID}
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
                        value={TicketsInput.AssignedUser}
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
                        value={TicketsInput.StatusID}
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
                        value={TicketsInput.SubCategoryID}
                      >
                        <option value="DEFAULT"></option>
                        {SubCategory.map((item,index) => {
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
                        value={TicketsInput.LevelID}
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
                        <input type="text" name="EstimatedTime" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1" value={TicketsInput.EstimatedTime}  />
                       
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="name">Estimated Date</label>
                        <input type="text" name="EstimatedDate" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1" value={TicketsInput.EstimatedDate}  />
                       
                </div>

                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="name">Sujet</label>
                        <input type="text" name="Subject" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1" value={TicketsInput.Subject}  />
                        
                </div>

 <label htmlFor="exampleFormControlInput1" >Description</label>
<MDBInput type="textarea" name="Description"  value={TicketsInput.Description} onChange={handleInput}  rows="5" />
<div className="mb-5">

<Button 
className="bg-secondary"
  variant="contained"
  component="label"
 
 
>
  Upload File
  <input
    type="file"
    hidden
  />
  
</Button>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1"  >Solution</label>
<MDBInput type="textarea" name="SolutionDescription" value={TicketsInput.SolutionDescription} onChange={handleInput}  rows="5" />
</div>
                  </Grid>
              </Grid>
           
              
              <Button color="primary" variant="contained" type="submit">
                  <IMG
                                    src="/assets/send.png"
                                    alt=""
                                />
                  <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                      ADD
                  </Span>
              </Button>
          </ValidatorForm>
      </div>
      </Container>
  )
}
