import React from 'react'
import logo from '../assets/imoph3d.png'

const Navbar =() =>{
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <div className="navbar-brand">
                <img width="100rem" src={logo} alt="logo"/>
            </div>
            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
