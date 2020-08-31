import React from 'react'
import Navbar from '../components/nav'
import Sidebar from '../components/sidebar'
import {Switch , Route} from 'react-router-dom'
import Footer from '../components/footer'
import ProfilePage from './dashboard/profilePage'
import UsersPage from './dashboard/users/user'
import UserProfileView from './dashboard/users/userProfileView'
import DashboardPage  from './dashboard/dashboardPage'


function Dashboard() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Navbar/>
                </div>
                <div className="col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-md-10 ">
                    <Switch>
                   
                            <Route exact  path="/dashboard"  component={DashboardPage}/>
                            <Route  path="/dashboard/profile"  component={ProfilePage}/>
                            <Route exact  path="/dashboard/users"  component={UsersPage}/>
                            <Route   path="/dashboard/users/view"  component={UserProfileView}/>
                    </Switch>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
