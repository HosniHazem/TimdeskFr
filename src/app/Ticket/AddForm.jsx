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
    const [SubCategoryInput, setSubCategory] = useState({
        name:"",
        Is_Active:"Active",
        description:"",

        Is_Client_Visible:"Active",
        external_code:"",
        error_list: [],
    });
  
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

    

    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
       
        setSubCategory({...SubCategoryInput, [e.target.name]: e.target.value });
    }
    const AddSubCategory = (e) => {
    
       
        e.preventDefault();
        
       
            const  data = {
                name: SubCategoryInput.name,
                Is_Active: SubCategoryInput.Is_Active,
                description: SubCategoryInput.description,
     
                Is_Client_Visible:SubCategoryInput.Is_Client_Visible,
                external_code:SubCategoryInput.external_code,
                category_id:SubCategoryInput.category_id,
            }
      

    axios.post(`api/SubCategory/create`, data).then(res=>{
        if(res.data.status === 200)
        {
            
            swal("Created",SubCategoryInput.name,"success");
           history.push('/subcategory')
        }
        else if(res.data.status === 404)
        {
            swal("Error",SubCategoryInput.name,"error");
        }
        else if(res.data.status === 422)
        {
         
                     setSubCategory({...SubCategoryInput, error_list: res.data.validate_err });
        }
    });
}

  
  


  return (   
    
      <Container>
      <div>
    
          <ValidatorForm onSubmit={AddSubCategory} onError={() => null}>
              <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  
                <div class="form-group">
    <label for="exampleFormControlSelect1">Demander</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={SubCategoryInput.category_id}
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

                                          
                      
                
  <div class="form-group">
    <label for="exampleFormControlSelect1">Request type</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={RequestType.id}
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
                    
                   
                <div class="form-group">
    <label for="exampleFormControlSelect1">Category</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={SubCategoryInput.category_id}
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
                   
  <div class="form-group">
    <label for="exampleFormControlSelect1">Priority</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={Priority.id}
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
        label="Due date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider> 

                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div class="form-group">
    <label for="exampleFormControlSelect1">Technician</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={SubCategoryInput.category_id}
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
                <div class="form-group">
    <label for="exampleFormControlSelect1">Status</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={Status.id}
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

  <div class="form-group">
    <label for="exampleFormControlSelect1">Module</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={SubCategory.id}
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
  <div class="form-group">
    <label for="exampleFormControlSelect1">Level</label>
    <select
                        name="category_id"
                        className="form-control"
                        onChange={handleInput}
                        value={Levels.id}
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
                        <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={SubCategoryInput.name}  />
                        <span className="text-danger">{SubCategoryInput.error_list.name}</span>
                </div>


                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="name">Sujet</label>
                        <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={SubCategoryInput.name}  />
                        <span className="text-danger">{SubCategoryInput.error_list.name}</span>
                </div>
                {/* <Editor
    // value={this.state.content}
    init={{
      height: 500,
      menubar: false
    }}
    // onEditorChange={this.handleChange}
  /> */}
 <label htmlFor="exampleFormControlInput1" className="name">Description</label>
<MDBInput type="textarea"  rows="5" />
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
  <label htmlFor="exampleFormControlInput1" className="name">Solution</label>
<MDBInput type="textarea"  rows="5" />
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
