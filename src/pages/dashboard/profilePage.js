import React,{useState, useEffect} from 'react'
import profile from '../../assets/profile.png'
import CustomTextfield from '../../customComponents/customTextfield'
import CustomButton from '../../customComponents/customButton'
import {Link , useHistory} from 'react-router-dom'
import camera from '../../assets/camera.png'
import validator from 'validator'
import ChangePasswordModal from './modal/changePasswordModal'


function ProfilePage() {

    const history = useHistory();
    const [adminDetails , setAdminDetails] = useState({
        fname : '',
        lname : "",
        email : "",
        phone : "",
        address : "",
        zip_code : ""
    })
    const [modal , setModal] = useState(false)
    const [error , setError] = useState({
        fname : false,
        lname : false,
        email : false,
        phone : false,
        phone_length : false,
        address : false,
        zip_code : false
    })

    const [loading ,  setLoading] = useState(false)
    const textChange = e=> {
        e.preventDefault();
        setAdminDetails({
            ...adminDetails,
            [e.target.name] : e.target.value
        })
    }

    const checkSubmit = e => {
        e.preventDefault();

        // if(!validator.isEmpty(adminDetails.fname) && !validator.isEmpty(adminDetails.lname) && !validator.isEmpty(adminDetails.email) && !validator.isEmpty(adminDetails.phone) 
        // && !validator.isEmpty(adminDetails.address) && !validator.isEmpty(adminDetails.zip_code)){
        //         alert();
        // }
            if(validator.isEmpty(adminDetails.fname)){
                setError({
                    fname : true
                })
            }else if(validator.isEmpty(adminDetails.lname)){
                setError({
                    lname : true
                })
            }else if(!validator.isEmail(adminDetails.email) || validator.isEmpty(adminDetails.email)){
                setError({
                    email : true
                })
            }else if(!validator.isInt(adminDetails.phone) || validator.isEmpty(adminDetails.phone)){
                setError({
                    phone : true
                })
            }
            else if(!validator.isLength(adminDetails.phone,{min : 10  ,max :10})){
                setError({
                    phone_length : true
                })
            }
            else if(validator.isEmpty(adminDetails.address)){
                setError({
                    address : true
                })
            }
            else if(validator.isEmpty(adminDetails.zip_code)){
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
        history.push("/dashboard")
    }

    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div className=" container-fluid profile" style={{marginTop: "120px" }}>
                <form onSubmit={checkSubmit}>
                <div className="row">
                    <div className="col-lg-12 profile__first">
                            <div className="profile__head d-flex justify-content-between">
                                <h5 style={{marginTop : "20px"}}>Profile</h5>
                                <div>
                                   <CustomButton customButton__class="btn profile__backbtn"  text="Back" handleClick={onBack}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row profile__body" style={{padding : "1px 20px"}}>
                                <div className="col-lg-3" >
                                    <div style={{position : "relative" , width: "180px"}}>
                                        <img width="150rem" className= "rounded-circle" src={profile} alt="profile" style={{color: "black"}}/>
                                        <label htmlFor="userImage" className="profile__imgAdd rounded-circle text-center"><img width="20rem" src={camera} alt="add" style={{marginTop : "-7px" , marginLeft : "2px"}}/></label>
                                    </div>
                                    
                                    <input type="file" id="userImage" style={{display : "none"}} accept="image/*"/> 
                                    
                                </div>
                                <div className="col-lg-9">
                                
                                    <div className="row">
                                        <div className="col" style={{position : "relative"}}>
                                        {error.fname && <small className="profile__error">&#9888;&#160;Please enter first name</small>}
                                        <label htmlFor="fname" style={{lineHeight :"0.4" , color : "#707070"}}>First Name</label>
                                            <CustomTextfield customTextfield__input={error.fname ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="First Name" name="fname" value={adminDetails.fname} handleChange={textChange}/>
                                        </div>
                                        <div className="col">
                                        {error.lname && <small className="profile__error">&#9888;&#160;Please enter second name</small>}
                                        <label htmlFor="lname" style={{lineHeight :"0.4" , color : "#707070"}}>Second Name</label>
                                            <CustomTextfield customTextfield__input={error.lname ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Last Name" name="lname" value={adminDetails.lname} handleChange={textChange}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                        {error.email && <small className="profile__error">&#9888;&#160;Please enter email properly</small>}
                                        <label htmlFor="email" style={{lineHeight :"0.4" , color : "#707070"}}>Email</label>
                                            <CustomTextfield customTextfield__input={error.email ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Email" name="email" value={adminDetails.email} handleChange={textChange}/>
                                        </div>
                                        <div className="col">
                                        {error.phone && <small className="profile__error">&#9888;&#160;Please enter a number</small>}
                                        {error.phone_length && <small className="profile__error">&#9888;&#160;Enter a valid number</small>}
                                        <label htmlFor="phone" style={{lineHeight :"0.4" , color : "#707070"}}>Phone Number</label>
                                            <CustomTextfield customTextfield__input={error.phone || error.phone_length ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Phone" name="phone" value={adminDetails.phone} handleChange={textChange}/>
                                        </div>
                                    </div>
                        
                                </div>

                            </div>
                    </div>
                    <div className="col-lg-12 profile__first p-4 mt-3">
                            <div className="row">
                                <div className="col">
                                        {error.address && <small className="profile__error">&#9888;&#160;Phone enter address</small>}
                                        <label htmlFor="address" style={{lineHeight :"0.4" , color : "#707070"}}>Address</label>
                                        <CustomTextfield customTextfield__input={error.address ? "form-control profile__locationInput profile__errorInput" : "form-control profile__locationInput"} type="text"  name="address" value={adminDetails.address} handleChange={textChange}/>
                                </div>
                            </div>
                            <div className="row mt-2">
                            <div className="col-lg-4">
                                <div className="row">
                                        <div className="col">
                                            <label htmlFor="city" style={{lineHeight :"0.4" , color : "#707070"}}>City</label><br/>
                                            <select name="city" className="form-control profile__select">
                                            <option value="San jose">San jose</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="row">
                                            <div className="col">
                                                <label htmlFor="state" style={{lineHeight :"0.4" , color : "#707070"}}>State</label><br/>
                                                <select name="state" className="form-control profile__select">
                                                <option value="california">California</option>
                                                </select>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
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
                                
                                <div className="col-lg-6">
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
                                <div className="col-lg-6">
                                <div className="row">
                                        <div className="col">
                                            {error.zip_code && <small className="profile__error">&#9888;&#160;Phone enter zip code</small>}
                                            <label htmlFor="zip_code" style={{lineHeight :"0.4" , color : "#707070"}}>Zip Code</label>
                                            <CustomTextfield customTextfield__input={error.zip_code ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Enter zip code" name="zip_code" value={adminDetails.zip_code} handleChange={textChange}/>
                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6  style={{lineHeight :"0.4" , color : "#009CB4" , marginBottom : "60px" , textDecoration : "underline"}}><Link onClick={() => setModal(!modal)}>Change Password</Link></h6>
                           
                            <hr/>
                            <div className="d-flex justify-content-center">
                                        {loading ? (<div class="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class=" profile__footerBtn" text="Save" type="submit" />
                                        <CustomButton customButton__class="btn profile__backbtn"  text="Cancel"/></>)}
                            </div>
                    </div>


                </div>
                </form>
                <ChangePasswordModal modal={modal} toggle={toggle}/>
        </div>
    )
}

export default ProfilePage
