import React, { Component, Suspense, lazy,useState,useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
let info = sessionStorage.getItem("user");
// eslint-disable-next-line 
let userInfo = JSON.parse(info);
if(userInfo){
var Role=userInfo.RoleID;
}


const FormD = lazy(() => import('./Ticket Admin/Ticket/ViewsClose'))
const FormA = lazy(() => import('./Ticket Agent/Ticket/ViewsClose'))
// Profile
const Reset = lazy(() => import('./ForgetPassword/Reset'))

const Modal = lazy(() => import('./Ticket Admin/Ticket/Views'))
// Profile
const New = lazy(() => import('./Profile/New'))

// Ticket Admin

const UpdateFormT = lazy(() => import('./Ticket Admin/Ticket/UpdateForm'))

const UpdateFormPickA = lazy(() => import('./Ticket Admin/Ticket/UpdateFormPick'))

const DatatableT = lazy(() => import('./Ticket Admin/Ticket/Datatable'))
//
// Ticket Agent
const UpdateFormTG = lazy(() => import('./Ticket Agent/Ticket/UpdateForm'))

const UpdateFormPick = lazy(() => import('./Ticket Agent/Ticket/UpdateFormPick'))

const DatatableOP = lazy(() => import('./Ticket Agent/Ticket/DatatableOP'))

const DatatableMY = lazy(() => import('./Ticket Agent/Ticket/DatatableMy'))

//
// Ticket Client
const AddFormTC = lazy(() => import('./Ticket Client/Ticket/AddForm'))

const UpdateFormTC = lazy(() => import('./Ticket Client/Ticket/UpdateForm'))

const DatatableTC = lazy(() => import('./Ticket Client/Ticket/Datatable'))

//

// Periority
const AddFormP = lazy(() => import('./Admin Settings/Periority/AddForm'))

const UpdateFormP = lazy(() => import('./Admin Settings/Periority/UpdateForm'))

const DatatableP = lazy(() => import('./Admin Settings/Periority/Datatable'))
//

// Levels
const AddForm = lazy(() => import('./Admin Settings/Levels/AddForm'))

const UpdateForm = lazy(() => import('./Admin Settings/Levels/UpdateForm'))

const Datatable = lazy(() => import('./Admin Settings/Levels/Datatable'))
//

// RequestType
const AddFormRT = lazy(() => import('./Admin Settings/RequestType/AddForm'))

const UpdateFormRT = lazy(() => import('./Admin Settings/RequestType/UpdateForm'))

const DatatableRT = lazy(() => import('./Admin Settings/RequestType/Datatable'))
//

// TicketModel
const AddFormTM = lazy(() => import('./Admin Settings/Module/AddForm'))

const UpdateFormTM = lazy(() => import('./Admin Settings/Module/UpdateForm'))

const DatatableTM = lazy(() => import('./Admin Settings/Module/Datatable'))
//

// Category
const AddFormC = lazy(() => import('./Admin Settings/Category/AddForm'))

const UpdateFormC = lazy(() => import('./Admin Settings/Category/UpdateForm'))

const DatatableC = lazy(() => import('./Admin Settings/Category/Datatable'))
//

// Status
const AddFormS = lazy(() => import('./Admin Settings/Status/AddForm'))

const UpdateFormS = lazy(() => import('./Admin Settings/Status/UpdateForm'))

const DatatableS = lazy(() => import('./Admin Settings/Status/Datatable'))
//

// User
const AddFormI = lazy(() => import('./Admin Settings/Users/AddForm'))

const UpdateFormI = lazy(() => import('./Admin Settings/Users/UpdateForm'))

const AddFormIC = lazy(() => import('./Admin Settings/Users/AddFormClient'))

const UpdateFormIC = lazy(() => import('./Admin Settings/Users/UpdateFormClient'))

const DatatableI = lazy(() => import('./Admin Settings/Users/Datatable'))

const DatatableIC = lazy(() => import('./Admin Settings/Users/DatatableClient'))
//

const Dashboard = lazy(() => import('./dashboard/Dashboard'))
 

const Login = lazy(() => import('./Session/login'))

const ForgetPassword = lazy(() => import('./ForgetPassword/ForgetPassword'))

export class AppRoutes extends Component {
  render() {
   
    return (
      
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard"></Redirect>
          </Route>

          <Route exact path="/ticket/:id/close">
            {!sessionStorage.getItem('token')||(Role==="3") ? <Redirect to='/login'/> : < FormD/>} 
             </Route>

          <Route exact path="/agent/:id/close">
            {!sessionStorage.getItem('token')||(Role==="3") ? <Redirect to='/login'/> : < FormA/>} 
             </Route>
          {/* <Route exact path="/dashboard" component={ Dashboard } /> */}
          <Route exact path="/modal">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < Modal/>} 
             </Route>

          <Route exact path="/dashboard">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < Dashboard/>}
            </Route>

            <Route exact path="/profil">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < New/>} 
             </Route>


{/* Ticket Admin */}
<Route exact path="/ticket">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableT/>} 
             </Route>
             
             <Route exact path="/ticket/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormT/>} 
             </Route>
             <Route exact path="/ticket/pick/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormPickA/>} 
             </Route>

            {/* //// */}

            {/* Ticket Client */}
<Route exact path="/client/ticket">
            {!sessionStorage.getItem('token')||(Role!="3") ? <Redirect to='/login'/> : < DatatableTC/>} 
             </Route>
             <Route exact path="/client/ticket/new">
            {!sessionStorage.getItem('token')||(Role!="3") ? <Redirect to='/login'/> : < AddFormTC/>} 
             </Route>
             <Route exact path="/client/ticket/current/:id">
            {!sessionStorage.getItem('token')||(Role!="3") ? <Redirect to='/login'/> : < UpdateFormTC/>} 
             </Route>
             
            {/* //// */}

            {/* Ticket Agent */}

<Route exact path="/agent/myticket">
            {!sessionStorage.getItem('token')||(Role!="2") ? <Redirect to='/login'/> : < DatatableMY/>} 
             </Route>
<Route exact path="/ticket/open">
            {!sessionStorage.getItem('token')||(Role!="2") ? <Redirect to='/login'/> : < DatatableOP/>} 
             </Route>
            
             <Route exact path="/agent/ticket/current/:id">
            {!sessionStorage.getItem('token')||(Role!="2") ? <Redirect to='/login'/> : < UpdateFormTG/>} 
             </Route>
            
             <Route exact path="/agent/pick/current/:id">
            {!sessionStorage.getItem('token')||(Role!="2") ? <Redirect to='/login'/> : < UpdateFormPick/>} 
             </Route>
             
            {/* //// */}


{/* Priority */}
<Route exact path="/Priority">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableP/>} 
             </Route>
            <Route exact path="/Priority/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddFormP/>} 
             </Route>
             <Route exact path="/Priority/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormP/>} 
             </Route>
            {/* //// */}


{/* RequestType */}
<Route exact path="/requesttype">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableRT/>} 
             </Route>
            <Route exact path="/requesttype/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddFormRT/>} 
             </Route>
             <Route exact path="/requesttype/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormRT/>} 
             </Route>
             
            {/* //// */}


            {/* Model */}
            <Route exact path="/subcategory">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableTM/>} 
             </Route>
            <Route exact path="/subcategory/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddFormTM/>} 
             </Route>
             <Route exact path="/subcategory/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormTM/>} 
             </Route>
            {/* //// */}

            {/* Category */}
            <Route exact path="/category">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableC/>} 
             </Route>
            <Route exact path="/category/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddFormC/>} 
             </Route>
             <Route exact path="/category/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormC/>} 
             </Route>
            {/* //// */}

            {/* Levels */}
            <Route exact path="/levels">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < Datatable/>} 
             </Route>
            <Route exact path="/levels/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddForm/>} 
             </Route>
             <Route exact path="/levels/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateForm/>} 
             </Route>
            {/* //// */}


            {/* Status */}
            <Route exact path="/status">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableS/>} 
             </Route>
            <Route exact path="/status/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddFormS/>} 
             </Route>
             <Route exact path="/status/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormS/>} 
             </Route>
            {/* //// */}

            {/* User */}
            <Route exact path="/user">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableI/>} 
             </Route>
            <Route exact path="/client">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < DatatableIC/>} 
             </Route>
            <Route exact path="/user/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddFormI/>} 
             </Route>
             <Route exact path="/user/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormI/>} 
             </Route>
            <Route exact path="/client/new">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < AddFormIC/>} 
             </Route>
             <Route exact path="/client/current/:id">
            {!sessionStorage.getItem('token')||(Role!="1") ? <Redirect to='/login'/> : < UpdateFormIC/>} 
             </Route>
            {/* //// */}


          

          <Route exact path="/login">
            {sessionStorage.getItem('token') ? <Redirect to='/dashboard'/> : < Login/>}
            </Route>

            <Route exact path="/forgetpassword">
            {sessionStorage.getItem('token') ? <Redirect to='/dashboard'/> : < ForgetPassword/>}
            </Route>
            <Route exact path="/reset/:token" component={ Reset } />
        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
