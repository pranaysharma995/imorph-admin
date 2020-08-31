import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {matchPath} from 'react-router-dom'

function Sidebar(props) {

    const [active , setActive] = useState(false)

    const changeAttribute = ()=>{
        if(document.getElementById("settings").getAttribute("style") != null){
            setActive(true)
            document.getElementById("settings").removeAttribute('style')
        }else{
            setActive(false)
            document.getElementById("settings").setAttribute("style" , "display: none")
        }
       
    }

    return (
        <div className="container sidebar">
           
                <div className={/^\/dashboard$/.test(window.location.pathname) ? " row mb-4 mt-3 sildeBar__active" : "row mb-4 mt-3 sildeBar__inactive"} >
                    <i className="fa fa-home fa-lg  mr-3 mt-1" aria-hidden="true"></i>
                    <Link className={/^\/dashboard$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} to="/dashboard" >Dashboard</Link>
                </div>

                <div className={/^\/dashboard\/users$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive"} >
                    <i className="fa fa-user-o fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className={/^\/dashboard\/users$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"}  to="/dashboard/users">Users</Link>
                </div>

                <div className="row  mb-4 sildeBar__inactive">
                    <i className="fa fa-question-circle-o text-white fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >Inquiries</Link>
                </div>

                <div className="row  sildeBar__inactive" style={{position: 'relative'}} onClick={changeAttribute}>
                    {active ? (<i className="fa fa-chevron-down sidebar__rightIcon" aria-hidden="true"></i>) : (<i className="fa fa-chevron-right sidebar__rightIcon" aria-hidden="true"></i>)}
                    <i className="fa fa-cog text-white fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >Settings</Link>
                </div>
                <div className="sidebar__settingDiv" id="settings" style={{display : "none"}}>
                    <Link className="text-white sidebar__link" style={{marginLeft : "40px"}}>Social Media Links</Link><br/>
                    <Link className="text-white sidebar__link" style={{marginLeft : "40px"}}>Image Settings</Link>
                </div>

                <div className="row  mb-4 sildeBar__inactive mt-4" >
                    <i className="fa fa-home text-white fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >Subscription Plans</Link>
                </div>

                <div className="row  mb-4 sildeBar__inactive" >
                    <i className="fa fa-home text-white fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >CMS Settings</Link>
                </div>
                
         </div>
      
    )
}

export default Sidebar;
