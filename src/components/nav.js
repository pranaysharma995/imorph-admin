import React from 'react'
import logo from '../assets/imoph3d.png'
import profile from '../assets/profile.png'
import CustomTextfield from '../customComponents/customTextfield'
import {Link , useHistory} from 'react-router-dom'
import LogoutPromtModal from '../pages/dashboard/modal/logoutPromtModal'

const Navbar =() =>{

    const history = useHistory();

    const logout= e => {
        e.preventDefault();

        if(localStorage.getItem('uid')){
            localStorage.removeItem("uid")
        }
        if(sessionStorage.getItem("uid")){
            sessionStorage.removeItem("uid")
        }

        history.push("/")
    }

    return (
        <div>
                <nav className="navbar navbar-expand-sm bg-white navbar-light fixed-top">
                    <div className="navbar-brand" style={{marginLeft : "60px"}}>
                        <img className="" width="90rem" src={logo} alt="logo"/>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end">
                       <div style={{marginTop : "20px" , marginBottom : "-10px" , marginRight : "30px"}}>
                        <ul className="navbar-nav">
                                <li className="nav-item" style={{position : "relative" , marginRight : "20px"}}>
                                    <CustomTextfield customTextfield__input="form-control nav__input" type="text" placeholder="Search" icon_class="fa fa-search nav__searchIcon"/>
                                </li>
                                <li className="nav-item" style={{marginRight : "20px"}}>

                                <div className="dropdown ">
                                    <button type="button" className="dropdown-toggle nav__dropDownBtn nav-link" data-toggle="dropdown">
                                        <i className="fa fa-bell-o fa-lg" aria-hidden="true"></i>
                                    </button>
                                            <div className="dropdown-menu nav__notification">
                                                <div className="nav__notificationHead">
                                                    <h5 style={{ color :"#707070" , marginBottom : "-8px"}}>Notifications</h5>
                                                </div>  
                                                <hr/>
                                                {/* loop */}
                                                <div>
                                                    <div className="d-flex">
                                                        <div style={{padding : "1px 20px"}}>
                                                            <img width="40rem" className= "rounded-circle" src={profile} alt="profile"/>
                                                        </div>
                                                        <div className="text-left">
                                                            <p style={{lineHeight : "0.5", color :"black"}}>Ldsbfjbsdjfbjsdbjsdbjfsdjfsj</p>
                                                            <p style={{lineHeight : "0.5", color :"#707070"}}>10:00AM</p>
                                                        </div>
                                                    </div>   
                                                    <hr/>       
                                                </div>    
                                                <div>
                                                    <div className="d-flex">
                                                        <div style={{padding : "1px 20px"}}>
                                                            <img width="40rem" className= "rounded-circle" src={profile} alt="profile"/>
                                                        </div>
                                                        <div className="text-left">
                                                            <p style={{lineHeight : "0.5", color :"black"}}>Ldsbfjbsdjfbjsdbjsdbjfsdjfsj</p>
                                                            <p style={{lineHeight : "0.5", color :"#707070"}}>10:00AM</p>
                                                        </div>
                                                    </div>   
                                                    <hr/>       
                                                </div>    
                                                <div>
                                                    <div className="d-flex">
                                                        <div style={{padding : "1px 20px"}}>
                                                            <img width="40rem" className= "rounded-circle" src={profile} alt="profile"/>
                                                        </div>
                                                        <div className="text-left">
                                                            <p style={{lineHeight : "0.5", color :"black"}}>Ldsbfjbsdjfbjsdbjsdbjfsdjfsj</p>
                                                            <p style={{lineHeight : "0.5", color :"#707070"}}>10:00AM</p>
                                                        </div>
                                                    </div>   
                                                    <hr/>       
                                                </div>       

                                                <div className="text-center">
                                                    <h5 style={{color:"#009CB4" ,textDecoration : "underline"}}>View All</h5>
                                                </div>                         
                    
                                             </div>
                                         </div>
                                 </li>


                                <li className="nav-item">              
                                   <div className="dropdown ">
                                            <button type="button" className="dropdown-toggle nav__dropDownBtn nav-link" data-toggle="dropdown">
                                                <img width="30rem" className= "rounded-circle" src={profile} alt="profile"/>
                                            </button>
                                                    <div className="dropdown-menu nav__dropdownMenu">
                                                        <div className="dropdown__head"  style={{height : "30px"}}>
                                                            <h6 style={{lineHeight : "0.4", color :"white"}}>James Dean</h6>
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
        </div>
    )
}

export default Navbar;
