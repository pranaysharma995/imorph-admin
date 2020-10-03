import React, {useState,useEffect, useContext} from 'react'
import '../css/style.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Loadable  from 'react-loadable'

// import LoginPage from '../pages/loginPage'
// import ForgotPassword from '../pages/forgotPassword'
// import VerificationPage from '../pages/verification'
// import ResetPassword from '../pages/resetPassword'
// import ResetSuccessfull from '../pages/passwordResetSuccessful'
// import Dashboard from '../pages/dashboard';
import AfterLoginRoute from '../route/afterLoginRoute'
// import ErrorPage from '../pages/notfound/404'

const RouterComponent = () => {

    const [text, setText] = useState('')

    const forgotText = (t) => {
        setText(t)
    }

    const LoginPage = Loadable({
        loader : () => import(/*webpackChunkName: "LoginPage"*/'../pages/loginPage'),
        loading: () => <div className="container text-center"
        style={{ marginTop: "400px",marginBottom: "50%"}}>
            <style>{'body { background-color: #009CB4; }'}</style>
        <div className="spinner-border text-secondary"></div>
    </div>,
    }) 
    const ForgotPassword = Loadable({
        loader : () => import(/*webpackChunkName: "ForgotPassword"*/'../pages/forgotPassword'),
        loading: () => <div className="container text-center"
        style={{ marginTop: "400px",marginBottom: "50%"}}>
            <style>{'body { background-color: #009CB4; }'}</style>
        <div className="spinner-border text-secondary"></div>
    </div>,
    }) 
    const VerificationPage = Loadable({
        loader : () => import(/*webpackChunkName: "VerificationPage"*/'../pages/verification'),
        loading: () => <div className="container text-center"
        style={{ marginTop: "400px",marginBottom: "50%"}}>
            <style>{'body { background-color: #009CB4; }'}</style>
        <div className="spinner-border text-secondary"></div>
    </div>,
    }) 
    const ResetPassword = Loadable({
        loader : () => import(/*webpackChunkName: "ResetPassword"*/'../pages/resetPassword'),
        loading: () => <div className="container text-center"
        style={{ marginTop: "400px",marginBottom: "50%"}}>
            <style>{'body { background-color: #009CB4; }'}</style>
        <div className="spinner-border text-secondary"></div>
    </div>,
    }) 

    const ResetSuccessfull = Loadable({
        loader : () => import(/*webpackChunkName: "ResetSuccessfull"*/'../pages/passwordResetSuccessful'),
        loading: () => <div className="container text-center"
        style={{ marginTop: "400px",marginBottom: "50%"}}>
            <style>{'body { background-color: #009CB4; }'}</style>
        <div className="spinner-border text-secondary"></div>
    </div>,
    }) 
    const Dashboard = Loadable({
        loader : () => import(/*webpackChunkName: "Dashboard"*/'../pages/dashboard'),
        loading: () => <div className="container text-center"
        style={{ marginTop: "400px",marginBottom: "50%"}}>
        <div className="spinner-border text-primary"></div>
    </div>,
    }) 

    const ErrorPage = Loadable({
        loader : () => import(/*webpackChunkName: "ErrorPage"*/'../pages/notfound/404'),
        loading: () => <div className="container text-center"
        style={{ marginTop: "400px",marginBottom: "50%"}}>
        <div className="spinner-border text-primary"></div>
    </div>,
    }) 

    return (
        <Router>
            <Switch>

                <Route exact path="/"
                    component={LoginPage}/>
                <Route path="/forgotpassword"><ForgotPassword value={forgotText}/></Route>
                <Route path="/verification"> <VerificationPage value={text}/> </Route>
                <Route path="/resetpassword"> <ResetPassword value={text}/> </Route>
                <Route path="/resetsuccessfull"
                    component={ResetSuccessfull}/>
                <AfterLoginRoute path="/dashboard"
                    component={Dashboard}/>
                <Route component={ErrorPage}/>
            </Switch>

        </Router>
    )
}

export default RouterComponent;
