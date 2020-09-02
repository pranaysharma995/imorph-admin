import React from 'react'
import tic from '../../../assets/tic.png'
import { Modal, ModalBody} from 'reactstrap';


const ChangepassSuccessful =({modall , tog})=> {

    return (
     <Modal isOpen={modall} toggle={tog} className="changePassSucc__modal" centered={true} size="lg" onClick={tog}>
     <ModalBody className="changePassSucc__modal">
                 <div style={{position: "relative" , marginTop : "10px" ,marginBottom: "60px"}}>
                    <div className="ticBackground">
                         <img width="60rems" src={tic} alt="logo" className="resetSuccess_img" />
                     </div>
                    </div>
                <div className=" resetSuccess__header text-center" >
                        <p style={{fontSize : "26pt" , paddingTop : "90px" , lineHeight: "0."}}> Password Reset Successful</p>
                        <p style={{fontSize : "15px"}}>You can now use new password to login </p>
                </div>
     </ModalBody>
   </Modal>
    )
}


export default ChangepassSuccessful
