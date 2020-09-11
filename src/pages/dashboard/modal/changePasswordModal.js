import React, {useState} from 'react'
import CustomTextfield from '../../../customComponents/customTextfield'
import {useHistory} from "react-router-dom"
import validator from 'validator'
import ChangepassSuccessful from './changepassSuccessful'
import {Modal, ModalBody} from 'reactstrap';
import axiosInstance from '../../../axios'

function ChangePasswordModal({modal, toggle}) {

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [secondModal, setSecondModal] = useState(false)


    const [password, setPassword] = useState({oldPassword: "", newPassword: "", confirmPassword: ""});
    const [error, setError] = useState({
        oldempty_error: false,
        oldPassMatch_error: false,
        newempty_error: false,
        confempty_error: false,
        password_error: false,
        match_error: false
    })

    const click_sendButton = (e) => {
        e.preventDefault();
        const passRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g

        if (!validator.isEmpty(password.newPassword) && !validator.isEmpty(password.confirmPassword) && !validator.isEmpty(password.oldPassword)) {
            if (passRejex.test(password.newPassword)) {
                if (password.newPassword !== password.confirmPassword) {
                    setError({match_error: true})
                } else {
                    setError({empty_error: false, password_error: false, match_error: false});
                    save();

                }
            } else {
                setError({password_error: true})
            }
        } else {
            if (validator.isEmpty(password.oldPassword)) {
                setError({oldempty_error: true});
            } else if (validator.isEmpty(password.newPassword)) {
                setError({newempty_error: true});
            } else if (validator.isEmpty(password.confirmPassword)) {
                setError({confempty_error: true});
            }
        }

    }

    const tog = () => {
        setSecondModal(!secondModal)
    }
    const change = e => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }


    const save = () => {
        setLoading(true);
        setError({
            oldempty_error: false,
            oldPassMatch_error: false,
            newempty_error: false,
            confempty_error: false,
            password_error: false,
            match_error: false
        })

        let uid = localStorage.getItem('uid') ? localStorage.getItem('uid') : sessionStorage.getItem('uid')

        axiosInstance.get(`/admin/check-old-password?id=${uid}&password=${
            password.oldPassword
        }`).then(({data}) => {
            console.log("Old Passs Match Result", data);
            if (data.valid == true) {
                axiosInstance.post("/admin/update-password", {
                    id: uid,
                    oldPassword: password.oldPassword,
                    password: password.confirmPassword
                }).then(({data}) => {
                    setSecondModal(true)
                    toggle();
                    setLoading(false);
                    setPassword({
                        oldPassword: "", newPassword: "", confirmPassword: ""
                    })
                }).catch(error => {
                    console.log("Error in Password reset", error);
                })
            } else {
                setError({oldPassMatch_error: true})
            }
        }).catch(error => {
            console.log("Error in Old Password Match block", error);
            setError({oldPassMatch_error: true})
            setLoading(false)
        })

    }


    return (
        <>
            <Modal isOpen={modal}
                toggle={toggle}
                className="changePass__modal changePass__modalDialog"
                centered={true}
                size="lg">
                <ModalBody className="changePass__modalDialog">
                    <div className="text-center changePass__header">
                        <h1 style={
                            {fontWeight: "450"}
                        }>Change Password</h1>
                    </div>
                    {
                    error.password_error && <small className="error__message">
                        <ul>
                            <li>Contain at least one uppercase and one lowercase character</li>
                            <li>Contain numeric character</li>
                            <li>At least 8 characters long</li>
                            <li>Contain at least one special character</li>
                        </ul>
                    </small>
                }
                    {
                    (error.oldempty_error || error.oldempty_error || error.newempty_error || error.confempty_error) && <small className="error__message">&#9888;&#160;Please fill all fields</small>
                }
                    {
                    error.oldPassMatch_error && <small className="error__message">&#9888;&#160;Old Password donot match</small>
                }
                    {
                    error.match_error && <small className="error__message">&#9888;&#160;Passwords do not match</small>
                }
                    <form onSubmit={click_sendButton}>
                        <CustomTextfield customTextfield__input={
                                error.oldempty_error || error.oldPassMatch_error ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                            }
                            type="password"
                            placeholder="Old password"
                            value={
                                password.oldPassword
                            }
                            handleChange={change}
                            name="oldPassword"/>
                        <CustomTextfield customTextfield__input={
                                error.newempty_error || error.password_error ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                            }
                            type="password"
                            placeholder="New password"
                            value={
                                password.newPassword
                            }
                            handleChange={change}
                            name="newPassword"/>
                        <CustomTextfield customTextfield__input={
                                error.confempty_error || error.match_error ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                            }
                            type="password"
                            placeholder="Confirm password"
                            value={
                                password.confirmPassword
                            }
                            handleChange={change}
                            name="confirmPassword"/>
                        <div className="mt-4"
                            style={
                                {marginTop: "90px"}
                        }>
                            <div className="d-flex justify-content-center">
                                {
                                loading ? (
                                    <div className="spinner-border text-primary"></div>
                                ) : (
                                    <>
                                        <button className="profile__footerBtn btn-block ml-2" text="Submit"
                                            onClick={click_sendButton}>Save</button>
                                        <button className="btn profile__backbtn btn-block mr-2" data-target="#changePassSuccess"
                                            onClick={toggle}>Close</button>

                                    </>
                                )
                            } </div>
                        </div>
                    </form>

                </ModalBody>
            </Modal>

            <ChangepassSuccessful modall={secondModal}
                tog={tog}/>
        </>

    )
}

export default ChangePasswordModal
