import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

const forget = lazy(() => import('./Forget/Forget'))
// Profile
const Reset = lazy(() => import('./ForgetPassword/Reset'))

const Modal = lazy(() => import('./Ticket/Views'))
// Profile
const New = lazy(() => import('./Profile/New'))

// Ticket
const AddFormT = lazy(() => import('./Ticket/AddForm'))

const UpdateFormT = lazy(() => import('./Ticket/UpdateForm'))

const DatatableT = lazy(() => import('./Ticket/Datatable'))
//

// Ticket
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

// Impact
const AddFormI = lazy(() => import('./Admin Settings/Impact/AddForm'))

const UpdateFormI = lazy(() => import('./Admin Settings/Impact/UpdateForm'))

const DatatableI = lazy(() => import('./Admin Settings/Impact/Datatable'))
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


{/* Ticket */}
<Route exact path="/ticket">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < DatatableT/>} 
             </Route>
            <Route exact path="/ticket/new" component={ AddFormT } />

            <Route exact path="/ticket/current/:id" component={ UpdateFormT } />
            {/* //// */}


{/* Priority */}
<Route exact path="/Priority">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < DatatableP/>} 
             </Route>
            <Route exact path="/Priority/new" component={ AddFormP } />

            <Route exact path="/Priority/current/:id" component={ UpdateFormP } />
            {/* //// */}


{/* RequestType */}
<Route exact path="/requesttype">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < DatatableRT/>} 
             </Route>
            <Route exact path="/requesttype/new" component={ AddFormRT } />

            <Route exact path="/requesttype/current/:id" component={ UpdateFormRT } />
            {/* //// */}


            {/* Model */}
            <Route exact path="/subcategory">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < DatatableTM/>} 
             </Route>
            <Route exact path="/subcategory/new" component={ AddFormTM } />

            <Route exact path="/subcategory/current/:id" component={ UpdateFormTM } />
            {/* //// */}

            {/* Category */}
            <Route exact path="/category">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < DatatableC/>} 
             </Route>
            <Route exact path="/category/new" component={ AddFormC } />

            <Route exact path="/category/current/:id" component={ UpdateFormC } />
            {/* //// */}

            {/* Levels */}
            <Route exact path="/levels">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < Datatable/>} 
             </Route>
            <Route exact path="/levels/new" component={ AddForm } />

            <Route exact path="/levels/current/:id" component={ UpdateForm } />
            {/* //// */}


            {/* Status */}
            <Route exact path="/status">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < DatatableS/>} 
             </Route>
            <Route exact path="/status/new" component={ AddFormS } />

            <Route exact path="/status/current/:id" component={ UpdateFormS } />
            {/* //// */}

            {/* Impact */}
            <Route exact path="/impact">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < DatatableI/>} 
             </Route>
            <Route exact path="/impact/new" component={ AddFormI } />

            <Route exact path="/impact/current/:id" component={ UpdateFormI } />
            {/* //// */}

          <Route exact path="/ui-elements/buttons" component={ Buttons } />

          <Route exact path="/ui-elements/dropdowns" component={ Dropdowns } />
          <Route exact path="/ui-elements/icons" component={ Icons } />

          <Route exact path="/form/form-elements" component={ FormElements } />

          <Route exact path="/charts/chartjs" component={ ChartJs } />

          <Route exact path="/tables/basic-table" component={ BasicTable } />

          

          <Route exact path="/login">
            {sessionStorage.getItem('token') ? <Redirect to='/dashboard'/> : < Login/>}
            </Route>

            <Route exact path="/forgetpassword">
            {sessionStorage.getItem('token') ? <Redirect to='/login'/> : < ForgetPassword/>}
            </Route>
            <Route path='/forget' component={forget} />
        <Route exact path="/reset/:token">
            {sessionStorage.getItem('token') ? <Redirect to='/reset/:token'/> : < Reset/>}
            </Route>
        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
