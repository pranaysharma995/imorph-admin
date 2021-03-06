import React,{useState} from 'react'
import CustomTextfield from '../customComponents/customTextfield'
import CustomButton from '../customComponents/customButton'
import {useHistory, Redirect} from "react-router-dom"
import validator from 'validator'
import axios from 'axios'

const ResetPassword =({value}) => {
    const [loading , setLoading] = useState(false);
    const history = useHistory();

    const [password , setPassword] = useState({
        newPassword : "",
        confirmPassword : ""
    });
    const [error , setError] = useState({
        empty_error : false,
        password_error : false,
        match_error : false
    })

    const click_sendButton = (e) => {
        e.preventDefault();
        const passRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
        
        if(!validator.isEmpty(password.newPassword) && !validator.isEmpty(password.confirmPassword)){
            if(passRejex.test(password.newPassword)){
                if(password.newPassword !== password.confirmPassword){
                    setError({
                        match_error : true
                    })
                }else{
                    submit();
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

    const change = e =>{
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        })
    }

    const submit = ()=> {
        setLoading(true)
        axios.post("http://34.209.115.216:8000/api/admin/reset-password",{
            email : value,
            password : password.confirmPassword
        }).then(() => {
            setError({
                empty_error : false,
                password_error : false,
                match_error : false
            });
            
                setLoading(false)
                history.push('/resetsuccessfull')
            
        }).catch(err => {
            console.log("Error in ResetPassword" , err);
        })
    }

    if(!value){
        return <Redirect to="/"/>
    }

   
    return (
        <div className="resetPassword">
            <style>{'body { background-color: #009CB4; }'}</style>
            
           <div className="text-center forgotPass__header">
                <h5 style={{fontSize : "28px" , fontWeight : "450"}}>Reset Password</h5>
                <p >Please Enter your new password </p>
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
           <form onSubmit={click_sendButton}>
                <CustomTextfield customTextfield__input="form-control login__input" type="password" placeholder="New password" value={password.newPassword} handleChange={change} name="newPassword"/>
                <CustomTextfield customTextfield__input="form-control login__input" type="password" placeholder="Confirm password" value={password.confirmPassword} handleChange={change} name="confirmPassword"/>                
                <div className="text-center forgotPass__footer">
                    {loading ? (<div className="spinner-border text-primary"></div>) : (<CustomButton customButton__class="login__btn1" text="Submit" type="submit"/>)}
                </div>
           </form>
        </div>
    )
}

export default ResetPassword;
