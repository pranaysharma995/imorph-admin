import React,{useState} from 'react'
import CustomButton from '../customComponents/customButton'
import {useHistory} from "react-router-dom"

const VerificationPage =() => {
    const [loading , setLoading] = useState(false);
    const [otp , setOtp] = useState({
        input1 : "",
        input2 : "",
        input3 : "",
        input4 : "",
    });
    const [error , setError] = useState(false);

    const history = useHistory();

    const click_sendButton = (e) => {
        e.preventDefault();
        console.log(otp.input1 , otp.input2 , otp.input3 , otp.input4);
        if(otp.input1 !== '' || otp.input2 !== '' ||  otp.input3 !== '' ||  otp.input4 !== ''){
            setLoading(true);
            setError(false)
            setTimeout(() => (
                setLoading(false),
                history.push('/resetpassword')
            ), 2000);
        }else{
            setError(true)
        }
        
    }
    const handleChange = e => {
        setOtp({
            ...otp,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="container forgotPass__page">
           <div className="text-center forgotPass__header">
                <h5 style={{fontSize : "25px"}}>Verification</h5>
                <p style={{fontSize : "12px"}}>Please Enter the OTP we have sent to your mobile number +91-67*******95 </p>
           </div>
           <form onSubmit={click_sendButton} >
                {error && <small className="verification__errorMessage">*Please enter OTP properly</small>}
                <div className="text-center"> 
                    <input type="text" className="verification__input" maxLength="1" name="input1" value={otp.input1} onChange={handleChange}/>
                    <input type="text" className="verification__input" maxLength="1" name="input2" value={otp.input2} onChange={handleChange}/>
                    <input type="text" className="verification__input" maxLength="1" name="input3" value={otp.input3} onChange={handleChange}/>
                    <input type="text" className="verification__input" maxLength="1" name="input4" value={otp.input4} onChange={handleChange}/>
                </div>
                <div className="text-center forgotPass__footer">
                    {loading ? (<div className="spinner-border text-primary"></div>) : (<CustomButton customButton__class="login__btn" text="Send" type="submit" disabled={loading}/>)}
                </div>
           </form>
           <div className="text-center" style={{color : '#707070'}}>
               <p>Didn't received OTP? <strong>Resend now</strong></p>
           </div>
        </div>
    )
}

export default VerificationPage;