
import React,{ useState,useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from './datatablesource';
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';


const http = axios.create({
  baseURL:"http://localhost:8000/api",
  headers:{
      "Content-type" : "application/json",
  }
});


const Datatable = () => {
  
  const [User, setUser] = useState([]);

 useEffect(() => {
   axios.get('api/User').then((res) => {
     if(res.status === 200){
     setUser(res.data.User);
}
   });
 }, []);


 var dataRows = "";
       
 dataRows = User.map((n) =>{
   return ( 
    
     {
       id: n.id,
       Name: n.name,
       Role: n.RoleID,
       UpadatedDate: moment(n.updated_at).format("DD/MM/YYYY"),
       Is_Active: n.Is_Active,
       Email:n.email,
       Organization:n.organization,
     }
    );
    
 
 })
 

console.log(dataRows)
  
  const handleDelete = async (e,id) => {

    e.preventDefault();
     await http.delete(`User/${id}/delete`).then(res=>{
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
              onClick={(e) => handleDelete(e, params.row.id)}
              
              
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
        rows={dataRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
