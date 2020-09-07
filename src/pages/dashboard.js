import React from 'react'
import Navbar from '../components/nav'
import Sidebar from '../components/sidebar'
import {Switch , Route} from 'react-router-dom'
import Footer from '../components/footer'
import ProfilePage from './dashboard/profilePage'
import UsersPage from './dashboard/users/user'
import UserProfileView from './dashboard/users/userProfileView'
import DashboardPage  from './dashboard/dashboardPage'
import AboutUs from './dashboard/cms/aboutUs'
import Tos from './dashboard/cms/tos'
import Faq from './dashboard/cms/faq'
import UserSubscriptionPlanView from './dashboard/users/userSubscriptionPlanView'


function Dashboard() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <Navbar/>
                </div>
                <div className="col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-md-12 " style={{paddingLeft: "250px"}}>
                    <Switch>
                            <Route exact  path="/dashboard"  component={DashboardPage}/>
                            <Route  path="/dashboard/profile"  component={ProfilePage}/>
                            <Route exact  path="/dashboard/users"  component={UsersPage}/>
                            <Route  exact path="/dashboard/users/edit"  component={UserProfileView}/>
                            <Route   path="/dashboard/users/edit/plan/:id"  component={UserSubscriptionPlanView}/>
                            <Route   path="/dashboard/aboutus"  component={AboutUs}/>
                            <Route   path="/dashboard/tos"  component={Tos}/>
                            <Route   path="/dashboard/faq"  component={Faq}/>
                    </Switch>
                </div>
                <div  className="col-md-12" style={{paddingLeft : "12%" , paddingRight : "0"}}>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
