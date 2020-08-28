import React from 'react'

function Sidebar() {
    return (
        <div className="container sidebar">
            <div className="sidebar__links  ">
                <a className="row offset-md-4" href="#">About</a>
                <a className="row offset-md-4" href="#">Services</a>
                <a  className="row offset-md-4" href="#">Clients</a>
                <a className="row offset-md-4" href="#">Contact</a>
            </div>
        </div>
    )
}

export default Sidebar;
