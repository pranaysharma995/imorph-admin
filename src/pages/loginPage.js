import React,{useState,useContext} from 'react';
import imoph3d from '../assets/imoph3d.png' 
import CustomTextfield from '../customComponents/customTextfield'
import CustomButton from '../customComponents/customButton'
import {Link} from 'react-router-dom'
import validator from 'validator';
import { useHistory ,Redirect } from 'react-router-dom'

const LoginPage = () =>{

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const history = useHistory()
    const [showPassword , setShowPassword] = useState(false);

    const [validation , setValidation] = useState({
        username : false,
        password : false,
        email : false,
        err_pass : false
    })




    const handleSubmit =(e) => {
        e.preventDefault();

        const passRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g

        if(validator.isEmpty(username)){
            setValidation({username : true})
        }
        else if(validator.isEmpty(password)){
            setValidation({ password : true})
        }
         
        else{
            if(!validator.isEmpty(username) && !validator.isEmpty(password)){
                if(!validator.isEmail(username)){
                    setValidation({email : true})
                }
                else if(!passRejex.test(password)){
                    setValidation({err_pass : true})
                }
                else{
                    setValidation({err_pass : false});
                    submit();
                }
            }
            else if(!validator.isEmpty(username)){
                setValidation({username : false})
            }
            else if(!validator.isEmpty(password)){
                setValidation({password : false})
            }
            
        }
        

    }

    const iconClick = e => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const submit = ()=>{
         setLoading(true);
         setTimeout(() => (
             setLoading(false),
             history.push("/dashboard")
         ), 2000);
    }

    return (
        <div className="container login__page">
            <style>{'body { background-color: #009CB4; }'}</style>
            
            <div className="text-center mb-3">
                <img width="200rem" src={imoph3d} alt="logo" style={{marginLeft : "30px"}}/>
            </div>
           <div className="text-center" style={{marginBottom : "40px"}}>
            <h3  style={{color :"#707070"}}>Welcome Back!</h3>
                <p style={{color :"#707070", lineHeight : "0.4" , fontSize : "12px"}}>Please login to your account</p>
           </div>

           <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    {validation.username && <small className="error__message">&#9888;&#160; Please enter your email address</small> }
                    {validation.email && <small className="error__message">&#9888;&#160;Please enter your valid email address</small> }
                    <CustomTextfield customTextfield__input={validation.username || validation.email ? "login__errorInput form-control login__input" : "form-control login__input"}  type="text" placeholder="Email" value={username} icon_class="fa fa-envelope-o" handleChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    {validation.err_pass && <small className="error__message">&#9888;&#160;Password donot match</small> }
                    {/* {validation.err_pass && <small className="error__message">*Password should be min 8 characters including one uppercase, one lowercase, one number and one special characters</small> } */}
                    {validation.password && <small className="error__message">&#9888;&#160;Please enter password</small> }
                    <CustomTextfield customTextfield__input={validation.err_pass || validation.password ? "login__errorInput form-control login__input" : "form-control login__input"} type={showPassword ? "text" : "password"} placeholder="Password"  value={password} icon_class={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} handleIconClick={iconClick} handleChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label" style={{color : "#707070"}}>
                    <CustomTextfield customTextfield__input="form-check-input login__checkbox" type="checkbox"/>   Remember me
                    </label>
                </div>
                <div className="text-center"> 
                    {loading ? (<div class="spinner-border text-primary"></div>) : (<CustomButton customButton__class="login__btn1" text="Login" type="submit" />)}
                </div>
            </form>

            <h6 className="text-center" style={{ marginBottom : "30px"}}><Link style={{color :"#009CB4"}} to="/forgotpassword">Forgot Password?</Link></h6>
        </div>
    )
}

export default LoginPage;
