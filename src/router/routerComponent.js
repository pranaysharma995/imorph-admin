import React from 'react'
import '../css/style.css'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'

import LoginPage from '../pages/loginPage'
import ForgotPassword from '../pages/forgotPassword'
import VerificationPage from '../pages/verification'
import ResetPassword from '../pages/resetPassword'
import ResetSuccessfull from '../pages/passwordResetSuccessful'
import Dashboard from '../pages/dashboard';

const RouterComponent =()=> {
    return (
        <div>
             <Router>
                 <Switch>
                     <Route exact path="/" component={LoginPage}/>
                     <Route  path="/forgotpassword" component={ForgotPassword}/>
                     <Route  path="/verification" component={VerificationPage}/>
                     <Route  path="/resetpassword" component={ResetPassword}/>
                     <Route  path="/resetsuccessfull" component={ResetSuccessfull}/>
                     <Route  path="/dashboard" component={Dashboard}/>
                     
                 </Switch>
                
             </Router>   
        </div>
    )
}

export default RouterComponent;
