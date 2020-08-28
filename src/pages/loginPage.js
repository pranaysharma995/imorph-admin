import React,{useState,useContext} from 'react';
import imoph3d from '../assets/imoph3d.png' 
import CustomTextfield from '../customComponents/customTextfield'
import CustomButton from '../customComponents/customButton'
import {Link} from 'react-router-dom'
import validator from 'validator';
import { useHistory ,Redirect } from 'react-router-dom'
import UserDetailsProvider from '../context/auth/userDetailsContext'

const LoginPage = () =>{

    const context = useContext(UserDetailsProvider);
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const history = useHistory()

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

    const submit = ()=>{
         setLoading(true);
         setTimeout(() => (
             setLoading(false),
             context.setUser("dfdsf"),
             localStorage.setItem('user' , "kjsd"),
             history.push("/dashboard")
         ), 2000);
    }

    return (
        <div className="container login__page">
            <div className="text-center mb-3">
                <img width="200rem" src={imoph3d} alt="logo" style={{marginLeft : "30px"}}/>
            </div>
            <h3 className="text-center p-4" style={{color :"#707070"}}>Login</h3>

           <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    {validation.username && <small className="error__message">*Please enter username</small> }
                    {validation.email && <small className="error__message">*Please enter a valid email</small> }
                    <CustomTextfield customTextfield__input="form-control login__input" type="text" placeholder="Username" value={username} handleChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    {validation.err_pass && <small className="error__message">*Password donot match</small> }
                    {/* {validation.err_pass && <small className="error__message">*Password should be min 8 characters including one uppercase, one lowercase, one number and one special characters</small> } */}
                    {validation.password && <small className="error__message">*Please enter password</small> }
                    <CustomTextfield customTextfield__input="form-control login__input" type="password" placeholder="Password"  value={password} handleChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label" style={{color : "#707070"}}>
                    <CustomTextfield customTextfield__input="form-check-input" type="checkbox"/>   Remember me
                    </label>
                </div>
                <div className="text-center"> 
                    {loading ? (<div class="spinner-border text-primary"></div>) : (<CustomButton customButton__class="login__btn" text="Login" type="submit" />)}
                </div>
            </form>

            <h6 className="text-center" style={{ marginBottom : "30px"}}><Link style={{color :"#707070"}} to="/forgotpassword">Forgot Password?</Link></h6>
        </div>
    )
}

export default LoginPage;
