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
import AuthUser from '../../Session/AuthUser';


 

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
 
  

  export default function SimpleForm () {
let info = sessionStorage.getItem("token");
   
  const token = JSON.parse(info);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
              <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Name</label>
                        <input type="text" name="name" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={SubCategoryInput.name}  />
                        <span className="text-danger">{SubCategoryInput.error_list.name}</span>
                </div>
                

                                          
                      
                <label htmlFor="exampleFormControlInput1" className="Is_Active">Is Active</label>
                      <div className="input-group mb-3">
                    <label className="input-group-text" name="Is_Active" htmlFor="inputGroupSelect01">{SubCategoryInput.Is_Active}</label>
                    <select className="form-select" name="Is_Active" value={SubCategoryInput.Is_Active} onChange={handleInput} id="inputGroupSelect01">
                    <option defaultValue value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    
                    </select>
                    <span className="text-danger">{SubCategoryInput.error_list.Is_Active}</span>
                     </div>


                
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                        <input type="text" name="description" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={SubCategoryInput.description}/>
                        <span className="text-danger">{SubCategoryInput.error_list.description}</span>
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


                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="external_code">External Code</label>
                        <input type="text" name="external_code" onChange={handleInput}  className="form-control" id="exampleFormControlInput1" value={SubCategoryInput.external_code}  />
                        <span className="text-danger">{SubCategoryInput.error_list.external_code}</span>
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
