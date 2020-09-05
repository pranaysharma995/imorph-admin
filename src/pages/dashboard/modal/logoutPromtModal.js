import React from 'react'
import danger from '../../../assets/danger.png'

function LogoutPromtModal({handleClick}) {
    return (
        <div className="modal fade text-center" id="myModal">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">

                <div className="modal-body" style={{paddingTop:"4%" , paddingBottom: "4%"}}>

                    <div style={{position: "relative" , marginTop : "10px" ,marginBottom: "18%"}}>
                        <div className="logout__ticBackground">
                            <img width="40rem" src={danger} alt="logo"/>
                        </div>
                    </div>
                    <div style={{marginBottom : "6%"}}>
                        <h1 style={{fontWeight:"450",color : "#707070" }}>Are you sure you want to logout?</h1>
                    </div>

                    <div className="d-flex justify-content-center" style={{padding : "2.8vh 9vw"}}>
                            <button className="profile__footerBtn btn-block ml-2" data-dismiss="modal"   >No</button>
                            <button className="btn profile__backbtn btn-block mr-2" data-dismiss="modal" onClick={handleClick}>Yes</button>                                   
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default LogoutPromtModal
