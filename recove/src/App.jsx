import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute/PrivateRoute.jsx"
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import LandingPage from 'views/LandingPage/LandingPage.jsx';
  
const  App = (props) => {

        let token = localStorage.getItem('token') || ''
        let auth = (token.length > 10) ? true : false
   
        return(
        <Switch>
            <Route exact path='/' component={LandingPage} /> 
            <PrivateRoute path='/home' isAuth={auth} component={Dashboard}/>
          </Switch>)
        
}

export default App