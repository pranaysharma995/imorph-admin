import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import enquiries from '../assets/icons/enquiries/color/question.png'
import enquiriesColor from '../assets/icons/enquiries/question@2x.png'
import userColor from '../assets/icons/user/sidebar/user (5)@2x.png'
import user from '../assets/icons/user/whitecolor/user (5).png'
import settings from '../assets/icons/setting/settings.png'
import settingsColor from '../assets/icons/setting/color/settings.png'
import sunscription from '../assets/icons/subscription/white-color/medal.png'
import sunscriptionColor from '../assets/icons/subscription/sidebarcolor/medal.png'
import cmsSettings from '../assets/icons/cms-setting/icons8-window-settings-100.png'
import cmsSettingsColor from '../assets/icons/cms-setting/color/icons8-window-settings-100.png'
import home from '../assets/icons/home/whitecolor/home-run (2).png'
import homeColor from '../assets/icons/home/home-run (2).png'

function Sidebar() {

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
        <div id="sidebar" className="container sidebar" >
           
                <div className={/^\/dashboard$/.test(window.location.pathname) ? " row mb-4 mt-3 sildeBar__active" : "row mb-4 mt-3 sildeBar__inactive"}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px"}} >
                {/^\/dashboard$/.test(window.location.pathname)  ? <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={homeColor} alt="home"/> : <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={home} alt="home"/>}
                    <Link className={/^\/dashboard$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} to="/dashboard" >Dashboard</Link>
                </div>

                <div className={/^\/dashboard\/users$/.test(window.location.pathname) || /^\/dashboard\/users\/edit$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive"}  onClick={() => document.getElementById("sidebar").style.marginLeft="-240px"} >
                    {/^\/dashboard\/users$/.test(window.location.pathname) || /^\/dashboard\/users\/edit$/.test(window.location.pathname) ? <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={userColor} alt="enquaries"/> : <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={user} alt="enquaries"/>}
                    <Link className={/^\/dashboard\/users$/.test(window.location.pathname) || /^\/dashboard\/users\/edit$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"}  to="/dashboard/users">Users</Link>
                </div>

                <div className={/^\/dashboard\/inquiries$/.test(window.location.pathname) || /^\/dashboard\/inquiries\/view$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive"}  onClick={() => document.getElementById("sidebar").style.marginLeft="-240px"}>
                    
                    {/^\/dashboard\/inquiries$/.test(window.location.pathname) || /^\/dashboard\/inquiries\/view$/.test(window.location.pathname) ? <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={enquiries} alt="enquaries"/> : <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={enquiriesColor} alt="enquaries"/>}
                    <Link className={/^\/dashboard\/inquiries$/.test(window.location.pathname) || /^\/dashboard\/inquiries\/view$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} to="/dashboard/inquiries">Enquiries</Link>
                </div>

                <div id="s" className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname) || /^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? " row mb-2 sildeBar__active" : "row  mb-4 sildeBar__inactive "} style={{position: 'relative'}} onClick={changeAttribute}>
                    {active ? (<i className="fa fa-chevron-down sidebar__rightIcon" aria-hidden="true"></i>) : (<i className="fa fa-chevron-right sidebar__rightIcon" aria-hidden="true"></i>)}
                    {/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname) || /^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={settingsColor} alt="settings"/> : <img width="20rem" height="20rem" className="mr-3" style={{background :"transparent" , marginTop : "2px"}} src={settings} alt="setting2"/>}
                    <label className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname)  || /^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} style={{marginBottom : "0px"}}>Settings</label>
                </div>
                <div className="sidebar__settingDiv" id="settings" style={{display : "none"}}  onClick={() => document.getElementById("sidebar").style.marginLeft="-240px"}>
                    <div style={{paddingTop : " 10px"}}>
                        <Link className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname) ? "sidebarCms__linkActive" : "sidebarCms__linkInActive"} style={{marginLeft : "20%" , marginTop : "40%"}} to={'/dashboard/settings/sociallinks'}>Social Media Links</Link><br/>                        
                    </div>
                    <div style={{paddingTop : " 10px"}}>
                        <Link className={/^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? "sidebarCms__linkActive" : "sidebarCms__linkInActive"} style={{marginLeft : "20%" , marginTop : "40%"}} to={'/dashboard/settings/imagesettings'} style={{marginLeft : "40px"}}>Image Settings</Link>
                    </div>
                </div>

                <div className={/^\/dashboard\/subscription$/.test(window.location.pathname) || /^\/dashboard\/subscription\/create$/.test(window.location.pathname) || /^\/dashboard\/subscription\/edit$/.test(window.location.pathname) ? " row mb-4 mt-1 sildeBar__active" : "row mb-4 mt-4 sildeBar__inactive"}  onClick={() => document.getElementById("sidebar").style.marginLeft="-240px"} >
                {/^\/dashboard\/subscription$/.test(window.location.pathname) || /^\/dashboard\/subscription\/create$/.test(window.location.pathname) || /^\/dashboard\/subscription\/edit$/.test(window.location.pathname)  ? <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={sunscriptionColor} alt="enquaries"/> : <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={sunscription} alt="enquaries"/>}
                    <Link className={/^\/dashboard\/subscription$/.test(window.location.pathname) || /^\/dashboard\/subscription\/create$/.test(window.location.pathname) ||/^\/dashboard\/subscription\/edit$/.test(window.location.pathname)  ? "sidebar__link" : "sidebar__linkInActive"}  to="/dashboard/subscription">Subscription Plans</Link>
                </div>

                <div id="c" className= {/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive "}  style={{position: 'relative'}} onClick={changeCmsAttribute}  >
                {activeCms ? (<i className=  "fa fa-chevron-down sidebar__rightIcon"  aria-hidden="true"></i>) : (<i className="fa fa-chevron-right sidebar__rightIcon" aria-hidden="true"></i>)}
                    {/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? <img width="20rem" height="20rem" className="mr-3 " style={{background :"transparent"}} src={cmsSettingsColor} alt="settings"/> : <img width="20rem" height="20rem" className="mr-3" style={{background :"transparent" , marginTop : "2px"}} src={cmsSettings} alt="setting2"/>}
                    <label className={/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} style={{marginBottom : "0px"}}>CMS Settings</label>
                </div>
                <div className="sidebar__settingDiv1" id="cms" style={{display : "none" , fontSize : "0.3em"}}  onClick={() => document.getElementById("sidebar").style.marginLeft="-240px"}>
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
