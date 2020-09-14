import React, {useState, useEffect, useContext} from 'react'
import profile from '../../../assets/profile.png'
import CustomTextfield from '../../../customComponents/customTextfield'
import CustomButton from '../../../customComponents/customButton'
import {useHistory, Redirect} from 'react-router-dom'
import camera from '../../../assets/camera.png'
import validator from 'validator'
import UserDetailsContext from '../../../context/user/userDetailsContext'
import SubscriptionContext from '../../../context/user-subscription/userSubcriptionContext'
import days7 from '../../../assets/7.png'
import days30 from '../../../assets/30.png'
import days365 from '../../../assets/365.png'
import noSubscriptionImg from "../../../assets/no-subscription.png"

import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';

const UserProfileView = () => {

    const history = useHistory();
    const context = useContext(UserDetailsContext)
    const {setSubscription} = useContext(SubscriptionContext)
    const [UserInformation, setUserInformation] = useState({
        image: '',
        fname: '',
        lname: "",
        email: "",
        phone: "",
        address: "",
        zip_code: "",
        conversions: "",
        city: '',
        country: '',
        region: '',
        gender: '',
        subscription: []
    })
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);


            console.log();
            if (context.userDetails) {
                setUserInformation({
                    ...UserInformation,
                    fname: context.userDetails.firstName,
                    lname: context.userDetails.lastName,
                    email: context.userDetails.email,
                    conversions: context.userDetails.conversion.length,
                    phone: context.userDetails.phoneNumber,
                    country: context.userDetails.country[0].toUpperCase() + context.userDetails.country.slice(1),
                    region: context.userDetails.state[0].toUpperCase() + context.userDetails.state.slice(1),
                    city: context.userDetails.city[0].toUpperCase() + context.userDetails.city.slice(1),
                    zip_code: context.userDetails.zipcode,
                    gender: context.userDetails.gender[0].toUpperCase() + context.userDetails.gender.slice(1),
                    subscription: context.userDetails.subscription,
                    address: context.userDetails.location

                })
            }

        }, 1000);
    }, [reload])

    const [error, setError] = useState({
        fname: false,
        lname: false,
        email: false,
        phone: false,
        phone_length: false,
        address: false,
        city: false,
        region: false,
        country: false,
        zip_code: false


    })
    const textChange = e => {
        e.preventDefault();
        setUserInformation({
            ...UserInformation,
            [e.target.name]: e.target.value
        })
    }

    const checkSubmit = e => {
        e.preventDefault();


        if (validator.isEmpty(UserInformation.fname)) {
            setError({fname: true})
        } else if (validator.isEmpty(UserInformation.lname)) {
            setError({lname: true})
        } else if (!validator.isEmail(UserInformation.email) || validator.isEmpty(UserInformation.email)) {
            setError({email: true})
        } else if (!validator.isInt(UserInformation.phone) || validator.isEmpty(UserInformation.phone)) {
            setError({phone: true})
        } else if (!validator.isLength(UserInformation.phone, {
            min: 10,
            max: 10
        })) {
            setError({phone_length: true})
        } else if (validator.isEmpty(UserInformation.address)) {
            setError({address: true})
        } else if (validator.isEmpty(UserInformation.city)) {
            setError({city: true})
        } else if (validator.isEmpty(UserInformation.country)) {
            setError({country: true})
        } else if (validator.isEmpty(UserInformation.region)) {
            setError({region: true})
        } else if (validator.isEmpty(UserInformation.zip_code)) {
            setError({zip_code: true})
        } else {
            submit();
        }
    }

    const submit = () => {
        setLoading(true);
        setError({
            fname: false,
            lname: false,
            email: false,
            phone: false,
            phone_length: false,
            address: false,
            city: false,
            region: false,
            country: false,
            zip_code: false
        })

        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    const onBack = e => {
        e.preventDefault();

        history.goBack("/dashboard/users")
    }

    const onCancle = e => {
        e.preventDefault();
        setReload(!reload)
    }

    if (! context.userDetails) {
        return <Redirect to="/dashboard/users"/>
    }

    return (<> {loading ? (<div className="container text-center" style={{marginTop: "25%" , marginBottom : "30%"}}>   
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
                                        <label htmlFor="userImage" className="userProfile__imgAdd rounded-circle text-center"><img width="15rem" src={camera} alt="add" style={{marginTop : "-5px" }}/></label>
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
                {error.address && <small className="profile__error">&#9888;&#160;Please enter address</small>}
               <label htmlFor="address" style={{lineHeight :"0.4" , color : "#707070"}}>Address</label>
               <CustomTextfield customTextfield__input={error.address ? "form-control profile__locationInput profile__errorInput" : "form-control profile__locationInput"} type="text"  name="address" value={UserInformation.address} handleChange={textChange}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                        <div className="col-md-4">
                            <div className="row">
               <div className="col">
                   {error.city && <small className="profile__error">&#9888;&#160;Please enter city</small>}
                   <label htmlFor="city" style={{lineHeight :"0.4" , color : "#707070"}}>City</label>
                   <CustomTextfield customTextfield__input={error.city ? "form-control profile__input profile__errorInput" : "form-control profile__input"} type="text"  name="city" value={UserInformation.city} handleChange={textChange}/>
               </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                   <div className="col">
                       {error.region && <small className="profile__error">&#9888;&#160;please select your state</small>}
                       <label htmlFor="state" style={{lineHeight :"0.4" , color : "#707070"}}>State</label><br/>
                       <RegionDropdown className="form-control profile__select" country={UserInformation.country}  value={UserInformation.region}  onChange={(val) => setUserInformation({...UserInformation , region: val})} />
                   </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
               <div className="col">
                   {error.country && <small className="profile__error">&#9888;&#160;please select your country</small>}
                   <label htmlFor="country" style={{lineHeight :"0.4" , color : "#707070"}}>Country</label>
                   <CountryDropdown className="form-control profile__select" value={UserInformation.country}   onChange={(val) => setUserInformation({...UserInformation , country: val})} />
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
                                       
                                                     {UserInformation.subscription.length !== 0  ? (
                 <div className="d-flex justify-content-left mb-4" style={{overflowX : "auto"}}>                               
                                          
                 {UserInformation.subscription.map((sub,i) => (
                    <div className="card text-center userProfile__card" key={i}>
                        <div className="card-body user__card-body">
                    
                                <img className="mb-3 mt-4" width="60%" src={days7} alt="7"/>
                 <p style={{ color : "#707070" , marginBottom : "10%"}}> {sub.cost}</p>
                                <div style={{marginTop : "1em"}}>
                                 <button className={sub.status == true ? "userProfile__subBtn userProfile__active" : "userProfile__subBtn userProfile__expired"} disabled>Active</button>
                                </div>                   
                        
                        </div>
                        <div style={{marginTop: "-0.4em"}}>
                             <button className="userProfile__subBtn  userProfile__view-details" onClick={(e) => (
                                 e.preventDefault(),
                                 setSubscription(sub),
                                 history.push(`/dashboard/users/edit/plan/view`
                             ))}>View Details</button>
                        </div>
                        
                     </div>)) }    
                    
            
                    {/*  <div className="card text-center userProfile__card">
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
                          
                                                      </div>         */}
             
                                                     </div>
                                        
                                         ) : (<div className="text-center" style={{marginBottom: "120px" , marginTop : "70px"}}>
                                             <img width="180px" style={{marginBottom : "40px"}} src={noSubscriptionImg} alt="nosubscription"/>
                                                 <h6 style={{ color : "#707070" , }}>Didn't choose any subscription yet</h6>
                                         </div>)}
                                         <hr/>
                                         <div className="d-flex justify-content-center">
                                                {loading ? (<div className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class="btn profile__footerBtn" text="Save" type="submit" onClick={checkSubmit} />
                                             <CustomButton customButton__class="btn profile__backbtn"  text="Cancel" handleClick={onCancle}/></>)}
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
