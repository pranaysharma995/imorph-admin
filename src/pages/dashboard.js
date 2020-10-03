import React,{useState,useEffect,useContext} from 'react'
import Navbar from '../components/nav'
import Sidebar from '../components/sidebar'
import {Switch , Route , Redirect} from 'react-router-dom'
import Footer from '../components/footer'
import DashboardPage  from './dashboard/dashboardPage'
// import ProfilePage from './dashboard/profilePage'
// import UsersPage from './dashboard/users/user'
// import UserProfileView from './dashboard/users/userProfileView'
// import AboutUs from './dashboard/cms/aboutUs'
// import Tos from './dashboard/cms/tos'
// import Faq from './dashboard/cms/faq'
// import UserSubscriptionPlanView from './dashboard/users/userSubscriptionPlanView'
// import Subscription from './dashboard/subscription/subscription'
// import CreateSubscription from './dashboard/subscription/createSubscription'
// import EditSubscription from './dashboard/subscription/editSubscription'
// import Inquiries from './dashboard/inquiries/inquiries'
// import SocialLinks from './dashboard/settings/socialLinks'
// import ImageSettings from './dashboard/settings/imageSettings'
// import InquiriesView from './dashboard/inquiries/inquiriesView'

import axiosInstance from '../axios'
import AdminContext from '../context/admin/adminDetailsContext'

import ImageSettingsContext from '../context/imageSettings/imageSettingsContext'

import Loadable  from 'react-loadable'



function Dashboard() {
    const {setImageSettings} = useContext(ImageSettingsContext);

    const [subPlan , setSubPlan] = useState(null);
    const {setAdminData} = useContext(AdminContext);
    const [reFetchData , setRefetchData] = useState(false)
    const [inqData , setInqData] = useState(false)

    const [refresh, setRefresh] = useState(false)

    // const DashboardPage = Loadable({
    //     loader : () => import('./dashboard/dashboardPage'),
    //     loading: () => <div className="container text-center"
    //     style={{ marginTop: "400px",marginBottom: "50%"}}>
    //     <div className="spinner-border text-primary"></div>
    // </div>,
    // }) 
    const ProfilePage  = Loadable({
            loader : () => import(/*webpackChunkName: "ProfilePage"*/'./dashboard/profilePage'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const UsersPage   = Loadable({
            loader : () => import(/*webpackChunkName: "UsersPage"*/'./dashboard/users/user'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const UserProfileView    = Loadable({
            loader : () => import(/*webpackChunkName: "UserProfileView"*/'./dashboard/users/userProfileView'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const AboutUs      = Loadable({
            loader : () => import(/*webpackChunkName: "AboutUs"*/'./dashboard/cms/aboutUs'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })
        const Tos   = Loadable({
            loader : () => import(/*webpackChunkName: "Tos"*/'./dashboard/cms/tos'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const Faq    = Loadable({
            loader : () => import(/*webpackChunkName: "Faq"*/'./dashboard/cms/faq'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const UserSubscriptionPlanView    = Loadable({
            loader : () => import(/*webpackChunkName: "UserSubscriptionPlanView"*/'./dashboard/users/userSubscriptionPlanView'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const Subscription    = Loadable({
            loader : () => import(/*webpackChunkName: "Subscription"*/'./dashboard/subscription/subscription'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const CreateSubscription     = Loadable({
            loader : () => import(/*webpackChunkName: "CreateSubscription"*/'./dashboard/subscription/createSubscription'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const EditSubscription      = Loadable({
            loader : () => import(/*webpackChunkName: "EditSubscription"*/'./dashboard/subscription/editSubscription'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const Inquiries= Loadable({
            loader : () => import(/*webpackChunkName: "Inquiries"*/'./dashboard/inquiries/inquiries'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const SocialLinks = Loadable({
            loader : () => import(/*webpackChunkName: "SocialLinks"*/'./dashboard/settings/socialLinks'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })


        const ImageSettings  = Loadable({
            loader : () => import(/*webpackChunkName: "ImageSettings"*/'./dashboard/settings/imageSettings'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

        const InquiriesView   = Loadable({
            loader : () => import(/*webpackChunkName: "InquiriesView"*/'./dashboard/inquiries/inquiriesView'),
            loading: () => <div className="container text-center"
            style={{ marginTop: "400px",marginBottom: "50%"}}>
            <div className="spinner-border text-primary"></div>
        </div>,
        })

 
    useEffect(() => {

        let uid = localStorage.getItem('uid') ? localStorage.getItem('uid') : sessionStorage.getItem('uid');
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")
        if (token) {

            axiosInstance.get("/admin/profile", {
                params: {
                    id: uid
                },
                headers : {authorization : `Bearer ${token}`}

            }).then(({data}) => {
                
                console.log("Fetch admin", data);
                setAdminData(data.data)
               
            }).catch(err => console.log("Error in admin context fetch adminDetailsProvider.js", err))
        }
        
    }, [reFetchData])


    useEffect(()=> {
        axiosInstance.get("/admin/image-setting/view").then(({data}) => {

            console.log("Image settings dashboard" , data?.data[0]);
            setImageSettings(data?.data[0]);
        }).catch(error => {
            console.log("Error in routerComponent", error);
        })
       

    },[refresh])


    


  
    const getPlan=(plan)=> {
        setSubPlan(plan)
    }

    const inquaryData=(info)=> {
        setInqData(info)
    }
    
    

    // if((!localStorage.getItem("token") && !localStorage.getItem("uid")) || !localStorage.getItem(""))

    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-12">
                    <Navbar />
                </div>
                <div className="col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-md-12 dashboard__container ">
                    <Switch>
                            <Route exact  path="/dashboard"  component={DashboardPage}/>
                            <Route  path="/dashboard/profile"> <ProfilePage refresh={setRefetchData} refreshValue={reFetchData}/> </Route>
                            <Route exact  path="/dashboard/users"  component={UsersPage}/>
                            <Route  exact path="/dashboard/users/edit"  component={UserProfileView}/>
                            <Route   path="/dashboard/users/edit/plan/view"  component={UserSubscriptionPlanView}/>
                            <Route   path="/dashboard/aboutus"  component={AboutUs}/>
                            <Route   path="/dashboard/tos"  component={Tos}/>
                            <Route   path="/dashboard/faq"  component={Faq}/>
                            <Route  exact path="/dashboard/subscription"> <Subscription plan={getPlan}/> </Route>
                            <Route   path="/dashboard/subscription/create"  component={CreateSubscription}/>
                            <Route   path="/dashboard/subscription/edit"> <EditSubscription plan={subPlan}/> </Route>
                            <Route   exact path="/dashboard/inquiries"><Inquiries data={inquaryData}/></Route>
                            <Route   path="/dashboard/inquiries/view"><InquiriesView data={inqData}/></Route>
                            <Route   path="/dashboard/settings/sociallinks"  component={SocialLinks}/>
                            <Route   path="/dashboard/settings/imagesettings"><ImageSettings setRefresh={setRefresh} refresh={refresh}/></Route>
                    </Switch>
                </div>
                <div  className="col-md-12 dashboard__footer" >
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
