import React from 'react'
import Navbar from '../components/nav'
import Sidebar from '../components/sidebar'
import {Switch , Route} from 'react-router-dom'
import Footer from '../components/footer'
import ProfilePage from './dashboard/profilePage'


function Dashboard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Navbar/>
                </div>
                <div className="col-md-3">
                    <Sidebar/>
                </div>
                <div className="col-md-9">
                    <Switch>
                            <Route exact path="/dashboard/profile"  component={ProfilePage}/>
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
