import React from 'react'
import {Link} from 'react-router-dom'
import {matchPath} from 'react-router-dom'

function Sidebar() {

    const match = matchPath("/dashboard")
    console.log(match);

    return (
        <div className="container sidebar">
           
                <div className=" row ml-1 mb-4 mt-3 sildeBar__active" >
                    <i className="fa fa-home fa-lg  mr-3 mt-1" aria-hidden="true"></i>
                    <Link className="sidebar__link" to="/dashboard" >Dashboard</Link>
                </div>

                <div className=" row ml-2 mb-4 sildeBar__inactive" >
                    <i className="fa fa-home fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className=" sidebar__linkInActive" to="/dashboard/users">Users</Link>
                </div>

                <div className=" row ml-2 mb-4" >
                    <i className="fa fa-home text-white mr-3" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >Inquiries</Link>
                </div>

                <div className=" row ml-2 mb-4" >
                    <i className="fa fa-home text-white mr-3" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >Settings</Link>
                </div>

                <div className=" row ml-2 mb-4" >
                    <i className="fa fa-home text-white mr-3" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >Subscription Plans</Link>
                </div>

                <div className=" row ml-2 mb-4" >
                    <i className="fa fa-home text-white mr-3" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >CMS Settings</Link>
                </div>
                
         </div>
      
    )
}

export default Sidebar;
