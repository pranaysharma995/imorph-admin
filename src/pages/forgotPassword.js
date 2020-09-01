import React,{useState} from 'react'
import CustomTextfield from '../customComponents/customTextfield'
import CustomButton from '../customComponents/customButton'
import {useHistory} from "react-router-dom"
import validator from 'validator'

const ForgotPassword =({value}) => {
    const [text , setText] = useState('');
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState({
        emptyError : false,
        digitError : false,
        digit_lenght : false,
        error_email : false
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
            if(!validator.isInt(text) && !validator.isEmail(text)){
                setError({
                    digitError : true,
                })
            }
            else if(validator.isInt(text) && !validator.isLength(text , {min : 10 , max :10})){
                setError({
                    digit_lenght : true,
                })
            }
            else{
                setError({
                    emptyError : false,
                    digitError : false,
                    digit_lenght : false,
                    error_email : false
                });
                submit();
            }
        }
    }

    const submit = () => {
        setLoading(true);         
                setTimeout(() => (
                    setLoading(false),
                    value(text),
                    history.push('/verification')
                ), 2000);
    }


    return (
        <div className="container forgotPass__page">
            <style>{'body { background-color: #1BC1D8; }'}</style>
            
           <div className="text-center forgotPass__header">
                <h5 style={{fontSize : "25px"}}>Forgot Password</h5>
                <p style={{fontSize : "11px"}}>Please Enter your mobile number/email & we will send you an OTP code </p>
           </div>
           <form onSubmit={click_sendButton}>

               {error.digit_lenght && <small className="error__message">&#9888;&#160;Mobile number should be 10 digits</small>}
               {error.digitError && <small className="error__message">&#9888;&#160;Please provide valid mobile number/email</small>}
               {error.emptyError && <small className="error__message">&#9888;&#160;Please enter your mobile number/email</small>}

                <CustomTextfield customTextfield__input={error.digitError || error.digit_lenght || error.emptyError ? "form-control forgotPass__input forgotPass__errorInput" : "form-control forgotPass__input "} type="text" placeholder="Enter your mobile number/email" value={text} handleChange={ e=> setText(e.target.value)}/>
                
                <div className="text-center forgotPass__footer">
                    {loading ? (<div className="spinner-border text-primary"></div>) : (<CustomButton customButton__class="login__btn1" text="Send" type="submit" disabled={loading}/>)}
                </div>
           </form>
        </div>
    )
}

export default ForgotPassword;
