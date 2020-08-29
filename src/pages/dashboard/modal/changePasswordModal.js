import React,{useState} from 'react'
import CustomTextfield from '../../../customComponents/customTextfield'
import CustomButton from '../../../customComponents/customButton'
import {useHistory} from "react-router-dom"
import validator from 'validator'
import ChangepassSuccessful from './changepassSuccessful'
import $ from 'jquery'

function ChangePasswordModal() {

    const [loading , setLoading] = useState(false);
    const history = useHistory();
    

    const [password , setPassword] = useState({
        oldPassword : "",
        newPassword : "Abcd@123",
        confirmPassword : "Abcd@123"
    });
    const [error , setError] = useState({
        empty_error : false,
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
                    setLoading(true)
                    setTimeout(() => {
                       window.$("#myChangePasswordModal").modal('hide')
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
            setError({
                empty_error : true
            });
        }
        
    }

    const save= ()=> {
        window.$("#changePassSuccess").modal('show')
    }

    const change = e =>{
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
                    <div className="modal fade" id="myChangePasswordModal" >
                <div className="modal-dialog modal-dialog-centered changePass__modalDialog modal-lg">
                <div className="modal-content changePass__modal">

                    <div className="text-center changePass__header">
                        <h1 >Change Password</h1>
                </div>

                    {error.password_error && <small className="error__message">
                        <ul>
                            <li>Contain at least one uppercase and one lowercase character</li>
                            <li>Contain numeric character</li>
                            <li>At least 8 characters long</li>
                            <li>Contain at least one special character</li>
                        </ul>
                    </small>}
                    {error.empty_error && <small className="error__message">*Please fill all fields</small>}
                    {error.match_error && <small className="error__message">*Passwords do not match</small>}
                    <form>
                        <CustomTextfield customTextfield__input="form-control login__input" type="password" placeholder="Old password" value={password.oldPassword} handleChange={change} name="oldPassword"/>
                        <CustomTextfield customTextfield__input="form-control login__input" type="password" placeholder="New password" value={password.newPassword} handleChange={change} name="newPassword"/>
                        <CustomTextfield customTextfield__input="form-control login__input" type="password" placeholder="Confirm password" value={password.confirmPassword} handleChange={change} name="confirmPassword"/>                
                        <div className="mt-3">
                            <div className="d-flex justify-content-center">
                                {loading ? (<div className="spinner-border text-primary"></div>) : (
                                    <>
                                    <button className="profile__footerBtn"  text="Submit"  id="clickButton"  data-toggle="modal" onClick={click_sendButton}>Save</button>
                                    <button className="btn profile__backbtn" data-dismiss="modal" >Close</button>
                                    
                                    
                                    </>
                                )}
                            </div> 
                        </div>                       
                    </form>            
                </div>
                </div>
            </div>
            <ChangepassSuccessful/>
        </div>
    )
}

export default ChangePasswordModal
