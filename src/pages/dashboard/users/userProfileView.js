import React,{useState,useEffect,useContext} from 'react'
import profile from '../../../assets/profile.png'
import CustomTextfield from '../../../customComponents/customTextfield'
import CustomButton from '../../../customComponents/customButton'
import {Link , useHistory, Redirect} from 'react-router-dom'
import camera from '../../../assets/camera.png'
import validator from 'validator'
import UserDetailsContext from '../../../context/user/userDetailsContext'
import days7 from '../../../assets/7.png'
import days30 from '../../../assets/30.png'
import days365 from '../../../assets/365.png'

const UserProfileView =()=> {

    const history = useHistory();
    const context = useContext(UserDetailsContext)
    
    const [UserInformation , setUserInformation] = useState({
        fname : '',
        lname : "",
        email : "",
        phone : "",
        address : "",
        zip_code : "",
        conversions : ""
    })
    const [loading , setLoading] = useState(false)

    useEffect(() => {
         setLoading(true);
            setTimeout(() => {
                setLoading(false);


               if(context.userDetails){
                setUserInformation({
                    ...UserInformation,
                    fname : context.userDetails.fname,
                    lname : context.userDetails.lname,
                    email : context.userDetails.email,
                    fname : context.userDetails.fname,
                    conversions : context.userDetails.conversions,
                    phone : context.userDetails.contact,

                })
               }

            }, 2000);
    }, [])

    const [error , setError] = useState({
        fname : false,
        lname : false,
        email : false,
        phone : false,
        phone_length : false,
        address : false,
        zip_code : false
    })
    const textChange = e=> {
        e.preventDefault();
        setUserInformation({
            ...UserInformation,
            [e.target.name] : e.target.value
        })
    }

    const checkSubmit = e => {
        e.preventDefault();

    
            if(validator.isEmpty(UserInformation.fname)){
                setError({
                    fname : true
                })
            }else if(validator.isEmpty(UserInformation.lname)){
                setError({
                    lname : true
                })
            }else if(!validator.isEmail(UserInformation.email) || validator.isEmpty(UserInformation.email)){
                setError({
                    email : true
                })
            }else if(!validator.isInt(UserInformation.phone) || validator.isEmpty(UserInformation.phone)){
                setError({
                    phone : true
                })
            }
            else if(!validator.isLength(UserInformation.phone,{min : 10  ,max :10})){
                setError({
                    phone_length : true
                })
            }
            else if(validator.isEmpty(UserInformation.address)){
                setError({
                    address : true
                })
            }
            else if(validator.isEmpty(UserInformation.zip_code)){
                setError({
                    zip_code : true
                })
            }else{
                submit();
            }        
    }

    const submit = ()=> {
        setLoading(true);
        setError({
         fname : false,
         lname : false,
         email : false,
         phone : false,
         phone_length : false,
         address : false,
         zip_code : false
          })
 
        setTimeout(() => {
            setLoading(false)
        }, 2000);
     }

    const onBack= e=> {
        e.preventDefault();

        history.push("/dashboard/users")
    }

    if(!context.userDetails){
        return <Redirect to="/dashboard/users"/>
    }

    return (
        <>
            {loading ? (<div className="container text-center" style={{marginTop: "400px" , marginBottom : "50%"}}>   
                <div   className="spinner-border text-primary"></div>
            </div>) : (
                <div className=" container-fluid profile" style={{marginTop: "120px"}}>
                <form onSubmit={checkSubmit}>
                <div className="row">
                    <div className="col-md-12 profile__first">
                            <div className="profile__head d-flex justify-content-between">
                                <h5 style={{marginTop : "20px"}}>Edit User</h5>
                                <div>
                                   <CustomButton customButton__class="btn profile__backbtn"  text="Back" handleClick={onBack}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row profile__body" style={{padding : "1px 20px"}}>
                                <div className="col-md-12" >
                                    <div style={{position: "absolute" ,right : "0px"}}>
                                         <h5 className="text-right" style={{lineHeight :"0.7" , color : "#009CB4"}}>{UserInformation.conversions}</h5>
                                         <p style={{lineHeight :"0.7" , color : "#707070"}}><small>Conversions</small></p>
                                    </div>
                                    <div style={{position : "relative"}}>
                                        <div className="text-center" style={{position : "relative" , width: "180px" , left:"50%" , transform : "translateX(-50%)"}}>
                                              <img width="100rem" className= "rounded-circle" src={profile} alt="profile" style={{color: "black"}}/>
                                              <label htmlFor="userImage" className="userProfile__imgAdd rounded-circle text-center"><img width="20rem" src={camera} alt="add" style={{marginTop : "-7px" , marginLeft : "2px"}}/></label>
                                        </div>
                                    
                                    <input type="file" id="userImage" style={{display : "none"}} accept="image/*"/> 
                                    </div>
                                </div>
                            </div>
                            <div className="row userProfile__first">
                                        <div className="col-md-12">
                                        
                                        <div className="row">
                                            <div className="col" style={{position : "relative"}}>
                                            {error.fname && <small className="profile__error" style={{marginRight :"60px"}}>&#9888;&#160;Please enter first name</small>}
                                            <label htmlFor="fname" style={{lineHeight :"0.4" , color : "#707070"}}>First Name</label>
                                                <CustomTextfield customTextfield__input={error.fname ? "form-control userProfile__firstTextField userProfile__errorInput" : "form-control userProfile__firstTextField"}  type="text" placeholder="First Name" name="fname" value={UserInformation.fname} handleChange={textChange}/>
                                            </div>
                                            <div className="col">
                                            {error.lname && <small className="profile__error" style={{marginRight :"60px"}}>&#9888;&#160;Please enter second name</small>}
                                            <label htmlFor="lname" style={{lineHeight :"0.4" , color : "#707070"}}>Second Name</label>
                                                <CustomTextfield customTextfield__input={error.lname ? "form-control userProfile__firstTextField userProfile__errorInput" : "form-control userProfile__firstTextField"} type="text" placeholder="Last Name" name="lname" value={UserInformation.lname} handleChange={textChange}/>
                                            </div>
                                        </div>
                    
                                     </div>
                            </div>
                    </div>

                    <div className="col-md-12 profile__first p-4 mt-3">
                                <div className="row">
                                            <div className="col">
                                            {error.email && <small className="profile__error">&#9888;&#160;Please enter a valid email</small>}
                                            <label htmlFor="email" style={{lineHeight :"0.4" , color : "#707070"}}>Email</label>
                                                <CustomTextfield customTextfield__input={error.email ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Email" name="email" value={UserInformation.email} handleChange={textChange}/>
                                            </div>
                                            <div className="col">
                                            {error.phone && <small className="profile__error">&#9888;&#160;Please enter a number</small>}
                                            {error.phone_length && <small className="profile__error">&#9888;&#160;Enter a valid number</small>}
                                            <label htmlFor="phone" style={{lineHeight :"0.4" , color : "#707070"}}>Phone Number</label>
                                                <CustomTextfield customTextfield__input={error.phone || error.phone_length ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Phone" name="phone" value={UserInformation.phone} handleChange={textChange}/>
                                            </div>
                                 </div>
                            <div className="row">
                                <div className="col">
                                         {error.address && <small className="profile__error">&#9888;&#160;Phone enter address</small>}
                                        <label htmlFor="address" style={{lineHeight :"0.4" , color : "#707070"}}>Address</label>
                                        <CustomTextfield customTextfield__input={error.address ? "form-control profile__locationInput profile__errorInput" : "form-control profile__locationInput"} type="text"  name="address" value={UserInformation.address} handleChange={textChange}/>
                                </div>
                            </div>
                            <div className="row mt-2">
                            <div className="col-md-4">
                                <div className="row">
                                        <div className="col">
                                            <label htmlFor="city" style={{lineHeight :"0.4" , color : "#707070"}}>City</label>
                                            <select name="city" className="form-control profile__select">
                                            <option value="San jose">San jose</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                            <div className="col">
                                                <label htmlFor="state" style={{lineHeight :"0.4" , color : "#707070"}}>State</label><br/>
                                                <select name="state" className=" form-control profile__select">
                                                <option value="california">California</option>
                                                </select>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="country" style={{lineHeight :"0.4" , color : "#707070"}}>Country</label>
                                            <select name="country" className="form-control profile__select">
                                            <option value="United States">United States</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>                                
                                
                            </div>
        
        
                            <div className="row mt-4">
                                
                                <div className="col-md-6">
                                    <div className="row">
                                    <div className="col">
                                            <label htmlFor="gender" style={{lineHeight :"0.4" , color : "#707070"}}>Gender</label><br/>
                                            <select name="gender" className="form-control profile__genderSelct">
                                            <option value="Male">Male</option>
                                            <option value="Male">Female</option>
                                            <option value="Male">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="row">
                                        <div className="col">
                                            {error.zip_code && <small className="profile__error">&#9888;&#160;Phone enter zip code</small>}
                                            <label htmlFor="zip_code" style={{lineHeight :"0.4" , color : "#707070"}}>Zip Code</label>
                                            <CustomTextfield customTextfield__input={error.zip_code ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Enter zip code" name="zip_code" value={UserInformation.zip_code} handleChange={textChange}/>
                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>

                    <div className="col-md-12 profile__first p-4 mt-3">
                        <div>
                            <h5 className="text-lefy\t mb-4"> Subscription Plans</h5>
                        </div>
                        <hr/>
                            {context.userDetails.subscriptions ? (
                                <div className="d-flex justify-content-left mb-4" style={{overflowX : "auto"}}>                               
                              

                                        <div className="card text-center userProfile__card">
                                            <div className="card-body user__card-body">
                                        
                                                    <img className="mb-3 mt-4" width="60%" src={days7} alt="7"/>
                                                    <p style={{ color : "#707070" , marginBottom : "10%"}}><strong style={{fontSize : "1.4em", color : "#009CB4"}}> $1 </strong> per month</p>
                                                    <div style={{marginTop : "1em"}}>
                                                        <button className="userProfile__subBtn userProfile__active" disabled>Active</button>
                                                    </div>                                                   
                                            
                                            </div>
                                            <div style={{marginTop: "-0.4em"}}>
                                                        <button className="userProfile__subBtn  userProfile__view-details" onClick={() => history.push("/dashboard/users/edit/plan/1")}>View Details</button>
                                            </div>
                                                                            
                                        </div>                                       
                                        

                                        <div className="card text-center userProfile__card">
                                            <div className="card-body user__card-body">
                                        
                                                    <img className="mb-3 mt-4" width="67%" src={days30} alt="7"/>
                                                    <p style={{ color : "#707070" , marginBottom : "10%"}}><strong style={{fontSize : "1.4em", color : "#C00D0D"}}> $10 </strong> per month</p>
                                                    <div style={{marginTop : "1em"}}>
                                                        <button className="userProfile__subBtn userProfile__expired" disabled>Expired</button>
                                                    </div>                                                   
                                            
                                            </div>
                                            <div style={{marginTop: "-0.4em"}}>
                                                        <button className="userProfile__subBtn  userProfile__view-details">View Details</button>
                                            </div>
                                                                            
                                        </div>        

                                        </div>
                           
                            ) : (<div className="text-center" style={{marginBottom: "120px" , marginTop : "70px"}}>
                                    <h6 style={{ color : "#707070" , }}>Didn't choose any subscription yet</h6>
                            </div>)}
                            <hr/>
                            <div className="d-flex justify-content-center">
                               {loading ? (<div  className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class="btn profile__footerBtn" text="Save" type="submit" />
                                <CustomButton customButton__class="btn profile__backbtn"  text="Cancel"/></>)}
                            </div>
                            
                    </div>
        
        
                </div>
                </form>
        </div>
            )}
        </>
    )
}

export default UserProfileView