import React,{ useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useHistory,useParams} from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import swal from 'sweetalert';
import AuthUser from '../../Session/AuthUser';
export default function FormD() {
  let info = sessionStorage.getItem("user");
   
 let info1 = sessionStorage.getItem("token");
   
  const token = JSON.parse(info1);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [open, setOpen] = React.useState(true);
  const { id } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInput = (e) => {
    e.persist();
    setTicket({...TicketInput, [e.target.name]: e.target.value });
}

const [TicketInput, setTicket] = useState([]);

var min=moment().format("YYYY-MM-DD HH:mm")

useEffect(() => {
  axios.get(`api/Tickets/${id}/show`).then((res) => {
    if(res.data.status === 200){
    setTicket(res.data.Ticket);
} else if(res.data.status === 404){

}
  });
}, [id]);

var R=Number(TicketInput.RequestedUser)
const [userdetail, setuserdetail] = useState([]);
useEffect(() => {
  axios.get(`api/User/${R}/show`).then((res) => {
    if(res.status === 200){
      setuserdetail(res.data.User);
      
} else if(res.status === 404){

}
  });
}, [R]);
const history = useHistory();

  const submit = () => {

    const  data = {
      Subject: TicketInput.Subject,
      Description:TicketInput.Description,
      EstimatedTime:TicketInput.EstimatedTime,
      EstimatedDate:TicketInput.EstimatedDate,
      StatusID:TicketInput.StatusID,
      RequestedUser:TicketInput.RequestedUser,
      RequestTypeID:TicketInput.RequestTypeID,
      SolutionDescription:TicketInput.SolutionDescription,
      DueDate:TicketInput.DueDate,
      AssignedUser:TicketInput.AssignedUser,
      SubCategoryID:TicketInput.SubCategoryID,
      CategoryID:TicketInput.CategoryID,
      PriorityID:TicketInput.PriorityID,
      attach:TicketInput.attach,
      LevelID:TicketInput.LevelID,
      Organization:TicketInput.Organization,
      SpentTime:TicketInput.SpentTime,
      StatusCloseReason:TicketInput.StatusCloseReason,
      Username:TicketInput.Username,
      ClosedDate:min,
      TicketClose: "1",
    }
 
  if(userdetail){
    const  userdata = {
      name: userdetail.name,
      email: userdetail.email,
      city:userdetail.city,
      country:userdetail.country,
      phone_no:userdetail.phone_no,
      organization:userdetail.organization,
      profile_picture:userdetail.profile_picture,
      Is_Active:userdetail.Is_Active,
      Is_Sendmail_Password:userdetail.Is_Sendmail_Password,
      address:userdetail.address,
      company_id:userdetail.company_id,
      description:userdetail.description,
      email_verified_at:userdetail.email_verified_at,
      external_code:userdetail.external_code,
      job_title:userdetail.job_title,
      RoleID:userdetail.RoleID,
      state:userdetail.state,
      time_zone_id:userdetail.time_zone_id,
      updated_at:userdetail.updated_at,
      sold: (Number(userdetail.sold)-Number(TicketInput.SpentTime)),
      sold_consumed: (Number(userdetail.sold_consumed)+Number(TicketInput.SpentTime)),
      sold_total: userdetail.sold_total,
    }
  
    axios.put(`api/User/${userdetail.id}/update`, userdata).then(res=>{
        
      
      if(res.data.status === 200)
      {
       

      } if(res.data.status === 422)
      {
          swal("All fields are mandetory","","error");
  
      }
      else if(res.data.status === 404)
      {
          swal("Error","Profil","error");
  
      }
  });
}


  axios.put(`api/Tickets/${id}/update`, data).then(res=>{

if(res.data.status === 200)
{
  swal("Updated","Ticket","success");
  history.push('/agent/myticket')   
} if(res.data.status === 422)
{
  swal("not Updated");   
}

});


}

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ticket Close Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the information needed
          </DialogContentText>
          <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Close Reason</label>
    <select
                        name="StatusCloseReason"
                        className="form-control"
                        onChange={handleInput}
                        value={TicketInput.StatusCloseReason}
                      >
   <option value="DEFAULT"></option>
                            <option>
                            Resolved
                            </option>
                            <option>
                            Out of bounds
                            </option>
                            <option>
                            Declined by the client
                            </option>
                      </select>
  </div>
  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Ticket Spent Time(H)</label>
                        <input type="text" name="SpentTime" onChange={handleInput}  className="form-control" htmlFor="exampleFormControlInput1"   value={TicketInput.SpentTime}  />
                       
                </div>
  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="name">Close Date and Time </label>
                        <input type="text" name="ClosedDate" disabled  className="form-control" htmlFor="exampleFormControlInput1" defaultValue={min}  />
                       
                </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>history.push('/agent/myticket')}>Cancel</Button>
          <Button onClick={()=>submit()}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
