import React from 'react'
import tic from '../../../assets/tic.png'


const ChangepassSuccessful =()=> {
    return (
        <div class="modal text-center fade" id="changePassSuccess" >
            <div class="modal-dialog modal-dialog-centered modal-lg changePassSucc__modalDialog">
                <div class="modal-content changePassSucc__modal">
                    <div style={{position: "relative" , marginTop : "10px" ,marginBottom: "30px"}}>
                    <div className="ticBackground">
                         <img width="60rems" src={tic} alt="logo" className="resetSuccess_img" />
                     </div>
                    </div>
                <div className=" resetSuccess__header" style={{marginTop : "100px"}}>
                        <h1> Password Reset Successful</h1>
                        <p style={{fontSize : "15px"}}>You can now use new password to login </p>
                </div>
                </div>
            </div>
     </div>
    )
}


export default ChangepassSuccessful
