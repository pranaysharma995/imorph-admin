import React, {useState, useEffect} from 'react';
import imoph3d from '../assets/imoph3d.png'
import CustomTextfield from '../customComponents/customTextfield'
import CustomButton from '../customComponents/customButton'
import {Link} from 'react-router-dom'
import validator from 'validator';
import {useHistory, Redirect} from 'react-router-dom'
import axiosInstance from '../axios'

const LoginPage = () => {

    const [username, setUsername] = useState('diptahome@yopmail.com');
    const [password, setPassword] = useState('Abcd@1234');
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false);

    const [validation, setValidation] = useState({username: false, password: false, email: false, err_pass: false})
    const [check, setCheck] = useState(false)
    const [logo , setLogo] = useState(null)

    useEffect(() => {
        axiosInstance.get("/admin/image-setting/view").then(({data}) => {
            setLogo(data?.data[0]?.appLogo)
        }).catch(error => {
            console.log("Error in login Logo fetch", error);
        })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validator.isEmpty(username)) {
            setValidation({username: true})
        } else if (validator.isEmpty(password)) {
            setValidation({password: true})
        } else {
            if (!validator.isEmpty(username) && !validator.isEmpty(password)) {
                if (!validator.isEmail(username)) {
                    setValidation({email: true})
                } else {
                    setValidation({err_pass: false});
                    submit();
                }
            } else if (!validator.isEmpty(username)) {
                setValidation({username: false})
            } else if (!validator.isEmpty(password)) {
                setValidation({password: false})
            }

        }


    }

    const iconClick = e => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const submit = () => {
        setLoading(true);

        axiosInstance.post("/admin/sign-in", {
            email: username,
            password: password
        }).then(({data}) => {
            setLoading(false)
            console.log(data);
            if (check) {
                localStorage.setItem("uid", data.user?._id)
                localStorage.setItem("token", data.token)
            } else {
                sessionStorage.setItem("uid", data.user?._id)
                sessionStorage.setItem("token", data.token)
            } history.push("/dashboard")

        }).catch(error => {

            console.log("Login Error", error.response);
            setValidation({err_pass: true})
            setLoading(false)
        })

    }

    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className=" login__page container">
            <style>{'body { background-color: #009CB4; }'}</style>

            <div className="text-center mb-4 mt-4">
                <img width="200rem" height="100rem"
                    src={`http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/${logo}`}
                    alt="logo"
                    // style={
                    //     {marginLeft: "30px"}
                    // }
                    />
            </div>
            <div className="text-center"
                style={
                    {marginBottom: "40px"}
            }>
                <h5 style={
                    {
                        color: "#595959",
                        fontSize: "2em"
                    }
                }>Welcome Back</h5>
                <p style={
                    {
                        color: "#707070",
                        lineHeight: "0.4",
                        fontSize: "17px"
                    }
                }>Please login to your account</p>
            </div>

            <form style={
                    {marginTop: "30px"}
                }
                onSubmit={handleSubmit}>
                <div className="form-group">
                    {
                    validation.err_pass && <small className="error__message">&#9888;&#160;Email or password is incorrect</small>
                }
                    {
                    validation.username && <small className="error__message">&#9888;&#160; Please enter your email address</small>
                }
                    {
                    validation.email && <small className="error__message">&#9888;&#160;Please enter your valid email address</small>
                }
                    <CustomTextfield customTextfield__input={
                            validation.username || validation.email || validation.err_pass ? "login__errorInput form-control login__input" : "form-control login__input"
                        }
                        type="text"
                        placeholder="Email"
                        value={username}
                        icon_class="fa fa-envelope-o"
                        handleChange={
                            e => setUsername(e.target.value)
                        }/>
                </div>
                <div className="form-group">
                    {/* {validation.err_pass && <small className="error__message">*Password should be min 8 characters including one uppercase, one lowercase, one number and one special characters</small> } */}
                    {
                    validation.password && <small className="error__message">&#9888;&#160;Please enter password</small>
                }
                    <CustomTextfield customTextfield__input={
                            validation.err_pass || validation.password ? "login__errorInput form-control login__input" : "form-control login__input"
                        }
                        type={
                            showPassword ? "text" : "password"
                        }
                        placeholder="Password"
                        value={password}
                        icon_class={
                            showPassword ? "fa fa-eye-slash login__eye" : "fa fa-eye login__eye"
                        }
                        handleIconClick={iconClick}
                        handleChange={
                            e => setPassword(e.target.value)
                        }/>
                </div>
                <div className="form-group form-check">
                    <div className="d-flex">
                        <div style={{marginTop : "0.15rem"}}>
                            <CustomTextfield customTextfield__input="form-check-input login__checkbox" type="checkbox"
                                handleChange={
                                    () => setCheck(!check)
                                }/>
                        </div>
                        <label className="form-check-label"
                            style={
                                {color: "#009CB4"}
                        }>
                            Remember me
                        </label>

                    </div>
                </div>
                <div className="text-center">
                    {
                    loading ? (
                        <div className="spinner-border text-primary"></div>
                    ) : (
                        <CustomButton customButton__class="login__btn1" text="Login" type="submit"/>
                    )
                } </div>
            </form>

            <p className="text-center"
                style={
                    {marginBottom: "40px"}
            }>
                <Link style={
                        {color: "#009CB4"}
                    }
                    to="/forgotpassword">Forgot Password?</Link>
            </p>
        </div>
    )
}

export default LoginPage;
