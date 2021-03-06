import React,{useState,useContext} from 'react'
import profile from '../assets/profile.png'
import {Link , useHistory} from 'react-router-dom'
import LogoutPromtModal from '../pages/dashboard/modal/logoutPromtModal'

import AdminContext from '.././context/admin/adminDetailsContext'
import ImageSettingsContext from '../context/imageSettings/imageSettingsContext'

import axiosInstance from '../axios'


const Navbar =() =>{

    const history = useHistory();
    const {adminData} = useContext(AdminContext)
    const {imageSettings} = useContext(ImageSettingsContext)
    const [rotate , setRotate] = useState(false)
    
    const logout= e => {
        e.preventDefault();

        axiosInstance.get("/admin/sign-out").then(()=> {
            if(localStorage.getItem('uid')){
                localStorage.removeItem("uid")
                localStorage.removeItem("token")
            }
            if(sessionStorage.getItem("uid")){
                sessionStorage.removeItem("uid")
                sessionStorage.removeItem("token")
            }

            return history.push("/")
        }).catch(error => {
            console.log("Error in sign out nav.js",error );
        })

        
    }

    const toggleSideBar=e=> {
        e.preventDefault();
        
        
        console.log(document.getElementById("sidebar").style.getPropertyValue('visibility'));
        if(document.getElementById("sidebar").style.getPropertyValue('margin-left')== '0px'){
            document.getElementById("sidebar").style.marginLeft="-240px"
            setRotate(false)
        }else{
            document.getElementById("rotatebutton").style.transform = "rotate(90deg)"
            document.getElementById("sidebar").style.marginLeft="0px"
            setRotate(true)
        }
    }

    return (
        <>
                <nav className="navbar navbar-expand-sm bg-white navbar-light fixed-top navbar__component">
                    <button id="rotatebutton" className="navbar__togglebtn" style={{transform:rotate && "rotate(90deg)"}} onClick={toggleSideBar}><i className="fa fa-bars fa-2x" aria-hidden="true"></i></button>
                    <div className="navbar-brand" style={{marginLeft : "60px"}}>
                       <Link to="/dashboard"> <img style={{objectFit :'cover'}} width="90px" height="40px" src={imageSettings?.appLogo && "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/"+imageSettings?.appLogo } alt="logo"/></Link>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end">
                       <div style={{marginRight : "30px"}}>
                        
                        <ul className="navbar-nav">                                
                                <li className="nav-item" style={{marginRight : "20px"}}>

                                <div className="dropdown ">
                                    <button type="button" className="dropdown-toggle nav__dropDownBtn nav-link" data-toggle="dropdown">
                                        <i className="fa fa-bell-o fa-lg mt-2" aria-hidden="true"></i>
                                    </button>
                                            <div className="dropdown-menu nav__notification">
                                                <div className="nav__notificationHead mb-3">
                                                    <h5 style={{ color :"#707070" , marginBottom : "-8px"}}>Notifications</h5>
                                                </div>  
            
                                                {/* loop */}
                                                
                                                    <div className="d-flex " style={{borderTop: "1px solid rgba(0,0,0,0.1" , paddingTop : "10px" , paddingBottom : "10px"}}>
                                                        <div style={{padding : "1px 20px"}}>
                                                            <img width="40rem" height="40rem" className= "rounded-circle" src={profile} alt="profile"/>
                                                        </div>
                                                        <div className="text-left">
                                                            <p style={{marginBottom:"0px", color :"black"}}>Ldsbfjbsdjfbjsdbjsdbjfsdjfsj</p>
                                                            <p style={{marginBottom:"0px", color :"#707070"}}>10:00AM</p>
                                                        </div>
                                                        
                                                    </div>  

                                                    <div className="d-flex " style={{borderTop: "1px solid rgba(0,0,0,0.1" , paddingTop : "10px" , paddingBottom : "10px"}}>
                                                        <div style={{padding : "1px 20px"}}>
                                                            <img width="40rem" height="40rem" className= "rounded-circle" src={profile} alt="profile"/>
                                                        </div>
                                                        <div className="text-left">
                                                            <p style={{marginBottom:"0px", color :"black"}}>Ldsbfjbsdjfbjsdbjsdbjfsdjfsj</p>
                                                            <p style={{marginBottom:"0px", color :"#707070"}}>10:00AM</p>
                                                        </div>
                                                        
                                                    </div>  

                                                    <div className="d-flex " style={{borderTop: "1px solid rgba(0,0,0,0.1" , paddingTop : "10px" , paddingBottom : "10px"}}>
                                                        <div style={{padding : "1px 20px"}}>
                                                            <img width="40rem" height="40rem" className= "rounded-circle" src={profile} alt="profile"/>
                                                        </div>
                                                        <div className="text-left">
                                                            <p style={{marginBottom:"0px", color :"black"}}>Ldsbfjbsdjfbjsdbjsdbjfsdjfsj</p>
                                                            <p style={{marginBottom:"0px", color :"#707070"}}>10:00AM</p>
                                                        </div>                                                        
                                                    </div>  

                                                    
                                                  
                                                                              

                                                <div className="text-center pt-2 " style={{borderTop: "1px solid rgba(0,0,0,0.1"}}>
                                                    <Link to="/dashboard/inquiries"><h5 style={{color:"#009CB4" ,textDecoration : "underline"}}>View All</h5></Link>
                                                </div>                         
                    
                                             </div>
                                         </div>
                                 </li>


                                <li className="nav-item">              
                                   <div className="dropdown ">
                                            <button type="button" className="dropdown-toggle nav__dropDownBtn nav-link" data-toggle="dropdown">
                                                <img width="30rem" height="30px" className= "rounded-circle" src={adminData ? "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/"+adminData.profileImage :profile} alt="profile"/>
                                            </button>
                                                    <div className="dropdown-menu nav__dropdownMenu">
                                                        <div className="dropdown__head"  style={{height : "30px"}}>
                                                            <h6 style={{lineHeight : "0.4", color :"white"}}>{adminData && `${adminData.firstName} ${adminData.lastName}`}</h6>
                                                            <p style={{ color :"white" , fontSize : "12px"}}>Admin</p>
                                                        </div>
                                                        <hr style={{ backgroundColor : "white"}}/>
                            
                                                        <Link className="nav-link" to="/dashboard/profile" style={{marginTop : "-10px"}} >
                                                            <div className="d-flex nav__link" style={{height : "30px"}}>
                                                                <i style={{marginTop : "4px" , marginRight : "10px"}} className="fa fa-user-o" aria-hidden="true"></i>
                                                                <p>Profile</p>
                                                            </div>
                                                        </Link>
                                                        <Link className="nav-link" to="/" style={{marginTop : "-10px"}} type="button" data-toggle="modal" data-target="#myModal"> 
                                                        <div className="d-flex nav__link" style={{height : "30px"}}>
                                                                <i style={{marginTop : "4px" , marginRight : "10px" }} className="fa fa-power-off" aria-hidden="true"></i>
                                                                <p >Logout</p>
                                                            </div>
                                                        </Link>   
                                                                                                
                            
                                                    </div>
                                        </div>
                                </li>
                            </ul>
                       </div>
                    </div>
                </nav>
                <LogoutPromtModal handleClick={logout}/> 
        </>
    )
}

export default Navbar;
