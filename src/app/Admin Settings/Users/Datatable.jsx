
import React,{ useState,useEffect } from "react";
import "./datatableU.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from './datatablesource';
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import AuthUser from '../../Session/AuthUser';
import { pickBy } from 'lodash'

 




const Datatable = () => {
  let info = sessionStorage.getItem("token");
   
  const token = JSON.parse(info);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [User, setUser] = useState([]);

 useEffect(() => {
   axios.get('api/User').then((res) => {
     if(res.status === 200){
     setUser(res.data.User);
}
   });
 }, []);
 if(User===undefined){
  sessionStorage.clear();
  window.location.reload();
}

 var dataRows = "";
       
 dataRows = User.map((n) =>{
   var role=""
   if(n.RoleID==="1"){
    role="Admin"         
 }else if (n.RoleID==="2"){
     role="Agent"
 }else(
  role=""
 )
 if (n.RoleID!="3")
   return ( 
    
     {
       id: n.id,
       Name: n.name,
       Role: role,
       UpadatedDate: moment(n.updated_at).format("DD/MM/YYYY"),
       Is_Active: n.Is_Active,
       Email:n.email,
       Organization:n.organization,
       
     }
    );
    
 
 })
 
 const cleanedObject = Object.values(pickBy(dataRows, v => v !== undefined))

  
  const handleDelete = async (e,id) => {

    e.preventDefault();
     await axios.delete(`api/User/${id}/delete`).then(res=>{
      if(res.status === 200)
        {
          
            swal("Deleted!",res.data.message,"success");
            window.location.reload();
        }
        else if(res.data.status === 404)
        {
            swal("Error",res.data.message,"error");
            
        }
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/User/current/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={(e) => {
                if (
                  window.confirm(
                    'Do you want to delete it?'
                  )
                ) {
                  handleDelete(e, params.row.id);
                }
              }}
              
              
            >
              
              Delete
            </div>
            
          </div>
          
        );
       
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/User/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={cleanedObject}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
    </div>
  );
};

export default Datatable;
