import React, { Component, Suspense, lazy, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
let info = sessionStorage.getItem("user");
// eslint-disable-next-line
let userInfo = JSON.parse(info);
if (userInfo) {
  var Role = userInfo.RoleID;
}
const Messages = lazy(() => import("./Messages"));

// Profile
const Reset = lazy(() => import("./ForgetPassword/Reset"));

// Profile
const New = lazy(() => import("./Profile/New"));

// User
const AddFormI = lazy(() => import("./Admin Settings/Users/AddForm"));

const UpdateFormI = lazy(() => import("./Admin Settings/Users/UpdateForm"));

const AddFormIC = lazy(() => import("./Admin Settings/Users/AddFormClient"));

const UpdateFormIC = lazy(() =>
  import("./Admin Settings/Users/UpdateFormClient")
);

const DatatableI = lazy(() => import("./Admin Settings/Users/Datatable"));

const DatatableIC = lazy(() =>
  import("./Admin Settings/Users/DatatableClient")
);
//

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const Login = lazy(() => import("./Session/login"));

const ForgetPassword = lazy(() => import("./ForgetPassword/ForgetPassword"));

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback="">
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard"></Redirect>
          </Route>

       

          <Route exact path="/dashboard">
            {!sessionStorage.getItem("token") ? (
              <Redirect to="/login" />
            ) : (
              <Dashboard />
            )}
          </Route>

          <Route exact path="/profil">
            {!sessionStorage.getItem("token") ? (
              <Redirect to="/login" />
            ) : (
              <New />
            )}
          </Route>

          {/* User */}
          <Route exact path="/user">
            {!sessionStorage.getItem("token") || Role != "1" ? (
              <Redirect to="/login" />
            ) : (
              <DatatableI />
            )}
          </Route>
          <Route exact path="/client">
            {!sessionStorage.getItem("token") || Role != "1" ? (
              <Redirect to="/login" />
            ) : (
              <DatatableIC />
            )}
          </Route>
          <Route exact path="/user/new">
            {!sessionStorage.getItem("token") || Role != "1" ? (
              <Redirect to="/login" />
            ) : (
              <AddFormI />
            )}
          </Route>
          <Route exact path="/user/current/:id">
            {!sessionStorage.getItem("token") || Role != "1" ? (
              <Redirect to="/login" />
            ) : (
              <UpdateFormI />
            )}
          </Route>
          <Route exact path="/client/new">
            {!sessionStorage.getItem("token") || Role != "1" ? (
              <Redirect to="/login" />
            ) : (
              <AddFormIC />
            )}
          </Route>
          <Route exact path="/client/current/:id">
            {!sessionStorage.getItem("token") || Role != "1" ? (
              <Redirect to="/login" />
            ) : (
              <UpdateFormIC />
            )}
          </Route>
          {/* //// */}

          <Route exact path="/login">
            {sessionStorage.getItem("token") ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login />
            )}
          </Route>

          <Route exact path="/forgetpassword">
            {sessionStorage.getItem("token") ? (
              <Redirect to="/dashboard" />
            ) : (
              <ForgetPassword />
            )}
          </Route>
          <Route exact path="/reset/:token" component={Reset} />
          <Route exact path="/messages" component={Messages} />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
