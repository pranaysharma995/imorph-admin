import React from 'react'
import { Modal, ModalBody} from 'reactstrap';
import tic from '../../../assets/tic.png'

function ConfirmationUpdateModal({modall,tog,message}) {
    return (
        <Modal isOpen={modall} toggle={tog} className="changePassSucc__modal" centered={true} size="lg" onClick={tog}>
            <ModalBody className="changePassSucc__modal">
                        <div style={{position: "relative" , marginTop : "10px" ,marginBottom: "60px"}}>
                            <div className="ticBackground">
                                <img width="60rems" src={tic} alt="logo" className="resetSuccess_img" />
                            </div>
                            </div>
                        <div className=" resetSuccess__header text-center" >
                                <p style={{fontSize : "26pt" , paddingTop : "90px" , lineHeight: "0."}}>{message!= null ? message : " Update Successful"}</p>
                                <p style={{fontSize : "15px"}}>Page will automaticaly refresh</p>
                        </div>
            </ModalBody>
        </Modal>
    )
}

export default ConfirmationUpdateModal
