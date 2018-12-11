import React from "react";
import { Route,Redirect } from "react-router-dom"

const PrivateRoute = ({component: Component, ...rest}) => {
    return (<Route {...rest} render={(props) => {
      return(
      rest.isAuth
      ? <Component {...props}/> 
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )}
    } />)
}

export default PrivateRoute