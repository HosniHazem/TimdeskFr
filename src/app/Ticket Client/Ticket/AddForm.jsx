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
import { MDBInput } from "mdbreact";
import AuthUser from '../../Session/AuthUser';
import moment from "moment";

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

   let info1 = sessionStorage.getItem("token");
   
  const token = JSON.parse(info1);  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let info = sessionStorage.getItem("user");
    const userInfo = JSON.parse(info);
    const [value, setValue] = React.useState(null);
    const [TicketsInput, setTickets] = useState({
      Subject:null,
      Description:null,
      RequestTypeID:null,
      SolutionDescription:null,
      DueDate:null,
      EstimatedTime:null,
      EstimatedDate:null,
      StatusID:null,
      RequestedUser:null,
      AssignedUser:null,
      SubCategoryID:null,
      CategoryID:null,
      PriorityID:null,
      LevelID:null,
      attach:null,
      Organization:null,
      Username:null,
      error_list: [],
      });

      
    var min=moment().format("YYYY-MM-DD")
        
    
    const [Category, setCategory] = useState([]);

    useEffect(() => {
      axios.get('api/Category').then((res) => {
        if(res.status === 200){
        setCategory(res.data.Category);
   }
      });
    }, []);
    if(Category===undefined){
      sessionStorage.clear();
      window.location.reload();
    }
   
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



    const [Fich, setFich] = useState(null);
    

const [picture,setPicture] = useState({
  attach:""
});
const [error,setError] = useState([]);
const handleImage = (e) => {
  e.preventDefault();
  setPicture({attach : e.target.files[0]});
 
  setFich(e.target.files[0].name)
 
}

    const AddTickets = (e) => {
      if(Fich!=null){
      const formData = new FormData();
  formData.append('attach',picture.attach);
   axios.post('api/imageProfil',formData).then(res=>{
     if(res.status=== 200){
      
       setError(res.data.error);

     }
     else if (res.status=== 422){
       setError(res.data.error);
     }
   },
   )
  }  
        e.preventDefault();
        
       
            const  data = {
                Subject: TicketsInput.Subject,
                Description:TicketsInput.Description,
                EstimatedTime:TicketsInput.EstimatedTime,
                EstimatedDate:TicketsInput.EstimatedDate,
                StatusID:TicketsInput.StatusID,
                RequestedUser:userInfo.id,
                DueDate:value,
                RequestTypeID:TicketsInput.RequestTypeID,
                AssignedUser:TicketsInput.AssignedUser,
                SubCategoryID:TicketsInput.SubCategoryID,
                CategoryID:TicketsInput.CategoryID,
                PriorityID:TicketsInput.PriorityID,
                attach:Fich,
                LevelID:TicketsInput.LevelID,
                Organization:userInfo.organization,
                Username:userInfo.name  
            }
console.log(data)
    axios.post(`api/Tickets/create`, data).then(res=>{
        if(res.data.status === 200)
        {
            
            swal("Created","Ticket","success");
           history.push('/client/ticket')
        }
        else if(res.data.status === 404)
        {
            swal("Error",TicketsInput.name,"error");
        }
        else if(res.data.status === 422)
        {
          swal("All fields are mandetory","","error");
          setTickets({...TicketsInput, error_list: res.data.validate_err });  
        }
    });
 
}

  
  


  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={AddTickets} onError={() => null} encType="multipart/form-data">
              <Grid container spacing={3}>
                  <Grid item lg={6.5} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  
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
                          if(item.Is_Active==="Active")
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <span className="text-danger">{TicketsInput.error_list.RequestTypeID}</span>
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
                          if(item.Is_Active==="Active")
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <span className="text-danger">{TicketsInput.error_list.CategoryID}</span>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">SubCategory</label>
    <select
                        name="SubCategoryID"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketsInput.SubCategoryID}
                      >
                        <option value="DEFAULT"></option>
                        {SubCategory.map((item,index) => {
                          if((item.category_id==TicketsInput.CategoryID)&&(item.Is_Active==="Active"))
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <span className="text-danger">{TicketsInput.error_list.SubCategoryID}</span>
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
                          if(item.Is_Active==="Active")
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <span className="text-danger">{TicketsInput.error_list.PriorityID}</span>
  </div>
 
  <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="DueDate"
        minDate={new Date(min)}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider> 
    <span className="text-danger">{TicketsInput.error_list.DueDate}</span>
                
                  </Grid>

                 

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="name">Subject</label>
                        <input type="text" name="Subject" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1" value={TicketsInput.Subject}  />
                        <span className="text-danger">{TicketsInput.error_list.Subject}</span>
                </div>

 <label htmlFor="exampleFormControlInput1" >Description</label>
<MDBInput type="textarea" name="Description"  value={TicketsInput.Description} onChange={handleInput}  rows="5" />
<span className="text-danger">{TicketsInput.error_list.Description}</span>
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

                  </Grid>
                  <div/>
              </Grid>
           
              
              <Button color="primary" variant="contained" type="submit" >
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
