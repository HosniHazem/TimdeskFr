
import React,{ useState,useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from '../Levels/datatablesource';
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

const http = axios.create({
  baseURL:"http://localhost:8000/api",
  headers:{
      "Content-type" : "application/json",
  }
});


const Datatable = () => {
  
  const [levels, setlevels] = useState([]);

 useEffect(() => {
   axios.get('api/Levels').then((res) => {
     if(res.status === 200){
     setlevels(res.data.Levels);
}
   });
 }, []);


var dataRows = "";
       
dataRows = levels.map((n) =>{
  return ( 
   
    {
      id: n.id,
      Name: n.name,
      Description: n.description,
      UpadatedDate: n.updated_at,
      Is_Active: n.Is_Active,
      Is_Defaults: n.Is_Defaults,
    }
   );
   

})


  
  const handleDelete = async (e,id) => {

    e.preventDefault();
     await http.delete(`Levels/delete/${id}`).then(res=>{
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/levels/current/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Add New Level
        <Link to="/levels/new" className="link">
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
