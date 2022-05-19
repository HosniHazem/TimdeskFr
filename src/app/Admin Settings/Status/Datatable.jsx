
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
   
    {
      id: n.id,
      Name: n.name,
      Description: n.description,
      UpadatedDate: moment(n.updated_at).format("DD/MM/YYYY"),
      Is_Active: n.Is_Active,

      Is_Closed:n.Is_Closed,
      Is_Client_Visible:n.Is_Client_Visible,

    }
   );
   

})


  
  const handleDelete = async (e,id) => {

    e.preventDefault();
     await http.delete(`Status/${id}/delete`).then(res=>{
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
            <Link to={`/Status/current/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Add New Status
        <Link to="/status/new" className="link">
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
