import React,{useState} from 'react'
import '../css/style.css'
import {BrowserRouter as Router , Switch , Route, Redirect} from 'react-router-dom'

import LoginPage from '../pages/loginPage'
import ForgotPassword from '../pages/forgotPassword'
import VerificationPage from '../pages/verification'
import ResetPassword from '../pages/resetPassword'
import ResetSuccessfull from '../pages/passwordResetSuccessful'
import Dashboard from '../pages/dashboard';
import AfterLoginRoute from '../route/afterLoginRoute'

const RouterComponent =()=> {

    const [text , setText] = useState('')

    const forgotText = (t) => {
        setText(t)
    }
    return (
             <Router>
                 <Switch> 
                     
                     <Route exact path="/" component={LoginPage}/>
                     <Route  path="/forgotpassword" component={() => <ForgotPassword value={forgotText}/>}/>
                     <Route  path="/verification" component={() => <VerificationPage value={text}/>}/>
                     <Route  path="/resetpassword" component={() => <ResetPassword value={text}/>}/>
                     <Route  path="/resetsuccessfull" component={ResetSuccessfull}/>
                     <AfterLoginRoute  path="/dashboard" component={Dashboard}/>
                     
                 </Switch>
                
             </Router>   
    )
}

export default RouterComponent;
