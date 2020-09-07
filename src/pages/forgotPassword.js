import React,{useState} from 'react'
import CustomTextfield from '../customComponents/customTextfield'
import CustomButton from '../customComponents/customButton'
import {useHistory} from "react-router-dom"
import validator from 'validator'
import axiosInstance from '../axios'

const ForgotPassword =({value}) => {
    const [text , setText] = useState('');
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState({
        emptyError : false,
        emailError : false,
    });
    const history = useHistory();


    const click_sendButton = (e) => {
        e.preventDefault();

        if(validator.isEmpty(text)){
          setError({
              emptyError : true
          })
        }
        else{
            if(!validator.isEmail(text)){
                setError({
                    emailError : true,
                })
            }
            else{
                setError({
                    emptyError : false,
                    emailError : false,
                    digit_lenght : false,
                    error_email : false
                });
                submit();
            }
        }
    }

    const submit = () => {
        setLoading(true);         
    

        axiosInstance.post("http://34.209.115.216:8000/api/admin/forget-password" , {
            email : text
        }).then(() => {

                setLoading(false);
                value(text);
                history.push('/verification')
                
        }).catch(err => {
            console.log("Forgot Password Error", err);
            setLoading(false);
            setError({
                emailError : true
            })
        })
    }


    return (
        <div className="forgotPass__page">
            <style>{'body { background-color: #009CB4; }'}</style>
            
           <div className="text-center forgotPass__header">
                <h5 style={{fontSize : "35px" , fontWeight : "450"}}>Forgot Password</h5>
                <p >Please Enter your email & we will send you an OTP code </p>
           </div>
           <form onSubmit={click_sendButton}>

               {error.emailError && <small className="error__message">&#9888;&#160;Please provide valid email address</small>}
               {error.emptyError && <small className="error__message">&#9888;&#160;Please provide valid email address</small>}

               
                    <CustomTextfield customTextfield__input={error.emailError || error.digit_lenght || error.emptyError ? "form-control forgotPass__input forgotPass__errorInput" : "form-control forgotPass__input "} type="text" placeholder="Enter your email address" value={text} handleChange={ e=> setText(e.target.value)}/>
                
                
                <div className="text-center forgotPass__footer">
                    {loading ? (<div className="spinner-border text-primary"></div>) : (<CustomButton customButton__class="login__btn1" text="Send" type="submit" disabled={loading}/>)}
                </div>
           </form>
        </div>
    )
}

export default ForgotPassword;
