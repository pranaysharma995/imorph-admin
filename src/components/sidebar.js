import React,{useState,useContext} from 'react'
import {Link , useRouteMatch} from 'react-router-dom'
import profile from '../assets/profile.png'


import AdminContext from '.././context/admin/adminDetailsContext'


function Sidebar() {

    const [active , setActive] = useState(false)
    const [activeCms , setActiveCms] = useState(false)
    const [peofileToggle , setProFileToggle] = useState(false)
    const match = useRouteMatch("/dashboard/users/edit/plan/view")
    const {adminData} = useContext(AdminContext)


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

    const changeProfileAttribute = ()=>{
        if(document.getElementById("profilePP").getAttribute("style") != null){
            setProFileToggle(true)
            document.getElementById("profilePP").removeAttribute('style')
        }else{
            setProFileToggle(false)
            document.getElementById("profilePP").setAttribute("style" , "display: none")
           
        }
       
    }


    return (
        <div id="sidebar" className="container sidebar" >

                <div id="ee" className="row mb-2 nav__profile sildeBar__inactive " style={{position: 'relative'}} onClick={changeProfileAttribute}  >
                    <button type="button" className="nav__dropDownBtn nav-link m-auto">
                            <img width="50rem" height="50px" className= "rounded-circle" src={adminData ? "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/"+adminData.profileImage :profile} alt="profile"/>
                    </button>
                </div>

                <div className="sidebar__settingDiv1 nav__profile p-2 mb-4" id="profilePP" style={{display : "none" , fontSize : "0.3em"}}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px";
                    changeProfileAttribute()}}>
                    <h6 style={{color :"white"}}>{adminData && `${adminData.firstName} ${adminData.lastName}`}</h6>
                    <p style={{ color :"white" , fontSize : "12px" , marginBottom : '0px'}}>Admin</p>
                            <hr style={{ backgroundColor : "white" , marginTop : "0px" , marginBottom : "0px"}}/>
                    
                    <Link to="/dashboard/profile" >
                        <div className="d-flex nav__link p-1" >
                            <i style={{marginTop : "4px" , marginRight : "10px"}} className="fa fa-user-o" aria-hidden="true"></i>
                            <p style={{marginBottom : '0px'}}>Profile</p>
                        </div>
                    </Link>
                    <Link to="/"  type="button" data-toggle="modal" data-target="#myModal"> 
                    <div className="d-flex nav__link p-1">
                            <i style={{marginTop : "4px" , marginRight : "10px" }} className="fa fa-power-off" aria-hidden="true"></i>
                            <p style={{marginBottom : '0px'}}>Logout</p>
                        </div>
                    </Link>   
                </div>
           
                <div className={/^\/dashboard$/.test(window.location.pathname) ? " row mb-4 mt-2 sildeBar__active" : "row mb-4 mt-2 sildeBar__inactive"}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px"}} >
                    <svg width="20px" height="20px" style={{margin: "0px 10px 3px 0px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.912 476.912"><path fill="#fff" d="M461.776 209.408L249.568 4.52c-6.182-6.026-16.042-6.026-22.224 0L15.144 209.4a16 16 0 0 0-4.888 11.512c0 8.837 7.164 16 16 16h28.2v224c0 8.837 7.163 16 16 16h112c8.837 0 16-7.163 16-16v-128h80v128c0 8.837 7.163 16 16 16h112c8.837 0 16-7.163 16-16v-224h28.2a16 16 0 0 0 11.504-4.88c6.14-6.354 5.97-16.483-.384-22.624zm-39.32 11.504c-8.837 0-16 7.163-16 16v224h-112v-128c0-8.837-7.163-16-16-16h-80c-8.837 0-16 7.163-16 16v128h-112v-224c0-8.837-7.163-16-16-16h-28.2l212.2-204.88 212.28 204.88h-28.28z"/></svg>
                    <Link className={/^\/dashboard$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} to="/dashboard" >Dashboard</Link>
                </div>

                <div className={/^\/dashboard\/users$/.test(window.location.pathname) || /^\/dashboard\/users\/edit$/.test(window.location.pathname) ||  match ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive"}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px"}} >
                    <svg  width="20px" height="20px" style={{margin: "0px 10px 3px 0px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M256 288.389c-153.837 0-238.56 72.776-238.56 204.925 0 10.321 8.365 18.686 18.686 18.686h439.747c10.321 0 18.686-8.365 18.686-18.686.001-132.142-84.722-204.925-238.559-204.925zM55.492 474.628c7.35-98.806 74.713-148.866 200.508-148.866s193.159 50.06 200.515 148.866H55.492zM256 0c-70.665 0-123.951 54.358-123.951 126.437 0 74.19 55.604 134.54 123.951 134.54s123.951-60.35 123.951-134.534C379.951 54.358 326.665 0 256 0zm0 223.611c-47.743 0-86.579-43.589-86.579-97.168 0-51.611 36.413-89.071 86.579-89.071 49.363 0 86.579 38.288 86.579 89.071 0 53.579-38.836 97.168-86.579 97.168z"/></svg>
                    <Link className={/^\/dashboard\/users$/.test(window.location.pathname) || /^\/dashboard\/users\/edit$/.test(window.location.pathname) || match ? "sidebar__link" : "sidebar__linkInActive"}  to="/dashboard/users">Users</Link>
                </div>

                <div className={/^\/dashboard\/inquiries$/.test(window.location.pathname) || /^\/dashboard\/inquiries\/view$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive"}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px"}}>
                    
                    <svg width="20px" height="20px" style={{margin: "0px 10px 3px 0px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001"><path fill="#fff" d="M509.989 463.656L474.84 361.363c16.906-34.174 25.847-72.265 25.907-110.593.102-66.002-25.435-128.411-71.909-175.727C382.357 27.718 320.418 1.08 254.433.033c-34.571-.555-68.117 5.815-99.757 18.912-30.517 12.633-57.884 30.932-81.34 54.388-23.457 23.456-41.756 50.823-54.388 81.34C5.851 186.313-.512 219.876.035 254.43c1.045 65.985 27.684 127.924 75.009 174.406 47.224 46.383 109.472 71.912 175.332 71.911h.394c38.328-.06 76.419-9.001 110.594-25.907l102.293 35.149A36.74 36.74 0 00475.611 512c9.474 0 18.69-3.722 25.678-10.712 9.929-9.929 13.264-24.349 8.7-37.632zm-30.165 16.168c-1.007 1.007-3.163 2.535-6.304 1.457l-108.394-37.246a15.172 15.172 0 00-12.03.938c-31.327 16.573-66.727 25.363-102.374 25.417-119.55.193-218.442-96.91-220.336-216.441-.953-60.139 21.923-116.66 64.414-159.151 42.491-42.49 98.995-65.362 159.151-64.411 119.53 1.895 216.625 100.738 216.439 220.336-.056 35.648-8.845 71.048-25.417 102.373a15.178 15.178 0 00-.938 12.03l37.246 108.394c1.079 3.139-.449 5.298-1.457 6.304z"/><path fill="#fff" d="M247.91 362.748c-7.939 0-15.545 6.981-15.178 15.178.368 8.223 6.669 15.178 15.178 15.178 7.939 0 15.545-6.981 15.178-15.178-.368-8.224-6.669-15.178-15.178-15.178zM247.91 127.674c-41.639 0-75.515 33.876-75.515 75.515 0 8.382 6.796 15.178 15.178 15.178s15.178-6.796 15.178-15.178c0-24.9 20.259-45.159 45.159-45.159s45.159 20.259 45.159 45.159-20.259 45.159-45.159 45.159c-8.382 0-15.178 6.796-15.178 15.178v61.905c0 8.382 6.796 15.178 15.178 15.178 8.382 0 15.178-6.795 15.178-15.179v-48.259c34.389-7.045 60.337-37.54 60.337-73.982 0-41.639-33.876-75.515-75.515-75.515z"/></svg>
                    <Link className={/^\/dashboard\/inquiries$/.test(window.location.pathname) || /^\/dashboard\/inquiries\/view$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} to="/dashboard/inquiries">Enquiries</Link>
                </div>

                <div id="s" className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname) || /^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row  mb-4 sildeBar__inactive "} style={{position: 'relative'}} onClick={changeAttribute}>
                    {active ? (<i className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname) || /^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? "fa fa-chevron-down sidebar__rightIconActive" : "fa fa-chevron-down sidebar__rightIcon"} aria-hidden="true"></i>) : (<i className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname) || /^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? "fa fa-chevron-right  sidebar__rightIconActive " : "fa fa-chevron-right sidebar__rightIcon"} aria-hidden="true"></i>)}
                    <svg width="20px" height="20px" style={{margin: "0px 10px 3px 0px"}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368 368"><path fill="#fff" d="M344 144h-29.952c-2.512-8.2-5.8-16.12-9.792-23.664l21.16-21.16c4.528-4.528 7.024-10.56 7.024-16.984 0-6.416-2.496-12.448-7.024-16.976l-22.64-22.64c-9.048-9.048-24.888-9.072-33.952 0l-21.16 21.16A135.753 135.753 0 00224 53.944V24c0-13.232-10.768-24-24-24h-32c-13.232 0-24 10.768-24 24v29.952c-8.2 2.52-16.12 5.8-23.664 9.792l-21.168-21.16c-9.36-9.36-24.592-9.36-33.952 0l-22.648 22.64c-9.352 9.36-9.352 24.592 0 33.952l21.16 21.168a135.753 135.753 0 00-9.792 23.664H24c-13.232 0-24 10.768-24 24v32C0 213.232 10.768 224 24 224h29.952c2.52 8.2 5.8 16.12 9.792 23.664l-21.16 21.168c-9.36 9.36-9.36 24.592 0 33.952l22.64 22.648c9.36 9.352 24.592 9.352 33.952 0l21.168-21.16a135.753 135.753 0 0023.664 9.792V344c0 13.232 10.768 24 24 24h32c13.232 0 24-10.768 24-24v-29.952c8.2-2.52 16.128-5.8 23.664-9.792l21.16 21.168c9.072 9.064 24.912 9.048 33.952 0l22.64-22.64c4.528-4.528 7.024-10.56 7.024-16.976 0-6.424-2.496-12.448-7.024-16.976l-21.16-21.168A135.753 135.753 0 00314.056 224H344c13.232 0 24-10.768 24-24v-32c0-13.232-10.768-24-24-24zm8 56c0 4.408-3.584 8-8 8h-36a8.002 8.002 0 00-7.744 6c-2.832 10.92-7.144 21.344-12.832 30.976a8.01 8.01 0 001.232 9.72l25.44 25.448a7.948 7.948 0 012.336 5.664c0 2.152-.832 4.16-2.336 5.664l-22.64 22.64c-3.008 3.008-8.312 3.008-11.328 0l-25.44-25.44c-2.576-2.584-6.576-3.08-9.728-1.232-9.616 5.68-20.04 10-30.968 12.824A7.988 7.988 0 00208 308v36c0 4.408-3.584 8-8 8h-32c-4.408 0-8-3.592-8-8v-36a8.002 8.002 0 00-6-7.744 119.948 119.948 0 01-30.976-12.824 7.915 7.915 0 00-4.064-1.112c-2.072 0-4.12.8-5.664 2.344l-25.44 25.44a8.025 8.025 0 01-11.328 0l-22.64-22.64c-3.128-3.128-3.128-8.208 0-11.328l25.44-25.44a7.99 7.99 0 001.232-9.72c-5.68-9.632-10-20.048-12.824-30.976A7.986 7.986 0 0060 208H24c-4.408 0-8-3.592-8-8v-32c0-4.408 3.592-8 8-8h36a8.002 8.002 0 007.744-6 119.948 119.948 0 0112.824-30.976 7.988 7.988 0 00-1.232-9.72l-25.44-25.44c-3.12-3.12-3.12-8.2 0-11.328l22.64-22.64c3.128-3.128 8.2-3.12 11.328 0l25.44 25.44a7.978 7.978 0 009.72 1.232c9.632-5.68 20.048-10 30.976-12.824A8.002 8.002 0 00160 60V24c0-4.408 3.592-8 8-8h32c4.416 0 8 3.592 8 8v36a8.002 8.002 0 006 7.744 119.827 119.827 0 0130.968 12.824c3.152 1.856 7.152 1.36 9.728-1.232l25.44-25.44c3.016-3.024 8.32-3.016 11.328 0l22.64 22.64c1.504 1.504 2.336 3.52 2.336 5.664s-.832 4.16-2.336 5.664l-25.44 25.44a8.002 8.002 0 00-1.232 9.72c5.688 9.632 10 20.048 12.832 30.976a7.986 7.986 0 007.736 6h36c4.416 0 8 3.592 8 8v32z"/><pat fill="#fff" d="M184 112c-39.696 0-72 32.304-72 72s32.304 72 72 72c39.704 0 72-32.304 72-72s-32.296-72-72-72zm0 128c-30.88 0-56-25.12-56-56s25.12-56 56-56c30.872 0 56 25.12 56 56s-25.128 56-56 56z"/></svg>
                    <label className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname)  || /^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} style={{marginBottom : "0px"}}>Settings</label>
                </div>
                <div className="sidebar__settingDiv mb-4" id="settings" style={{display : "none"}}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px";
                    changeAttribute()}}>
                    <div style={{paddingTop : " 15px"}}>
                        <Link className={/^\/dashboard\/settings\/sociallinks$/.test(window.location.pathname) ? "sidebarCms__linkActive" : "sidebarCms__linkInActive"} style={{marginLeft : "15%" , marginTop : "40%"}} to={'/dashboard/settings/sociallinks'}>Social Media Links</Link><br/>                        
                    </div>
                    <div style={{paddingTop : " 10px"}}>
                        <Link className={/^\/dashboard\/settings\/imagesettings$/.test(window.location.pathname) ? "sidebarCms__linkActive" : "sidebarCms__linkInActive"} style={{marginLeft : "15%" , marginTop : "40%"}} to={'/dashboard/settings/imagesettings'}>Image Settings</Link>
                    </div>
                </div>

                <div className={/^\/dashboard\/subscription$/.test(window.location.pathname) || /^\/dashboard\/subscription\/create$/.test(window.location.pathname) || /^\/dashboard\/subscription\/edit$/.test(window.location.pathname) ? " row mb-4 sildeBar__active" : "row mb-4 sildeBar__inactive"}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px"}} >
                    <svg width="20px" height="20px" style={{margin: "0px 10px 3px 0px"}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.075 405.075"><path fill="#fff" d="M373.488 337.075l-59.2-104c6-2.8 9.6-9.2 9.2-16.4l-4.4-36.8 25.2-26.4c5.6-5.6 6-15.2.4-22l-25.2-27.2 5.2-37.2c.8-8-4.8-16-12.8-17.6l-36.4-7.2-17.6-32.4c-3.6-7.6-12.4-10.8-20.4-7.6h-.4l-33.6 15.6-32.8-16c-3.6-2-8-2.4-12-1.2s-7.2 4-9.2 7.6l-18 32.4-36.4 6.4c-8.4 1.6-14 9.2-13.2 18l4.4 36.8-25.2 26.4c-5.6 5.6-6 15.2-.4 22l25.2 27.2-5.2 37.2c-.8 7.2 3.6 14 10.4 16.8l-59.6 105.6c-1.6 2.4-1.2 5.6 0 8 1.6 2.4 4 4 6.8 4h64l29.2 50.8c1.6 2.4 4 4 6.8 4s5.6-1.6 6.8-4l57.2-97.6 57.2 98.8c1.6 2.4 4 4 6.8 4s5.6-1.6 6.8-4l29.2-52h64c2.8 0 5.6-1.6 6.8-4 2-2.4 2-5.6.4-8zm-234.8 42.8l-24.8-42.8c-1.6-2.4-4-4-6.8-4h-55.2l55.2-97.6 22.8 4 17.6 32.4c3.6 7.6 12.4 10.8 20.4 7.6h.4l16.4-7.6 8 14-54 94zm23.2-114.8h-.4l-17.6-33.2c-2.4-4-6.4-7.2-11.2-7.6l-36.8-6.8 5.2-36.8c.8-4.8-.8-10-4-13.2l-24.8-27.2 25.2-26.4c3.6-3.6 5.2-8.4 4.4-13.2l-4.4-36.4s0-.4.4-.8l36.4-6.4c4.4-.8 8.8-3.6 11.2-8l18-32.4 32.8 16c4.4 2.4 10 2.4 14.4 0l33.2-15.2h.4l17.6 33.2c2.4 4 6.4 7.2 10.8 7.6l36.4 7.2-5.2 36.8c-.8 4.8.8 10 4 13.2l25.2 27.2-25.6 26.4c-3.6 3.6-5.2 8.4-4.4 13.2l4.4 36.8-36 6c-4.4.8-8.8 3.6-11.2 8l-18 32.4-32.8-16c-4.4-2.4-10-2.4-14.4 0l-33.2 15.6zm136 68c-2.8 0-5.6 1.6-6.8 4l-24.8 44-56.4-97.6c-.4-1.2-.8-2-1.6-2.8l-8.8-15.6 2.8-1.2 32.8 16c2.4 1.2 4.8 1.6 7.2 1.6 5.6 0 11.2-2.8 14-8l18-32.4 24-4.4 54.8 96.4h-55.2z"/><path fill="#fff" d="M282.288 141.075c0-44-36-80-80-80s-80 36-80 80 36 80 80 80 80-36 80-80zm-80 64c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z"/></svg>
                    <Link className={/^\/dashboard\/subscription$/.test(window.location.pathname) || /^\/dashboard\/subscription\/create$/.test(window.location.pathname) ||/^\/dashboard\/subscription\/edit$/.test(window.location.pathname)  ? "sidebar__link" : "sidebar__linkInActive"}  to="/dashboard/subscription">Subscription Plans</Link>
                </div>

                <div id="c" className= {/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? " row mb-2 sildeBar__active" : "row mb-4 sildeBar__inactive "}  style={{position: 'relative'}} onClick={changeCmsAttribute}  >
                {activeCms ? (<i className=  {/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? "fa fa-chevron-down sidebar__rightIconActive" : "fa fa-chevron-down sidebar__rightIcon" } aria-hidden="true"></i>) : (<i className={/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname)? "fa fa-chevron-right sidebar__rightIconActive" : "fa fa-chevron-right sidebar__rightIcon"} aria-hidden="true"></i>)}
                   <svg width="20px" height="20px" style={{margin: "0px 10px 3px 0px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.333 469.333"><circle fill="#fff" cx="53.333" cy="53.333" r="10.667"/><circle fill="#fff" cx="96" cy="53.333" r="10.667"/><circle fill="#fff" cx="138.667" cy="53.333" r="10.667"/><path fill="#fff" d="M426.667 0h-384C19.146 0 0 19.135 0 42.667v384c0 23.531 19.146 42.667 42.667 42.667h384c23.521 0 42.667-19.135 42.667-42.667v-384C469.333 19.135 450.188 0 426.667 0zM448 426.667c0 11.76-9.563 21.333-21.333 21.333h-384c-11.771 0-21.333-9.573-21.333-21.333v-320H448v320zm0-341.334H21.333V42.667c0-11.76 9.563-21.333 21.333-21.333h384c11.771 0 21.333 9.573 21.333 21.333v42.666z"/><path fill="#fff" d="M125.417 309.01l20.438 5.115L135 332.188a10.667 10.667 0 001.604 13.031l30.188 30.167a10.702 10.702 0 0013.042 1.604l18.042-10.833 5.104 20.438a10.676 10.676 0 0010.354 8.073H256c4.896 0 9.167-3.333 10.354-8.073l5.104-20.438L289.5 376.99a10.702 10.702 0 0013.042-1.604l30.167-30.167a10.667 10.667 0 001.604-13.031l-10.833-18.063 20.438-5.115a10.663 10.663 0 008.083-10.344V256c0-4.896-3.333-9.156-8.083-10.344l-20.438-5.115 10.833-18.063a10.667 10.667 0 00-1.604-13.031l-30.167-30.167c-3.479-3.49-8.854-4.104-13.042-1.604l-18.042 10.833-5.104-20.438A10.676 10.676 0 00256 160h-42.667a10.675 10.675 0 00-10.354 8.073l-5.104 20.438-18.042-10.833c-4.188-2.5-9.563-1.885-13.042 1.604l-30.188 30.167a10.667 10.667 0 00-1.604 13.031l10.854 18.063-20.438 5.115a10.663 10.663 0 00-8.083 10.344v42.667a10.664 10.664 0 008.085 10.341zm13.25-44.687l18.313-4.583a10.679 10.679 0 007.5-6.854c.938-2.719 1.979-5.375 3.25-7.948a10.713 10.713 0 00-.458-10.156l-9.688-16.135 18.396-18.396 16.125 9.688a10.708 10.708 0 0010.167.448c2.583-1.26 5.25-2.302 7.979-3.25a10.68 10.68 0 006.833-7.479l4.583-18.323h26l4.583 18.323a10.681 10.681 0 006.833 7.479c2.729.948 5.396 1.99 7.979 3.25 3.229 1.563 7.063 1.385 10.167-.448l16.125-9.677 18.375 18.385-9.667 16.135a10.713 10.713 0 00-.458 10.156c1.271 2.594 2.313 5.271 3.271 8.01 1.188 3.375 4 5.927 7.479 6.792l18.313 4.583v26.021l-18.313 4.583a10.647 10.647 0 00-7.479 6.792c-.958 2.74-2 5.417-3.271 8.01a10.713 10.713 0 00.458 10.156l9.667 16.135-18.375 18.385-16.125-9.677a10.648 10.648 0 00-10.167-.448c-2.583 1.26-5.25 2.302-7.979 3.25a10.68 10.68 0 00-6.833 7.479l-4.583 18.323h-26l-4.583-18.323a10.681 10.681 0 00-6.833-7.479c-2.729-.948-5.396-1.99-7.979-3.25a10.618 10.618 0 00-10.167.448l-16.125 9.688-18.396-18.396 9.688-16.135a10.713 10.713 0 00.458-10.156c-1.271-2.573-2.313-5.229-3.25-7.948a10.68 10.68 0 00-7.5-6.854l-18.313-4.583v-26.021z"/><path fill="#fff" d="M234.667 330.667c29.417 0 53.333-23.927 53.333-53.333S264.083 224 234.667 224s-53.333 23.927-53.333 53.333 23.916 53.334 53.333 53.334zm0-85.334c17.646 0 32 14.354 32 32s-14.354 32-32 32-32-14.354-32-32 14.354-32 32-32z"/></svg>
                    
                    <label className={/^\/dashboard\/aboutus$/.test(window.location.pathname) || /^\/dashboard\/tos$/.test(window.location.pathname) || /^\/dashboard\/faq$/.test(window.location.pathname) ? "sidebar__link" : "sidebar__linkInActive"} style={{marginBottom : "0px"}}>CMS Settings</label>
                </div>
                <div className="sidebar__settingDiv1" id="cms" style={{display : "none" , fontSize : "0.3em"}}  onClick={() => {
                    document.getElementById("rotatebutton").removeAttribute('style')
                    document.getElementById("sidebar").style.marginLeft="-240px";
                    changeCmsAttribute()}}>
                    <div style={{paddingTop : " 13px"}}>
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
