import React from 'react'
import logo from '../assets/imoph3d.png'
import profile from '../assets/profile.png'
import CustomTextfield from '../customComponents/customTextfield'
import {Link} from 'react-router-dom'

const Navbar =() =>{
    return (
        <div>
                <nav className="navbar navbar-expand-sm bg-light navbar-light fixed-top">
                    <div className="navbar-brand" style={{marginLeft : "70px"}}>
                        <img className="" width="100rem" src={logo} alt="logo"/>
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
                                            <div className="dropdown-menu nav__dropdownMenu">
                                            <Link className="dropdown-item nav__dropdown-item"  style={{height : "30px"}}>
                                                <h6 style={{lineHeight : "0.4", color :"#707070"}}>James Dean</h6>
                                                <p style={{ color :"#707070"}}>Admin</p>
                                            </Link>
                                            <hr/>
                
                                            <Link className="dropdown-item nav__dropdown-item">
                                                <div className="d-flex" style={{height : "30px"}}>
                                                    <i style={{marginTop : "4px" , marginRight : "10px"}} className="fa fa-user-o" aria-hidden="true"></i>
                                                    <p>Profile</p>
                                                </div>
                                            </Link>
                                            <Link className="dropdown-item nav__dropdown-item" >
                                            <div className="d-flex" style={{height : "30px"}}>
                                                    <i style={{marginTop : "4px" , marginRight : "10px"}} className="fa fa-power-off" aria-hidden="true"></i>
                                                    <p>Logout</p>
                                                </div>
                                            </Link>                                            
                    
                                             </div>
                                </div>
                                </li>
                                <li className="nav-item" style={{marginTop: "-3px"}}>
                                <Link className="nav-link" to="/dashboard/profile"><img width="30rem" className= "rounded-circle" src={profile} alt="profile"/></Link>
                                </li>
                            </ul>
                       </div>
                    </div>
                </nav>
        </div>
    )
}

export default Navbar;
