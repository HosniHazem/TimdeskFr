
import React,{ useState,useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from './datatablesource';
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import Box from '@mui/material/Box';

const http = axios.create({
  baseURL:"http://localhost:8000/api",
  headers:{
      "Content-type" : "application/json",
  }
});


const Datatable = () => {
  
  const [Tickets, setTickets] = useState([]);

 useEffect(() => {
   axios.get('api/Tickets').then((res) => {
     if(res.status === 200){
     setTickets(res.data.Ticket);
}
   });
 }, []);


 var dataRows = "";
       
 dataRows = Tickets.map((n) =>{
   return ( 
    
     {
                id: n.id,
                Sujet: n.Subject,
                Description:n.Description,
                RequestTypeID:n.RequestTypeID,
                EstimatedTime:n.EstimatedTime,
                Status:n.status.name,
                Applicant:n.RequestedUser,
                SolutionDescription:n.SolutionDescription,
                DueDate:moment(n.DueDate).format("DD/MM/YYYY"),
                AssignedUser:n.users.name,
                SubCategoryID:n.SubCategoryID,
                CategoryID:n.CategoryID,
                PriorityName:n.priority.name,
                PriorityColor:n.priority.color,
                TicketAttachment:n.TicketAttachment,
                LevelsName:n.levels.name,
                LevelsColor:n.levels.color,
                CreatedDate:moment(n.updated_at).format("DD/MM/YYYY"),

     }
    );
    
 
 })
 
console.log(dataRows)
  
  const handleDelete = async (e,id) => {

    e.preventDefault();
     await http.delete(`Tickets/${id}/delete`).then(res=>{
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

  const PriorityColumn = [
    
    {
      field: "Priority",
      headerName: "Priority",
      width: 110,
      renderCell: (params) => {
  
        return (
        
         
          <div>
       
              <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: params.row.PriorityColor,
                
              }}
              
            /><span style={{textAlign: 'right'}}>{params.row.PriorityName}</span>
            

     
</div>
         
        );  
      },
    },

  ];



  const LevelsColumn = [
    
    {
      field: "Levels",
      headerName: "Levels",
      width: 110,
      renderCell: (params) => {
        return (
        
         
          <div>
       
       <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: params.row.LevelsColor,
                
              }}
              
            /><span style={{textAlign: 'right'}}>{params.row.LevelsName}</span>
            

     
</div>
         
         
        );  
      },
    },

  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/ticket/current/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Add New Tickets
        <Link to="/ticket/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={dataRows}
        columns={userColumns.concat(PriorityColumn,LevelsColumn,actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    

  );
};

export default Datatable;
