import React,{useState} from 'react'
import {Link} from 'react-router-dom'

function Sidebar(props) {

    const [active , setActive] = useState(false)
    const [activeCms , setActiveCms] = useState(false)



    const changeAttribute = ()=>{
        if(document.getElementById("settings").getAttribute("style") != null){
            setActive(true)
            document.getElementById("settings").removeAttribute('style')
        }else{
            setActive(false)
            document.getElementById("settings").setAttribute("style" , "display: none")
        }
       
    }

    const changeCmsAttribute = ()=>{
        if(document.getElementById("cms").getAttribute("style") != null){
            setActiveCms(true)
            document.getElementById("cms").removeAttribute('style')
        }else{
            setActiveCms(false)
            document.getElementById("cms").setAttribute("style" , "display: none")
        }
       
    }

    return (
        <div className="container sidebar" >
           
                <div className={/^\/dashboard$/.test(window.location.pathname) ? " row mb-4 mt-3 sildeBar__active" : "row mb-4 mt-3 sildeBar__inactive"} >
                    <i className="fa fa-home fa-lg  mr-3 mt-1" aria-hidden="true"></i>
                    <Link className={/^\/dashboard$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} to="/dashboard" >Dashboard</Link>
                </div>

                <div className={/^\/dashboard\/users$/.test(window.location.pathname) || /^\/dashboard\/users\/edit$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive"} >
                    <i className="fa fa-user-o fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className={/^\/dashboard\/users$/.test(window.location.pathname) || /^\/dashboard\/users\/edit$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"}  to="/dashboard/users">Users</Link>
                </div>

                <div className="row  mb-4 sildeBar__inactive">
                    <i className="fa fa-question-circle-o text-white fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className="text-white sidebar__link" >Inquiries</Link>
                </div>

                <div id="s" className="row  sildeBar__inactive" style={{position: 'relative'}} onClick={changeAttribute}>
                    {active ? (<i className="fa fa-chevron-down sidebar__rightIcon" aria-hidden="true"></i>) : (<i className="fa fa-chevron-right sidebar__rightIcon" aria-hidden="true"></i>)}
                    <i className="fa fa-cog text-white fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className="sidebar__linkInActive" >Settings</Link>
                </div>
                <div className="sidebar__settingDiv" id="settings" style={{display : "none"}}>
                    <div style={{paddingTop : " 10px"}}>
                        <Link className="text-white sidebar__link" style={{marginLeft : "20%" , marginTop : "40%"}}>Social Media Links</Link><br/>
                        
                    </div>
                    <div style={{paddingTop : " 10px"}}>
                        <Link className="text-white sidebar__link" style={{marginLeft : "40px"}}>Image Settings</Link>
                    </div>
                </div>

                <div className={/^\/dashboard\/subscription$/.test(window.location.pathname) || /^\/dashboard\/subscription\/create$/.test(window.location.pathname) || /^\/dashboard\/subscription\/edit$/.test(window.location.pathname) ? " row mb-4 mt-3 sildeBar__active" : "row mb-4 mt-3 sildeBar__inactive"} >
                    <i className="fa fa-home fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className={/^\/dashboard\/subscription$/.test(window.location.pathname) || /^\/dashboard\/subscription\/create$/.test(window.location.pathname) ||/^\/dashboard\/subscription\/edit$/.test(window.location.pathname)  ? "sidebar__link" : "sidebar__linkInActive"}  to="/dashboard/subscription">Subscription Plans</Link>
                </div>

                <div id="c" className= {/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive "}  style={{position: 'relative'}} onClick={changeCmsAttribute} >
                {activeCms ? (<i className=  "fa fa-chevron-down sidebar__rightIcon"  aria-hidden="true"></i>) : (<i className="fa fa-chevron-right sidebar__rightIcon" aria-hidden="true"></i>)}
                    <i className="fa fa-home fa-lg mr-3 mt-1" aria-hidden="true"></i>
                    <Link className={/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} >CMS Settings</Link>
                </div>
                <div className="sidebar__settingDiv1" id="cms" style={{display : "none" , fontSize : "0.3em"}}>
                    <div style={{paddingTop : " 10px"}}>
                         <Link className={/^\/dashboard\/aboutus$/.test(window.location.pathname) ? "sidebarCms__linkActive" : "sidebarCms__linkInActive"} to="/dashboard/aboutus" style={{marginLeft : "40px" , fontSize : "1em"}}>About Us</Link>
                    </div>
                    <div style={{paddingTop : " 10px"}}>
                        <Link className={/^\/dashboard\/tos$/.test(window.location.pathname) ? "sidebarCms__linkActive" : "sidebarCms__linkInActive"} to="/dashboard/tos" style={{marginLeft : "40px" , fontSize : "1em"}}>Terms of Service</Link>
                    </div>
                    <div style={{paddingTop : " 10px"}}>
                        <Link className={/^\/dashboard\/faq$/.test(window.location.pathname) ? "sidebarCms__linkActive" : "sidebarCms__linkInActive"} to="/dashboard/faq" style={{marginLeft : "40px" , fontSize : "1em"}}>FAQ</Link>
                    </div>
                </div>
                
         </div>
      
    )
}

export default Sidebar;
