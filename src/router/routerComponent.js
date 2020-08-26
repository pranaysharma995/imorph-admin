import React from 'react'
import '../css/style.css'
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import LoginPage from '../pages/loginPage'
import ForgotPassword from '../pages/forgotPassword'
import VerificationPage from '../pages/verification'
import ResetPassword from '../pages/resetPassword'
import ResetSuccessfull from '../pages/passwordResetSuccessful'
import Navbar from '../components/nav'
import Dashboard from '../pages/dashboard'

const RouterComponent =()=> {
    return (
        <div>
             <Router>
             <Navbar/>
                 <Switch>
                     <Route exact path="/" component={LoginPage}/>
                     <Route exact path="/forgotpassword" component={ForgotPassword}/>
                     <Route exact path="/verification" component={VerificationPage}/>
                     <Route exact path="/resetpassword" component={ResetPassword}/>
                     <Route exact path="/resetsuccessfull" component={ResetSuccessfull}/>
                     <Route exact path="/dashboard" component={Dashboard}/>
                 </Switch>
                
             </Router>   
        </div>
    )
}

export default RouterComponent;
