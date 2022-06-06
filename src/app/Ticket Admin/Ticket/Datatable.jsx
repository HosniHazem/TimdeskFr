
import React,{ useState,useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from './datatablesource';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import Box from '@mui/material/Box';
import CustomizedDialogs from './Views'
import AuthUser from '../../Session/AuthUser';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

let info = sessionStorage.getItem("user");
    const userInfo = JSON.parse(info);
    const override = css`
    display: block;
    margin: auto;
    border-color: #5b47fb;
    text-align: center;
  `;
const Datatable = () => {
  let [loading, setLoading] = useState(true);
  const {http,token} = AuthUser()  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [Tickets, setTickets] = useState([]);

 useEffect(() => {
   axios.get('api/Tickets').then((res) => {
     if(res.status === 200){
     setTickets(res.data.Ticket);
     setLoading(false)
}
   });
 }, []);

console.log(Tickets)
 var dataRows = "";
var status="" 
var levels=""
var levelsC="" 
var Requser=""  
var Etime=""
 dataRows = Tickets.map((n) =>{
   if(n.users!=null){
    if(n.status!=null){
      status=n.status.name
        }
        if(n.levels!=null){ 
      levels=n.levels.name
      levelsC=n.levels.color
        }
  Requser=n.users.name
  Etime=EstimatedTime
}else{
  Requser=null
  status=null
  levels=null
  levelsC=null
  Etime=null
}
   return ( 
    
     {
                id: n.id,
                Sujet: n.Subject,
                Description:n.Description,
                RequestTypeID:n.RequestTypeID,
                EstimatedTime:Etime,
                Status:status,
                Applicant:n.RequestedUser,
                SolutionDescription:n.SolutionDescription,
                DueDate:moment(n.DueDate).format("DD/MM/YYYY"),
                AssignedUser:Requser,
                
                SubCategoryID:n.SubCategoryID,
                CategoryID:n.CategoryID,
                PriorityName:n.priority.name,
                PriorityColor:n.priority.color,
                TicketAttachment:n.TicketAttachment,
                LevelsName:levels,
                LevelsColor:levelsC,
                CreatedDate:moment(n.updated_at).format("DD/MM/YYYY"),
                TicketClose:n.TicketClose,
                Organization:n.Organization,
                

     }
    );
    
 
 })

 


  
  const handleDelete = async (id,e) => {

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
  const [NewInput, setNew] = useState([]);
  var Category=""
  var  Subject=""
  var  Description=""
  var EstimatedTime=""
  var EstimatedDate=""
  var StatusID=""
  var RequestedUser=""
  var RequestTypeID=""
  var SolutionDescription=""
  var DueDate=""
  var AssignedUser=""
  var SubCategoryID=""
  var CategoryID=""
  var PriorityID=""
  var attach=""
  var LevelID="";
  var TicketClose="";
  var Organization="";
  const history = useHistory();
  const handlePick = async (id,e) => {
  
    
    console.log(id)


    await axios.get(`api/Tickets/${id}/show`).then((res) => {
      if(res.data.status === 200){
        setNew(res.data.Ticket);
        Subject=res.data.Ticket.Subject
        Description=res.data.Ticket.Description
        EstimatedTime=res.data.Ticket.EstimatedTime
        EstimatedDate=res.data.Ticket.EstimatedDate
        StatusID=res.data.Ticket.StatusID
        RequestedUser=res.data.Ticket.RequestedUser
        RequestTypeID=res.data.Ticket.RequestTypeID
        SolutionDescription=res.data.Ticket.SolutionDescription
        DueDate=res.data.Ticket.DueDate
        SubCategoryID=res.data.Ticket.SubCategoryID
        CategoryID=res.data.Ticket.CategoryID
        PriorityID=res.data.Ticket.PriorityID
        attach=res.data.Ticket.attach
        LevelID=res.data.Ticket.LevelID
        TicketClose=res.data.Ticket.TicketClose
        Organization=res.data.Ticket.Organization
 } else if(res.data.status === 404){
  
 }
    });
      
  const dataU = {
    Subject: Subject,
    Description:Description,
    EstimatedTime:EstimatedTime,
    EstimatedDate:EstimatedDate,
    StatusID:StatusID,
    RequestedUser:RequestedUser,
    RequestTypeID:RequestTypeID,
    SolutionDescription:SolutionDescription,
    DueDate:DueDate,
    AssignedUser:userInfo.id,
    SubCategoryID:SubCategoryID,
    CategoryID:CategoryID,
    PriorityID:PriorityID,
    attach:attach,
    LevelID:LevelID,
    TicketClose:TicketClose,
    Organization:Organization,
  }

axios.put(`api/Tickets/${id}/update`, dataU).then(res=>{


if(res.data.status === 200)
{
    swal("Picked Successfully");
   history.push(`/ticket/current/${id}`)
} 

});
  };

  const PriorityColumn = [
    
    {
      field: "Priority",
      headerName: "Priority",
      width: 90,
      renderCell:  (params) => {
  
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
      width: 90,
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
      width: 300,
      
      renderCell: (params) => {
       
       
     

       var id=params.row.id
        return (
          <div className="cellAction">
       { params.row.AssignedUser===null 
           
           ?
           
           (
           <div
              className="PickButton"
              onClick={
             
               (e) => handlePick(id,e)
             } 
            >
              
              Pick Up
            </div>
            )
          :
          
            params.row.TicketClose===null
          ?
          (
            <div
              className="PiButton"
              
              
              
            >
              
              Picked
            </div>
            )
            :
            (
              <div
                className="PickedButton"
                
                
                
              >
                
                Closed
              </div>
              )    }
            {CustomizedDialogs(id)}
            <Link to={`/ticket/current/${id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={(e) => handleDelete(id,e)}
              
              
            >
              
              Delete
            </div>
            
          </div>
          
        );
      
      },
    },
  ];
  if(loading)
  return(
    <div className="load">
<ClipLoader color={"rgb(4, 107, 38)"} loading={loading} textAlign="center" css={override} size={60}  />
</div>
  )
  else
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
        
      />
      
    </div>
    

  );
};

export default Datatable;
