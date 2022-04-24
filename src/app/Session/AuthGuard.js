import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';

const AuthGuard = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(null)  
  useEffect(() => {
    let token = sessionStorage.getItem('token')
        if(token){
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();

            if(tokenExpiration < dateNow.getTime()/1000){
                setIsAuthenticated(false)
            }else{
                setIsAuthenticated(true)
            }
        } else {
           setIsAuthenticated(false)
        }
    // eslint-disable-next-line
  }, [auth])

  if(isAuthenticated === null){
    return <></>
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default AuthGuard;