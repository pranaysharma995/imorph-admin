import React,{useState} from 'react'
import CustomTextfield from '../../../customComponents/customTextfield'
import {useHistory} from "react-router-dom"
import validator from 'validator'
import ChangepassSuccessful from './changepassSuccessful'
import {Modal, ModalBody} from 'reactstrap';

function ChangePasswordModal({modal , toggle}) {

    const [loading , setLoading] = useState(false);
    const history = useHistory();
    const [secondModal , setSecondModal] = useState(false)
    

    const [password , setPassword] = useState({
        oldPassword : "",
        newPassword : "Abcd@123",
        confirmPassword : "Abcd@123"
    });
    const [error , setError] = useState({
        oldempty_error : false,
        newempty_error : false,
        confempty_error : false,
        password_error : false,
        match_error : false
    })

    const click_sendButton = (e) => {
        e.preventDefault();
        const passRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
        
        if(!validator.isEmpty(password.newPassword) && !validator.isEmpty(password.confirmPassword) && !validator.isEmpty(password.oldPassword)){
            if(passRejex.test(password.newPassword)){
                if(password.newPassword !== password.confirmPassword){
                    setError({
                        match_error : true
                    })
                }else{
                    setError({
                        empty_error : false,
                        password_error : false,
                        match_error : false
                    });
                    setLoading(true);
                    setTimeout(() => {                       
                        save();
                        setLoading(false)
                    }, 2000);
                }
            }else{
                setError({
                    password_error : true
                })
            }
        }else{
           if(validator.isEmpty(password.oldPassword)){
            setError({
                oldempty_error : true
            });
           }else if(validator.isEmpty(password.newPassword)){
            setError({
                newempty_error : true
            });
           }
           else if(validator.isEmpty(password.confirmPassword)){
            setError({
                confempty_error : true
            });
           }
        }
        
    }

    const tog = () => {
        setSecondModal(!secondModal)
    }
    const change = e =>{
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        })
    }


    const save= ()=> {
        setSecondModal(true)
        toggle();
    }

   
    return (
      <>
        <Modal isOpen={modal} toggle={toggle} className="changePass__modal" className="changePass__modalDialog" centered={true} size="lg">
        <ModalBody className="changePass__modalDialog">
                 <div className="text-center changePass__header">
                        <h1 style={{fontWeight:"450" }}>Change Password</h1>
                 </div>
                              {error.password_error && <small className="error__message">
                         <ul>
                             <li>Contain at least one uppercase and one lowercase character</li>
                             <li>Contain numeric character</li>
                             <li>At least 8 characters long</li>
                             <li>Contain at least one special character</li>
                         </ul>
                     </small>}
                     {(error.oldempty_error || error.oldempty_error || error.newempty_error || error.confempty_error )&& <small className="error__message">&#9888;&#160;Please fill all fields</small>}
                     {error.match_error && <small className="error__message">&#9888;&#160;Passwords do not match</small>}
                     <form>
                         <CustomTextfield customTextfield__input={error.oldempty_error ? "form-control profile__input profile__errorInput" : "form-control profile__input"} type="password" placeholder="Old password" value={password.oldPassword} handleChange={change} name="oldPassword"/>
                         <CustomTextfield customTextfield__input={error.newempty_error || error.password_error ? "form-control profile__input profile__errorInput" : "form-control profile__input"} type="password" placeholder="New password" value={password.newPassword} handleChange={change} name="newPassword"/>
                         <CustomTextfield customTextfield__input={error.confempty_error || error.match_error ? "form-control profile__input profile__errorInput" : "form-control profile__input"} type="password" placeholder="Confirm password" value={password.confirmPassword} handleChange={change} name="confirmPassword"/>                
                     <div className="mt-4" style={{marginTop : "90px"}}>
                             <div className="d-flex justify-content-center">
                                {loading ? (<div className="spinner-border text-primary"></div>) : (
                                    <>
                                    <button className="profile__footerBtn btn-block ml-2"  text="Submit"   onClick={click_sendButton} >Save</button>
                                    <button className="btn profile__backbtn btn-block mr-2" data-target="#changePassSuccess"  onClick={toggle}>Close</button>                                   
                                    
                                    </>
                                )}
                            </div> 
                        </div>                       
                    </form>
                   
        </ModalBody>
      </Modal>

        <ChangepassSuccessful modall={secondModal} tog={tog}/>
      </>

    )
}

export default ChangePasswordModal