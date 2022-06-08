
import React, { useRef } from 'react'
import {Line, Bar, Pie } from 'react-chartjs-2';
import { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import AuthUser from '../Session/AuthUser';
import './dashboard.scss'
import Avatar from '@mui/material/Avatar';
import { useReactToPrint } from "react-to-print";
import Clock from 'react-live-clock';
import jwt_decode from "jwt-decode";

let info = sessionStorage.getItem("user");   
let token = sessionStorage.getItem("token");  
const userInfo = JSON.parse(info);
if(userInfo==null){
  window.location.reload();
}

export default function Dashboard (){ 
 let info1 = sessionStorage.getItem("token");
   
  const token = JSON.parse(info1);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const {http,setToken} = AuthUser()
setInterval(()=>{
  http.post('/refresh').then((res) => {
    console.log(res.data.access_token);
    sessionStorage.removeItem('token');
 sessionStorage.setItem('token',JSON.stringify(res.data.access_token));
 })
  },1200000)

 
  const [Tickets, setTickets] = useState([]);

 useEffect(() => {
   axios.get('api/Tickets').then((res) => {
     if(res.status === 200){
     setTickets(res.data.Ticket);
}
   });
 }, []);
 const [User, setUser] = useState([]);

 useEffect(() => {
   axios.get('api/User').then((res) => {
     if(res.status === 200){
     setUser(res.data.User);
}
   });
 }, []);
 var len=Tickets.length;
   


 const componentRef = useRef();
 const handlePrint = useReactToPrint({
   content: () => componentRef.current,
 });
 
 console.log(Tickets)

console.log(Tickets.length)
var closed=0
var notA=0 
var Assign=0  
var InP=0
var CC=0
var CF=0
var CN=0

Tickets.map((n) =>{
if(n.TicketClose==="1"){
closed=closed+1
}else{
  InP=InP+1
  }
if(n.AssignedUser===null){
notA=notA+1
}
if(n.AssignedUser===userInfo.id){
  Assign=Assign+1
}
if(Number(n.RequestedUser)===userInfo.id){
 CC=CC+1
}
if((Number(n.RequestedUser)===userInfo.id)&&(n.TicketClose==="1")){
 CF=CF+1
}
if((Number(n.RequestedUser)===userInfo.id)&&(n.AssignedUser===null)){
 CN=CN+1
}

 })
 var x=(Math.floor((CF/CC)*100))
 var xd=x.toString();
var DesC="progress-bar bg-primary wd-"+((closed/Tickets.length)*100)+"p";
var DesO="progress-bar bg-secondary wd-"+((InP/Tickets.length)*100)+"p";
var DesN="progress-bar bg-warning wd-"+((notA/Tickets.length)*100)+"p";
var DesA="progress-bar bg-info wd-"+((Assign/Tickets.length)*100)+"p";
var DesCF="progress-bar bg-info wd-"+xd[0]+"0"+"p";

  


  

  


  const sessionsChannelChartData = {
    labels: ['All Tickets', 'Closed Tickets', 'Not Assigned Tickets', 'Assigned For Me', 'Open Tickets'],
    datasets: [{
      data: [Tickets.length,closed,notA,Assign,InP],
      backgroundColor: ['#28a745', '#007bff','#ffc107','#17a2b8','#6c757d'],
    }]
  };
  const sessionsChannelChartData1 = {
    labels: ['All My Ticket', 'Closed Tickets'],
   
    datasets: [{
      data: [CC,CF],
      backgroundColor: ['#28a745', '#007bff'],
    }]
  };
  const sessionsChannelChartOptions = {
    cutoutPercentage: 50,
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const acquisitionChart1Data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      data: [4,2.5,5,3,5],
      borderWidth: 1,
      fill: false,
      backgroundColor: '#fff',
      borderColor: '#fff'
    }]
  };

  const acquisitionChart1Options = {
    scales: {
      yAxes: [{
        display: false,
        ticks: {
          display: false,
        },
        gridLines: {
          drawBorder: false,
          display: false
        }
      }],
      xAxes: [{
        display: false,
        barThickness: 5.5,
        ticks: {
          display: false,
        },
        gridLines: {
          drawBorder: false,
          display: false
        }
      }]

    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  const acquisitionChart2Data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      data: [5,2,3,5,1.5],
      borderWidth: 1,
      fill: false,
      backgroundColor: '#fff',
      borderColor: '#fff'
    }]
  };

  const acquisitionChart2Options = {
    scales: {
      yAxes: [{
        display: false,
        ticks: {
          display: false,
        },
        gridLines: {
          drawBorder: false,
          display: false
        }
      }],
      xAxes: [{
        display: false,
        barThickness: 5.5,
        ticks: {
          display: false,
        },
        gridLines: {
          drawBorder: false,
          display: false
        }
      }]

    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  const sessionsChart1Data = {
    labels: ['New Tickets'],
    datasets: [{
      data: [((InP/Tickets.length)*100),100-((InP/Tickets.length)*100)],
      backgroundColor: ['#6f42c1', '#cad0e8'],
      borderColor: ['#007bff', '#cad0e8'],
    }]
  };
  const sessionsChart0Data = {
    labels: ['New Tickets'],
    datasets: [{
      data: [(Math.floor((CN/CC)*100)),100-(Math.floor((CN/CC)*100))],
      backgroundColor: ['#6f42c1', '#cad0e8'],
      borderColor: ['#007bff', '#cad0e8'],
    }]
  };
  const sessionsChart01Data = {
    labels: ['New Tickets'],
    datasets: [{
      data: [(Math.floor((CF/CC)*100)),100-(Math.floor((CF/CC)*100))],
      backgroundColor: ['#00cccc', '#cad0e8'],
      borderColor: ['#00cccc', '#cad0e8']
    }]
  };

  const sessionsChart1Options = {
    cutoutPercentage: 78,
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const sessionsChart2Data = {
    labels: ['Closed Tickets'],
    datasets: [{
      data: [((closed/Tickets.length)*100),100-((closed/Tickets.length)*100)],
      backgroundColor: ['#00cccc', '#cad0e8'],
      borderColor: ['#00cccc', '#cad0e8']
    }]
  };

  const sessionsChart2Options = {
    cutoutPercentage: 78,
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const toggleProBanner=()=> {
    document.querySelector('.proBanner').classList.toggle("hide");
  }

    if(userInfo.RoleID==="1")
    {
    return (
      <>     
      <div ref={componentRef}>
        <div className="proBanner">
        </div>
        <div className="container p-md-0">
          <div className="az-content-body">
            <div className="az-dashboard-one-title">
              <div>
                <h2 className="az-dashboard-title">Hi {userInfo.name}, welcome back! </h2>
                <p className="az-dashboard-text">Your Tickets analytics dashboard.</p>
              </div>
              <div className="az-content-header-right">
                <div className="media">
                  <div className="media-body">
                    <label>Current Time and Date</label>
                   
                    <h6>{moment().format("YYYY-MM-DD ")}, <Clock format={'HH:mm:ss'} ticking={true} timezone={'TN/Africa'} /></h6>
                    
                  </div>{/* media-body */}
                </div>{/* media */}
                <div className="media">
                  <div className="media-body">
                    <label>Available Tickets</label>
                    <h6>{notA}</h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <div className="media">
                  <div className="media-body">
                    <label>Tickets Category</label>
                    <h6>All Categories</h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <button className="btn btn-purple" onClick={handlePrint}>Export</button>
              </div>
            </div>{/* az-dashboard-one-title */}

           
           
             
            <div className="row row-sm mg-b-20" >
              <div className="col-lg-4" >
                <div className="card card-dashboard-pageviews" >
                  <div className="card-header" >
                    <h6 className="card-title">Tickets Assigned For You</h6>
                    <p className="card-text">This report is your Assigned tickets.</p>
                  </div>{/* card-header */}
                  <div className="card-body" id="growth">
                  {Tickets.map((item,index) => {
                          if(item.AssignedUser===userInfo.id)
                          return (
                            <div className="az-list-item" key={index} >
                      <div>
                      {
                        item.TicketClose==="1"
                        ?
                      <p class="text-danger"><strong>Closed</strong></p>
                      :
                      <p class="text-success"><strong>Opened</strong></p>
                    }
                        <span class="text-dark" >Subject:</span>
                        <h6>{item.Subject}</h6>
                        <span class="text-dark">Description:</span>
                        <div/>                    
                        <span>{item.Description}</span>

                      </div>
                      <div>
                      <span class="text-dark" >Spent Time:</span>
                        <h6 className="tx-primary">{item.SpentTime}</h6>
                        <span class="text-dark">Closed Date:</span>
                        <div/>
                        <span>{item.ClosedDate}</span>
                      </div>
                    </div>
                    
                          );
                        }
                  )}
                    
                   
                  </div>{/* card-body */}
                </div>{/* card */}

              </div>{/* col */}
              <div className="col-lg-8 mg-t-20 mg-lg-t-0">
                <div className="card card-dashboard-four">
                  <div className="card-header">
                    <h6 className="card-title">Tickets Overview</h6>
                  </div>{/* card-header */}
                  <div className="card-body row">
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="chart">
                        <Pie data={sessionsChannelChartData} options={sessionsChannelChartOptions} />
                      </div>
                    </div>{/* col */}
                    <div className="col-md-6 col-lg-5 mg-lg-l-auto mg-t-20 mg-md-t-0">
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>All Tickets</span>
                          <span>{len} <span>(100%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-success wd-100p" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="4"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Closed Tickets</span>
                          <span>{closed} <span>({((closed/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesC} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Not Assigned Tickets</span>
                          <span>{notA}<span>({((notA/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesN} role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Assigned For Me</span>
                          <span>{Assign} <span>({((Assign/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesA} role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Open Tickets</span>
                          <span>{InP}<span>({((InP/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesO} role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                    </div>{/* col */}
                  </div>{/* card-body */}
                </div>{/* card-dashboard-four */}
              </div>{/* col */}
            </div>{/* row */}

            <div className="row row-sm mg-b-20 mg-lg-b-0">
              <div className="col-lg-5 col-xl-4">
                <div className="row row-sm">
                  <div className="col-md-6 col-lg-12 mg-b-20 mg-md-b-0 mg-lg-b-20">
                    <div className="card card-dashboard-five">
                      <div className="card-header">
                        <h6 className="card-title">{userInfo.name}</h6>
                        <span className="card-text">Personal Percentages</span>
                      </div>{/* card-header */}
                      <div className="card-body row row-sm">
                        <div className="col-6 d-sm-flex align-items-center">
                          <div className="card-chart bg-primary acquisition-chart">
                            <Bar className="w-50" data={acquisitionChart1Data} options={acquisitionChart1Options} />
                          </div>
                          <div>
                            <label>Assigned for Me</label>
                            <h4>{((Assign/Tickets.length)*100)}%</h4>
                          </div>
                        </div>{/* col */}
                        <div className="col-6 d-sm-flex align-items-center">
                          <div className="card-chart bg-purple acquisition-chart">
                            <Bar data={acquisitionChart2Data} options={acquisitionChart2Options} />
                          </div>
                          <div>
                            <label>All Tickets</label>
                            <h4>{Tickets.length}</h4>
                          </div>
                        </div>{/* col */}
                      </div>{/* card-body */}
                    </div>{/* card-dashboard-five */}
                  </div>{/* col */}
                  <div className="col-md-6 col-lg-12">
                    <div className="card card-dashboard-five">
                      <div className="card-header">
                        <h6 className="card-title">Overall Tickets</h6>
                        <span className="card-text"> Analysis dor opened and closed tickets.</span>
                      </div>{/* card-header */}
                      <div className="card-body row row-sm">
                        <div className="col-6">
                          <div className="d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10 wd-50 ht-40">
                              <Pie data={sessionsChart1Data} options={sessionsChart1Options} />
                            </div>
                            <div>
                              <label>New Tickets</label>
                              <h4>{((InP/Tickets.length)*100)}%</h4>
                            </div>
                          </div>
                        </div>{/* col */}
                        <div className="col-6">
                          <div className="d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10 wd-50 ht-40">
                              <Pie data={sessionsChart2Data} options={sessionsChart2Options} />
                            </div>
                            <div>
                              <label>Closed Tickets</label>
                              <h4>{((closed/Tickets.length)*100)}%</h4>
                            </div>
                          </div>
                        </div>{/* col */}
                      </div>{/* card-body */}
                    </div>{/* card-dashboard-five */}
                  </div>{/* col */}
                </div>{/* row */}
              </div>{/* col-lg-3 */}
              <div className="col-lg-7 col-xl-8 mg-t-20 mg-lg-t-0">
                <div className="card card-table-one">
                  <h6 className="card-title">Admin and Agents Contact</h6>
                  <p className="az-content-text mg-b-20">List of agents and admins contacts.</p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="wd-5p">&nbsp;</th>
                          <th className="wd-45p">Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody id="growth">
                      {User.map((item,index) => {
                      if(item.RoleID!="3")
                          return (
                            <tr key={index}>
                          <td><Avatar alt="User Photo" sx={{ width: 30, height: 30 }} src={"http://localhost:8000/images/uploads/"+item.profile_picture} /></td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_no}</td>
                          {item.RoleID==="1"
                          ?
                          <td><strong>Admin</strong></td>
                          : 
                          <td><strong>Agent</strong></td>
                      }
                        
                      
                        </tr>
                    
                          );
                        }
                  )}
                     
                       
                      </tbody>
                    </table>
                  </div>{/* table-responsive */}
                </div>{/* card */}
              </div>{/* col-lg */}

            </div>{/* row */}
          </div>{/* az-content-body */}
        </div>
      </div>
      </>
    )}
    else if(userInfo.RoleID==="2"){

      return (
        <>
        <div ref={componentRef}>
        <div className="proBanner">
        </div>
        <div className="container p-md-0">
          <div className="az-content-body">
            <div className="az-dashboard-one-title">
              <div>
                <h2 className="az-dashboard-title">Hi {userInfo.name}, welcome back! </h2>
                <p className="az-dashboard-text">Your Tickets analytics dashboard.</p>
              </div>
              <div className="az-content-header-right">
                <div className="media">
                  <div className="media-body">
                   
                    <label>Current Time and Date</label>
                   
                    <h6>{moment().format("YYYY-MM-DD ")}, <Clock format={'HH:mm:ss'} ticking={true} timezone={'TN/Africa'} /></h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <div className="media">
                  <div className="media-body">
                    <label>Available Tickets</label>
                    <h6>{notA}</h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <div className="media">
                  <div className="media-body">
                    <label>Tickets Category</label>
                    <h6>All Categories</h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <button className="btn btn-purple" onClick={handlePrint}>Export</button>
              </div>
            </div>{/* az-dashboard-one-title */}

           
           
             
            <div className="row row-sm mg-b-20" >
              <div className="col-lg-4" >
                <div className="card card-dashboard-pageviews" >
                  <div className="card-header" >
                    <h6 className="card-title">Tickets Assigned For You</h6>
                    <p className="card-text">This report is your Assigned tickets.</p>
                  </div>{/* card-header */}
                  <div className="card-body" id="growth">
                  {Tickets.map((item,index) => {
                          if(item.AssignedUser===userInfo.id)
                          return (
                            <div className="az-list-item" key={index} >
                      <div>
                      {
                        item.TicketClose==="1"
                        ?
                      <p class="text-danger"><strong>Closed</strong></p>
                      :
                      <p class="text-success"><strong>Opened</strong></p>
                    }
                        <span class="text-dark" >Subject:</span>
                        <h6>{item.Subject}</h6>
                        <span class="text-dark">Description:</span>
                        <div/>                    
                        <span>{item.Description}</span>

                      </div>
                      <div>
                      <span class="text-dark" >Spent Time:</span>
                        <h6 className="tx-primary">{item.SpentTime}</h6>
                        <span class="text-dark">Closed Date:</span>
                        <div/>
                        <span>{item.ClosedDate}</span>
                      </div>
                    </div>
                    
                          );
                        }
                  )}
                    
                   
                  </div>{/* card-body */}
                </div>{/* card */}

              </div>{/* col */}
              <div className="col-lg-8 mg-t-20 mg-lg-t-0">
                <div className="card card-dashboard-four">
                  <div className="card-header">
                    <h6 className="card-title">Tickets Overview</h6>
                  </div>{/* card-header */}
                  <div className="card-body row">
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="chart">
                        <Pie data={sessionsChannelChartData} options={sessionsChannelChartOptions} />
                      </div>
                    </div>{/* col */}
                    <div className="col-md-6 col-lg-5 mg-lg-l-auto mg-t-20 mg-md-t-0">
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>All Tickets</span>
                          <span>{len} <span>(100%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-success wd-100p" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="4"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Closed Tickets</span>
                          <span>{closed} <span>({((closed/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesC} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Not Assigned Tickets</span>
                          <span>{notA}<span>({((notA/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesN} role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Assigned For Me</span>
                          <span>{Assign} <span>({((Assign/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesA} role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Open Tickets</span>
                          <span>{InP}<span>({((InP/Tickets.length)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesO} role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                    </div>{/* col */}
                  </div>{/* card-body */}
                </div>{/* card-dashboard-four */}
              </div>{/* col */}
            </div>{/* row */}

            <div className="row row-sm mg-b-20 mg-lg-b-0">
              <div className="col-lg-5 col-xl-4">
                <div className="row row-sm">
                  <div className="col-md-6 col-lg-12 mg-b-20 mg-md-b-0 mg-lg-b-20">
                    <div className="card card-dashboard-five">
                      <div className="card-header">
                        <h6 className="card-title">{userInfo.name}</h6>
                        <span className="card-text">Personal Percentages</span>
                      </div>{/* card-header */}
                      <div className="card-body row row-sm">
                        <div className="col-6 d-sm-flex align-items-center">
                          <div className="card-chart bg-primary acquisition-chart">
                            <Bar className="w-50" data={acquisitionChart1Data} options={acquisitionChart1Options} />
                          </div>
                          <div>
                            <label>Assigned for Me</label>
                            <h4>{((Assign/Tickets.length)*100)}%</h4>
                          </div>
                        </div>{/* col */}
                        <div className="col-6 d-sm-flex align-items-center">
                          <div className="card-chart bg-purple acquisition-chart">
                            <Bar data={acquisitionChart2Data} options={acquisitionChart2Options} />
                          </div>
                          <div>
                            <label>All Tickets</label>
                            <h4>{Tickets.length}</h4>
                          </div>
                        </div>{/* col */}
                      </div>{/* card-body */}
                    </div>{/* card-dashboard-five */}
                  </div>{/* col */}
                  <div className="col-md-6 col-lg-12">
                    <div className="card card-dashboard-five">
                      <div className="card-header">
                        <h6 className="card-title">Overall Tickets</h6>
                        <span className="card-text"> Analysis dor opened and closed tickets.</span>
                      </div>{/* card-header */}
                      <div className="card-body row row-sm">
                        <div className="col-6">
                          <div className="d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10 wd-50 ht-40">
                              <Pie data={sessionsChart1Data} options={sessionsChart1Options} />
                            </div>
                            <div>
                              <label>New Tickets</label>
                              <h4>{((InP/Tickets.length)*100)}%</h4>
                            </div>
                          </div>
                        </div>{/* col */}
                        <div className="col-6">
                          <div className="d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10 wd-50 ht-40">
                              <Pie data={sessionsChart2Data} options={sessionsChart2Options} />
                            </div>
                            <div>
                              <label>Closed Tickets</label>
                              <h4>{((closed/Tickets.length)*100)}%</h4>
                            </div>
                          </div>
                        </div>{/* col */}
                      </div>{/* card-body */}
                    </div>{/* card-dashboard-five */}
                  </div>{/* col */}
                </div>{/* row */}
              </div>{/* col-lg-3 */}
              <div className="col-lg-7 col-xl-8 mg-t-20 mg-lg-t-0">
                <div className="card card-table-one">
                  <h6 className="card-title">Admin and Agents Contact</h6>
                  <p className="az-content-text mg-b-20">List of agents and admins contacts.</p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="wd-5p">&nbsp;</th>
                          <th className="wd-45p">Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody id="growth">
                      {User.map((item,index) => {
                      if(item.RoleID!="3")
                          return (
                            <tr key={index}>
                          <td><Avatar alt="User Photo" sx={{ width: 30, height: 30 }} src={"http://localhost:8000/images/uploads/"+item.profile_picture} /></td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_no}</td>
                          {item.RoleID==="1"
                          ?
                          <td><strong>Admin</strong></td>
                          : 
                          <td><strong>Agent</strong></td>
                      }
                        
                      
                        </tr>
                    
                          );
                        }
                  )}
                     
                       
                      </tbody>
                    </table>
                  </div>{/* table-responsive */}
                </div>{/* card */}
              </div>{/* col-lg */}

            </div>{/* row */}
          </div>{/* az-content-body */}
        </div>
      </div>
      </>
      )       
      
      
    }else {

      return (
        <>
        <div ref={componentRef}>
        <div className="proBanner">
        </div>
        <div className="container p-md-0">
          <div className="az-content-body">
            <div className="az-dashboard-one-title">
              <div>
                <h2 className="az-dashboard-title">Hi {userInfo.name}, welcome back! </h2>
                <p className="az-dashboard-text">Your Tickets analytics dashboard.</p>
              </div>
              <div className="az-content-header-right">
                <div className="media">
                  <div className="media-body">
                    <label>Current Time and Date</label>
                   
                    <h6>{moment().format("YYYY-MM-DD ")}, <Clock format={'HH:mm:ss'} ticking={true} timezone={'TN/Africa/Tunis'} /></h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <div className="media">
                  <div className="media-body">
                  <label>In Progress Tickets</label>
                    <h6>{CC-CF}</h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <div className="media">
                  <div className="media-body">
                    <label>Tickets Category</label>
                    <h6>All Categories</h6>
                  </div>{/* media-body */}
                </div>{/* media */}
                <button className="btn btn-purple" onClick={handlePrint}>Export</button>
              </div>
            </div>{/* az-dashboard-one-title */}

           
           
             
            <div className="row row-sm mg-b-20" >
              <div className="col-lg-4" >
                <div className="card card-dashboard-pageviews" >
                  <div className="card-header" >
                    <h6 className="card-title">Tickets Created By You</h6>
                    <p className="card-text">This report is your Created tickets.</p>
                  </div>{/* card-header */}
                  <div className="card-body" id="growth">
                  {Tickets.map((item,index) => {
                          if(Number(item.RequestedUser)===userInfo.id)
                          return (
                            <div className="az-list-item" key={index} >
                      <div>
                      {
                        item.TicketClose==="1"
                        ?
                      <p class="text-danger"><strong>Closed</strong></p>
                      :
                      <p class="text-success"><strong>Opened</strong></p>
                    }
                    
                    <span class="text-dark" >Subject:</span>
                        <h6>{item.Subject}</h6>
                        <span class="text-dark">Description:</span>
                        <div/>                    
                        <span>{item.Description}</span>

                      </div>
                      <div>
                      <span class="text-dark" >Spent Time:</span>
                        <h6 className="tx-primary">{item.SpentTime}</h6>
                        <span class="text-dark">Closed Date:</span>
                        <div/>
                        <span>{item.ClosedDate}</span>
                      </div>
                    </div>
                    
                          );
                        }
                  )}
                    
                   
                  </div>{/* card-body */}
                </div>{/* card */}

              </div>{/* col */}
              <div className="col-lg-8 mg-t-20 mg-lg-t-0">
                <div className="card card-dashboard-four">
                  <div className="card-header">
                    <h6 className="card-title">Tickets Overview</h6>
                  </div>{/* card-header */}
                  <div className="card-body row">
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="chart">
                        <Pie data={sessionsChannelChartData1} options={sessionsChannelChartOptions} />
                      </div>
                    </div>{/* col */}
                    <div className="col-md-6 col-lg-5 mg-lg-l-auto mg-t-20 mg-md-t-0">
                    <div className="az-traffic-detail-item">
                        <div>
                          <span>All My Ticket</span>
                          <span>{CC} <span>(100%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-success wd-100p" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="4"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Closed Tickets</span>
                        <span>{CF} <span>({Math.floor((CF/CC)*100)}%)</span></span>
                        </div>
                        <div className="progress">
                          <div className={DesCF} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                     
                      </div>
                    </div>{/* col */}
                  </div>{/* card-body */}
                </div>{/* card-dashboard-four */}
              </div>{/* col */}
            </div>{/* row */}

            <div className="row row-sm mg-b-20 mg-lg-b-0">
              <div className="col-lg-5 col-xl-4">
                <div className="row row-sm">

                  <div className="col-md-6 col-lg-12">
                    <div className="card card-dashboard-five">
                      <div className="card-header">
                        <h6 className="card-title">Overall Tickets</h6>
                        <span className="card-text"> Analysis dor opened and closed tickets.</span>
                      </div>{/* card-header */}
                      <div className="card-body row row-sm">
                        <div className="col-6">
                          <div className="d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10 wd-50 ht-40">
                              <Pie data={sessionsChart0Data} options={sessionsChart1Options} />
                            </div>
                            <div>
                              <label>Not Picked</label>
                              <h4>{(Math.floor((CN/CC)*100))}%</h4>
                            </div>
                          </div>
                        </div>{/* col */}
                        <div className="col-6">
                          <div className="d-sm-flex align-items-center">
                            <div className="mg-b-10 mg-sm-b-0 mg-sm-r-10 wd-50 ht-40">
                              <Pie data={sessionsChart01Data} options={sessionsChart2Options} />
                            </div>
                            <div>
                              <label>Closed Tickets</label>
                              <h4>{(Math.floor((CF/CC)*100))}%</h4>
                            </div>
                          </div>
                        </div>{/* col */}
                      </div>{/* card-body */}
                    </div>{/* card-dashboard-five */}
                  </div>{/* col */}
                </div>{/* row */}
              </div>{/* col-lg-3 */}
              <div className="col-lg-7 col-xl-8 mg-t-20 mg-lg-t-0">
                <div className="card card-table-one">
                  <h6 className="card-title">Admin and Agents Contact</h6>
                  <p className="az-content-text mg-b-20">List of agents and admins contacts.</p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="wd-5p">&nbsp;</th>
                          <th className="wd-45p">Name</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody id="growth">
                      {User.map((item,index) => {
                      if(item.RoleID!="3")
                          return (
                            <tr key={index}>
                          <td><Avatar alt="User Photo" sx={{ width: 30, height: 30 }} src={"http://localhost:8000/images/uploads/"+item.profile_picture} /></td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          {item.RoleID==="1"
                          ?
                          <td><strong>Admin</strong></td>
                          : 
                          <td><strong>Agent</strong></td>
                      }
                        
                      
                        </tr>
                    
                          );
                        }
                  )}
                     
                       
                      </tbody>
                    </table>
                  </div>{/* table-responsive */}
                </div>{/* card */}
              </div>{/* col-lg */}

            </div>{/* row */}
          </div>{/* az-content-body */}
        </div>
      </div>
      </>
      )   


    }
  }

