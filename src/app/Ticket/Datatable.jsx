
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
  const [Priority, setPriority] = useState([]);
  const [Levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loadingL, setLoadingL] = useState(false)

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
                Status:n.StatusID,
                Applicant:n.RequestedUser,
                SolutionDescription:n.SolutionDescription,
                DueDate:moment(n.DueDate).format("HH:mm DD/MM/YYYY"),
                AssignedUser:n.AssignedUser,
                SubCategoryID:n.SubCategoryID,
                CategoryID:n.CategoryID,
                Priority:n.PriorityID,
                TicketAttachment:n.TicketAttachment,
                Levels:n.LevelID,
                CreatedDate:moment(n.updated_at).format("DD/MM/YYYY"),
     }
    );
    
 
 })
 
  
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
    if(loading===false){

          axios.get(`api/Priority/${params.row.Priority}/show`).then((res) => {
            if(res.data.status === 200){
              setPriority(res.data.Priority);
       } else if(res.data.status === 404){
        
       }
          });
          setLoading(true);
        }
        return (
        
         
          <div>
       
              <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: Priority.color,
                
              }}
              
            /><span style={{textAlign: 'right'}}>{Priority.name}</span>
            

     
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
        var num=0;
      console.log("salem")

        


          axios.get(`api/Levels`).then((res) => {
            if((res.data.status === 200)&&(res.data.Levels.id===params.row.Levels)){
              setLevels(res.data.Levels);
              
       } else if(res.data.status === 404){
        
       }
          });
    
          
        
        return (
        
         
          <div>
       
              <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: Levels.color,
                
              }}
              
            /><span style={{textAlign: 'right'}}>{Levels.name}</span>
            

     
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
            <Link to={`/Tickets/current/${params.row.id}`} style={{ textDecoration: "none" }}>
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
