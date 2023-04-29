
import React,{ useState,useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from './datatablesource';
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import AuthUser from '../../Session/AuthUser';


  

const Datatable = () => {
 let info = sessionStorage.getItem("token");
   
  const token = JSON.parse(info);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [RequestType, setRequestType] = useState([]);

 useEffect(() => {
   axios.get('api/RequestType').then((res) => {
     if(res.status === 200){
     setRequestType(res.data.RequestType);
}
   });
 }, []);
 if(RequestType===undefined){
  sessionStorage.clear();
  window.location.reload();
}

 var dataRows = "";
       
 dataRows = RequestType.map((n) =>{
   return ( 
    
     {
       id: n.id,
       Name: n.name,
       Description: n.description,
       UpadatedDate: moment(n.updated_at).format("DD/MM/YYYY"),
       Is_Active: n.Is_Active,
   
       Is_Client_Visible:n.Is_Client_Visible,
     }
    );
    
 
 })


console.log(dataRows)
  
  const handleDelete = async (e,id) => {

    e.preventDefault();
     await axios.delete(`api/RequestType/${id}/delete`).then(res=>{
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
            <Link to={`/RequestType/current/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Add New RequestType
        <Link to="/RequestType/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={dataRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
    </div>
  );
};

export default Datatable;
