import React,{useState,useEffect} from 'react'
import CustomButton from '../customComponents/customButton'
import {useHistory, Redirect} from "react-router-dom"
import validator from 'validator'

const VerificationPage =({value}) => {
    const [loading , setLoading] = useState(false);
    const [otp , setOtp] = useState({
        input1 : "",
        input2 : "",
        input3 : "",
        input4 : "",
    });
    const [error , setError] = useState(false);

    useEffect(() => {
        
    }, [otp.input1])

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

    const keyUpFocus = e=> {
         var maxLength = parseInt(e.target.attributes["maxlength"].value, 10);
         
         var myLength = e.target.value.length;
    
         if (myLength >= maxLength) {
             var next = e.target;
             while (next = next.nextElementSibling) {
                 if (next == null)
                    break;
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                    break;
                }
            }
         }
         else if (myLength === 0) {
            var previous = e.target;
            while (previous = previous.previousElementSibling) {
                if (previous == null)
                    break;
                if (previous.tagName.toLowerCase() === "input") {
                    previous.focus();
                    break;
                }
            }
        }
    }

    if(!value){
        return <Redirect to="/forgotpassword"/>
    }

    return (
        <div className="verification">
            <style>{'body { background-color: #009CB4; }'}</style>
            
           <div className="text-center forgotPass__header" style={{padding : "1px 20px", marginBottom : "10px"}}>
                <h5 style={{fontSize : "28pt" , fontWeight: "450"}}>Verification</h5>
                <p style={{padding : "1px 40px" , fontSize : "0.8em"}}>{validator.isInt(value) ? `Please Enter the OTP we have sent to your mobile number +1 ${value.replace(value.substr(2 , 6) , "*******")} ` : `Please Enter the OTP we have sent to your email address ${value.replace(value.substr(4, Math.abs(value.length -12)) , "**********")} `}</p>
           </div>
           <form onSubmit={click_sendButton} >
                {error && <small className="verification__errorMessage">&#9888;&#160;Please enter OTP properly</small>}
                <div className="text-center " onKeyUp={keyUpFocus}> 
                    <input style={{boxShadow: "0px 1px 3px rgba(0,0,0,0.1)"}} type="text" className={error ? "verification__input verification__errorInput" : "verification__input "} maxLength="1" name="input1" value={otp.input1} onChange={handleChange}/>
                    <input style={{boxShadow: "0px 1px 3px rgba(0,0,0,0.1)"}} type="text" className={error ? "verification__input verification__errorInput" : "verification__input "} maxLength="1" name="input2" value={otp.input2} onChange={handleChange}/>
                    <input style={{boxShadow: "0px 1px 3px rgba(0,0,0,0.1)"}} type="text" className={error ? "verification__input verification__errorInput" : "verification__input "} maxLength="1" name="input3" value={otp.input3} onChange={handleChange}/>
                    <input style={{boxShadow: "0px 1px 3px rgba(0,0,0,0.1)"}} type="text" className={error ? "verification__input verification__errorInput" : "verification__input "} maxLength="1" name="input4" value={otp.input4} onChange={handleChange}/>
                </div>
                <div className="text-center ">
                    {loading ? (<div className="spinner-border text-primary"></div>) : (<CustomButton customButton__class="login__btn1" text="Send" type="submit" disabled={loading}/>)}
                </div>
           </form>
           <div className="text-center" style={{color : '#707070' , marginBottom : "40px"}}>
               <p>Didn't received OTP? <strong style={{color : '#1BC1D8 '}}>Resend now</strong></p>
           </div>
        </div>
    )
}

export default VerificationPage;