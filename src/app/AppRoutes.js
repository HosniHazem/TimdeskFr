import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

// Levels
const AddForm = lazy(() => import('./Admin Settings/Levels/AddForm'))

const UpdateForm = lazy(() => import('./Admin Settings/Levels/UpdateForm'))

const Datatable = lazy(() => import('./Admin Settings/Levels/Datatable'))
//

// Levels
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

const Signin = lazy(() => import('./general-pages/Signin'))

const Signup = lazy(() => import('./general-pages/Signup'))

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
     
          <Route exact path="/dashboard">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < Dashboard/>}
            </Route>
            


            {/* Levels */}
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


          <Route exact path="/general-pages/signin">
            {!sessionStorage.getItem('token') ? <Redirect to='/login'/> : < Signin/>}
            </Route>
          <Route exact path="/general-pages/signup" component={ Signup } />

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
  
        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
