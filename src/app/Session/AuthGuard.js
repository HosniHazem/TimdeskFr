import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
const AuthGuard = ({ component: Component, ...rest }) => {
  const auth = useSelector(sta