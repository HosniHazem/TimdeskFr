import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";
let info = sessionStorage.getItem("user");
// eslint-disable-next-line 
let userInfo = JSON.parse(info);

// Profile
const Reset = lazy(() => import('./ForgetPassword/Reset'))

const Modal = lazy(() => import('./Ticket Admin/Ticket/Views'))
// Profile
const New = lazy(() => import('./Profile/New'))

// Ticket Admin
const AddFormT = lazy(() => import('./Ticket Admin/Ticket/AddForm'))

const UpdateFormT = lazy(() => import('./Ticket Admin/Ticket/UpdateForm'))

const DatatableT = lazy(() => import('./Ticket Admin/Ticket/Datatable'))
//
// Ticket Agent
const UpdateFormTG = lazy(() => import('./Ticket Agent/Ticket/UpdateForm'))

const DatatableTG = lazy(() => import('./Ticket Agent/Ticket/Datatable'))
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

const DatatableI = lazy(() => import('./Admin Settings/Users/Datatable'))
//

const Dashboard = lazy(() => import('./dashboard/Dashboard'))



const Buttons = lazy(() => import('./ui-elements/Buttons'))

const Dropdowns = lazy(() => import('./ui-elements/Dropdowns'))

const Icons = lazy(() => import('./ui-elements/Icons'))

const FormElements = lazy(() => import('./form/FormElements'))

const ChartJs = lazy(() => import('./charts/ChartJs'))

const BasicTable = lazy(() => import('./tables/BasicTable'))

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
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < DatatableT/>} 
             </Route>
             <Route exact path="/ticket/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddFormT/>} 
             </Route>
             <Route exact path="/ticket/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateFormT/>} 
             </Route>
             
            {/* //// */}

            {/* Ticket Client */}
<Route exact path="/client/ticket">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="3") ? <Redirect to='/login'/> : < DatatableTC/>} 
             </Route>
             <Route exact path="/client/ticket/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="3") ? <Redirect to='/login'/> : < AddFormTC/>} 
             </Route>
             <Route exact path="/client/ticket/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="3") ? <Redirect to='/login'/> : < UpdateFormTC/>} 
             </Route>
             
            {/* //// */}

            {/* Ticket Agent */}
<Route exact path="/agent/ticket">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="2") ? <Redirect to='/login'/> : < DatatableTG/>} 
             </Route>
            
             <Route exact path="/agent/ticket/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="2") ? <Redirect to='/login'/> : < UpdateFormTG/>} 
             </Route>
             
            {/* //// */}


{/* Priority */}
<Route exact path="/Priority">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < DatatableP/>} 
             </Route>
            <Route exact path="/Priority/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddFormP/>} 
             </Route>
             <Route exact path="/Priority/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateFormP/>} 
             </Route>
            {/* //// */}


{/* RequestType */}
<Route exact path="/requesttype">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < DatatableRT/>} 
             </Route>
            <Route exact path="/requesttype/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddFormRT/>} 
             </Route>
             <Route exact path="/requesttype/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateFormRT/>} 
             </Route>
             
            {/* //// */}


            {/* Model */}
            <Route exact path="/subcategory">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < DatatableTM/>} 
             </Route>
            <Route exact path="/subcategory/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddFormTM/>} 
             </Route>
             <Route exact path="/subcategory/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateFormTM/>} 
             </Route>
            {/* //// */}

            {/* Category */}
            <Route exact path="/category">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < DatatableC/>} 
             </Route>
            <Route exact path="/category/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddFormC/>} 
             </Route>
             <Route exact path="/category/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateFormC/>} 
             </Route>
            {/* //// */}

            {/* Levels */}
            <Route exact path="/levels">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < Datatable/>} 
             </Route>
            <Route exact path="/levels/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddForm/>} 
             </Route>
             <Route exact path="/levels/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateForm/>} 
             </Route>
            {/* //// */}


            {/* Status */}
            <Route exact path="/status">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < DatatableS/>} 
             </Route>
            <Route exact path="/status/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddFormS/>} 
             </Route>
             <Route exact path="/status/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateFormS/>} 
             </Route>
            {/* //// */}

            {/* User */}
            <Route exact path="/user">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < DatatableI/>} 
             </Route>
            <Route exact path="/user/new">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < AddFormI/>} 
             </Route>
             <Route exact path="/user/current/:id">
            {!sessionStorage.getItem('token')||(userInfo.RoleID!="1") ? <Redirect to='/login'/> : < UpdateFormI/>} 
             </Route>
            {/* //// */}


          

          <Route exact path="/login">
            {sessionStorage.getItem('token') ? <Redirect to='/dashboard'/> : < Login/>}
            </Route>

            <Route exact path="/forgetpassword">
            {sessionStorage.getItem('token') ? <Redirect to='/dashboard'/> : < ForgetPassword/>}
            </Route>
    
        <Route exact path="/reset/:token">
            {sessionStorage.getItem('token') ? <Redirect to='/dashboard'/> : <Redirect to='/reset/:token'/>}
            </Route>
        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
