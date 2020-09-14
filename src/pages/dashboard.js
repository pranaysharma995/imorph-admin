import React,{useState} from 'react'
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
import Subscription from './dashboard/subscription/subscription'
import CreateSubscription from './dashboard/subscription/createSubscription'
import EditSubscription from './dashboard/subscription/editSubscription'
import Inquiries from './dashboard/inquiries/inquiries'
import SocialLinks from './dashboard/settings/socialLinks'
import ImageSettings from './dashboard/settings/imageSettings'
import InquiriesView from './dashboard/inquiries/inquiriesView'


function Dashboard() {

    const [subPlan , setSubPlan] = useState(null)

    const getPlan=(plan)=> {
        setSubPlan(plan)
    }

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
                            <Route   path="/dashboard/users/edit/plan/view"  component={UserSubscriptionPlanView}/>
                            <Route   path="/dashboard/aboutus"  component={AboutUs}/>
                            <Route   path="/dashboard/tos"  component={Tos}/>
                            <Route   path="/dashboard/faq"  component={Faq}/>
                            <Route  exact path="/dashboard/subscription"  component={()=> <Subscription plan={getPlan}/>}/>
                            <Route   path="/dashboard/subscription/create"  component={CreateSubscription}/>
                            <Route   path="/dashboard/subscription/edit"  component={()=> <EditSubscription plan={subPlan}/>}/>
                            <Route   exact path="/dashboard/inquiries"  component={Inquiries}/>
                            <Route   path="/dashboard/inquiries/view"  component={InquiriesView}/>
                            <Route   path="/dashboard/settings/sociallinks"  component={SocialLinks}/>
                            <Route   path="/dashboard/settings/imagesettings"  component={ImageSettings}/>
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
