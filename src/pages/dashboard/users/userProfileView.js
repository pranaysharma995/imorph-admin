import React, {useState, useEffect, useContext} from 'react'
import CustomTextfield from '../../../customComponents/customTextfield'
import CustomButton from '../../../customComponents/customButton'
import {useHistory, Redirect} from 'react-router-dom'
import camera from '../../../assets/camera.png'
import validator from 'validator'
import UserDetailsContext from '../../../context/user/userDetailsContext'
import SubscriptionContext from '../../../context/user-subscription/userSubcriptionContext'
import noSubscriptionImg from "../../../assets/no-subscription.png"

import axiosInstance from '../../../axios'

import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import CountryCode from '.././countryCode'
import ConfirmationUpdateModal from '../modal/confirmationUpdateModal'

const UserProfileView = () => {

    const history = useHistory();
    const context = useContext(UserDetailsContext)
    const {setSubscription} = useContext(SubscriptionContext)
    const [UserInformation, setUserInformation] = useState({
        image: null,
        fname: '',
        lname: "",
        email: "",
        phone: "",
        address: '',
        zip_code: "",
        conversions: "",
        city: '',
        country: '',
        region: '',
        gender: '',
        subscription: [],
        lastSubscription : null,
        lastSubscriptionStatus : null,
        countryCode : ""
    })
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [imageFile , setImageFile] = useState(null)
    const[loadingBtn , setLoadingBtn] = useState(false)
    const [successFullpopup, setSuccessfullPopup] = useState(false)
    const successfullToggle = () => setSuccessfullPopup(!successFullpopup);
    const [profile , setProfile] = useState(null)

    useEffect(() => {
        setLoading(true);           
            console.log("User Details",context.userDetails);
            if (context.userDetails) {

                let shortedPlan = context.userDetails?.subscription.sort((t1 ,t2) =>{
                    let a= new Date(t1.activateDate);
                    let b= new Date(t2.activateDate);
                    if(a < b){
                        return 1;
                    }else if(a > b){
                        return -1
                    }
                    else return 0
                })

                axiosInstance.get("/admin/image-setting/view",{
                    headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
                }).then(({data}) => {

                    setUserInformation({
                        ...UserInformation,
                        id : context.userDetails._id,
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
                        subscription: shortedPlan,
                        address: context.userDetails.location,
                        image :"http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/user/"+context.userDetails.profileImage ,
                        lastSubscription : context.userDetails.lastSubscription,
                        lastSubscriptionStatus : context.userDetails.lastSubscriptionStatus,
                        countryCode : context.userDetails.countryCode
                    })

                    setProfile(data?.data[0]?.userIcon)
                    setLoading(false);
                }).catch(error => {
                    console.log("Error in routerComponent", error);
                })              
            }
    }, [reload])


    const [imageError , setImageError] = useState(false)
    const [fNameError , setfNameError] = useState(false)
    const [lNameError , setlNameError] = useState(false)
    const [emailError , setEmailError] = useState(false)
    const [phoneError , setPhoneError] = useState(false)
    const [phoneLengthError , setPhoneLengthError] = useState(false)
    const [addressError , setAddressError] = useState(false)
    const [cityError , setCityError] = useState(false)
    const [regionError , setRegionError] = useState(false)
    const [countryError , setCountryError] = useState(false)
    const [zipCodeError , setZipCodeError] = useState(false)

    useEffect(() => {
        if(fNameError||lNameError || emailError || phoneError || phoneLengthError || addressError
             || cityError || regionError || countryError || zipCodeError || imageError){
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
             }
        },[imageError , fNameError , lNameError , emailError, phoneError ,  phoneLengthError , addressError , cityError ,regionError ,countryError , zipCodeError  ])



    const textChange = e => {
        e.preventDefault();
        if(e.target.name === "phone"){
            if(e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)){
                setUserInformation({
                    ...UserInformation,
                    [e.target.name]: e.target.value
                })
            }
        }else if(e.target.name === "zip_code"){
            if(e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)){
                setUserInformation({
                    ...UserInformation,
                    [e.target.name]: e.target.value
                })
            }
        }
        else {
        setUserInformation({
            ...UserInformation,
            [e.target.name]: e.target.value
        })
    }
    }

    const checkSubmit = e => {
        e.preventDefault();


        if (validator.isEmpty(UserInformation.fname)) {
            setfNameError(true)
            
                setImageError(false)
                setlNameError(false)
                setEmailError (false)
                setPhoneError(false)
                setPhoneLengthError(false)
                setAddressError(false)
                setCityError (false)
                setRegionError (false)
                setCountryError (false)
                setZipCodeError(false)
            if (validator.isEmpty(UserInformation.lname)) {
                setlNameError(true)
            }  if (!validator.isEmail(UserInformation.email) || validator.isEmpty(UserInformation.email)) {
                setEmailError(true)
                
            }  if (!validator.isInt(UserInformation.phone) || validator.isEmpty(UserInformation.phone)) {
                setPhoneError(true)
            } else if (!validator.isLength(UserInformation.phone, {
                min: 10,
                max: 10
            })) {
                setPhoneLengthError(true)

            }  if (validator.isEmpty(UserInformation.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(UserInformation.city)) {
                setCityError(true)
            } if (validator.isEmpty(UserInformation.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }else if(validator.isEmpty(UserInformation.lname)){
            setlNameError(true);
            
         setImageError(false)
         setfNameError (false)
         setEmailError (false)
         setPhoneError(false)
         setPhoneLengthError(false)
         setAddressError(false)
         setCityError (false)
         setRegionError (false)
         setCountryError (false)
         setZipCodeError(false)


            if (!validator.isEmail(UserInformation.email) || validator.isEmpty(UserInformation.email)) {
                setEmailError(true)
            }  if (!validator.isInt(UserInformation.phone) || validator.isEmpty(UserInformation.phone)) {
                setPhoneError(true)
            } else if (!validator.isLength(UserInformation.phone, {
                min: 10,
                max: 10
            })) {
                setPhoneLengthError(true)

            }  if (validator.isEmpty(UserInformation.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(UserInformation.city)) {
                setCityError(true)
            } if (validator.isEmpty(UserInformation.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }

        }
        else if(!validator.isEmail(UserInformation.email) || validator.isEmpty(UserInformation.email)){
            setEmailError(true)
            
         setImageError(false)
         setfNameError (false)
         setlNameError(false)
         setPhoneError(false)
         setPhoneLengthError(false)
         setAddressError(false)
         setCityError (false)
         setRegionError (false)
         setCountryError (false)
         setZipCodeError(false)

            if (!validator.isInt(UserInformation.phone) || validator.isEmpty(UserInformation.phone)) {
                setPhoneError(true)
            } else if (!validator.isLength(UserInformation.phone, {
                min: 10,
                max: 10
            })) {
                setPhoneLengthError(true)

            }  if (validator.isEmpty(UserInformation.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(UserInformation.city)) {
                setCityError(true)
            } if (validator.isEmpty(UserInformation.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }

        else if(!validator.isInt(UserInformation.phone) || validator.isEmpty(UserInformation.phone)){
            setPhoneError(true);

            setImageError(false)
            setfNameError (false)
            setlNameError(false)
            setEmailError (false)
            setPhoneLengthError(false)
            setAddressError(false)
            setCityError (false)
            setRegionError (false)
            setCountryError (false)
            setZipCodeError(false)

             if (validator.isEmpty(UserInformation.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(UserInformation.city)) {
                setCityError(true)
            } if (validator.isEmpty(UserInformation.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }

        else if(!validator.isLength(UserInformation.phone, {
            min: 10,
            max: 10
        })){
            setPhoneLengthError(true)

            setImageError(false)
            setfNameError (false)
            setlNameError(false)
            setEmailError (false)
            setPhoneError(false)
            setAddressError(false)
            setCityError (false)
            setRegionError (false)
            setCountryError (false)
            setZipCodeError(false)

            if (validator.isEmpty(UserInformation.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(UserInformation.city)) {
                setCityError(true)
            } if (validator.isEmpty(UserInformation.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }

        else if(validator.isEmpty(UserInformation.address)){
            setAddressError(true)

            
         setImageError(false)
         setfNameError (false)
         setlNameError(false)
         setEmailError (false)
         setPhoneError(false)
         setPhoneLengthError(false)
         setCityError (false)
         setRegionError (false)
         setCountryError (false)
         setZipCodeError(false)

            if (validator.isEmpty(UserInformation.city)) {
                setCityError(true)
            } if (validator.isEmpty(UserInformation.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(UserInformation.city)){
            setCityError(true)

            
         setImageError(false)
         setfNameError (false)
         setlNameError(false)
         setEmailError (false)
         setPhoneError(false)
         setPhoneLengthError(false)
         setAddressError(false)
         setRegionError (false)
         setCountryError (false)
         setZipCodeError(false)

            if (validator.isEmpty(UserInformation.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(UserInformation.country)){
            setCountryError(true)

            
         setImageError(false)
         setfNameError (false)
         setlNameError(false)
         setEmailError (false)
         setPhoneError(false)
         setPhoneLengthError(false)
         setAddressError(false)
         setCityError (false)
         setRegionError (false)
         setZipCodeError(false)

            if (validator.isEmpty(UserInformation.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(UserInformation.region)){
            setRegionError(true)

            setImageError(false)
            setfNameError (false)
            setlNameError(false)
            setEmailError (false)
            setPhoneError(false)
            setPhoneLengthError(false)
            setAddressError(false)
            setCityError (false)
            setCountryError (false)
            setZipCodeError(false)

            if (validator.isEmpty(UserInformation.zip_code)) {
                setZipCodeError(true)
            } if (UserInformation.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(UserInformation.zip_code)){
            setZipCodeError(true)

            
         setImageError(false)
         setfNameError (false)
         setlNameError(false)
         setEmailError (false)
         setPhoneError(false)
         setPhoneLengthError(false)
         setAddressError(false)
         setCityError (false)
         setRegionError (false)
         setCountryError (false)

            if (UserInformation.image == null) {
                setImageError(true)
            }
        }else if(UserInformation.image == null){
            setImageError(true)

            
         setfNameError (false)
         setlNameError(false)
         setEmailError (false)
         setPhoneError(false)
         setPhoneLengthError(false)
         setAddressError(false)
         setCityError (false)
         setRegionError (false)
         setCountryError (false)
         setZipCodeError(false)
        }
         else {
            submit();
        }
    }

    
    const handleUpload = async e => {
        e.preventDefault();
        let file = e.target.files[0];
        console.log("Admin Image", file)
        setImageFile(e.target.files[0])
        if (file) {            
            let base64Image = await new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    resolve(fileReader.result)
                };
                fileReader.onerror = err => {
                    reject(err)
                }
            })

            if (base64Image !== undefined) {
                console.log("Baaase64", base64Image);  
                setUserInformation({
                    ...UserInformation,
                    image: base64Image
                })     
                setImageError (false)          
            }
        }
         else {
            setImageError (false)   
            setUserInformation({
                ...UserInformation,
                image: null
            })
        }
    }

    const submit = () => {
        
        setLoadingBtn(true);

        setImageError(false)
        setfNameError (false)
        setlNameError(false)
        setEmailError (false)
        setPhoneError(false)
        setPhoneLengthError(false)
        setAddressError(false)
        setCityError (false)
        setRegionError (false)
        setCountryError (false)
        setZipCodeError(false)

        let useData = new FormData();
        useData.set("userID", UserInformation.id );
        useData.set("firstName", UserInformation.fname)
        useData.set("lastName", UserInformation.lname)
        useData.set("email", UserInformation.email)
        useData.set("phoneNumber", UserInformation.phone)
        useData.append("profileImage", imageFile!==null ? imageFile : UserInformation.image)
        useData.set("country", UserInformation.country)
        useData.set("state", UserInformation.region)
        useData.set("city", UserInformation.city)
        useData.set("location", UserInformation.address)
        useData.set("zipcode", UserInformation.zip_code)
        useData.set("gender", UserInformation.gender)
        useData.set("countryCode", UserInformation.countryCode)
        axiosInstance.post("/user/update", useData , {
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(({data}) => {
                console.log("Result of updated user Data ", data);
                context.setUserDetails(data?.data);
                setSuccessfullPopup(true);
                setImageFile(null)
                setTimeout(() => {
                    setSuccessfullPopup(false)
                    setLoadingBtn(false);
                    setReload(!reload)                    
                }, 650);               
        }).catch(error => {
            console.log("Error in Posting user Data userProfileView.js" , error);
        })
    }


    const onBack = e => {
        e.preventDefault();

        history.goBack()
    }

    const onCancle = e => {
        e.preventDefault();
        setReload(!reload);
        setImageFile(null)


         setImageError(false)
        setfNameError (false)
        setlNameError(false)
        setEmailError (false)
        setPhoneError(false)
        setPhoneLengthError(false)
        setAddressError(false)
        setCityError (false)
        setRegionError (false)
        setCountryError (false)
        setZipCodeError(false)
    }

    if (!context.userDetails) {
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
                                                    {
                                        imageError  && <small className="text-danger">&#9888;&#160;Please select a image</small>
                                    }
                                <div className="text-center" style={{position : "relative" , width: "180px" , left:"50%" , transform : "translateX(-50%)"}}>
                                        <img style={{objectFit :'cover'}} width="100rem" height="100rem" className= "rounded-circle" src={UserInformation.image ? UserInformation.image :  `http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/${profile}`} alt="profile" style={{color: "black"}}/>
                                        {/* <label htmlFor="userImage" className="userProfile__imgAdd rounded-circle text-center"><img width="15rem" src={camera} alt="add" style={{marginTop : "-5px" }}/></label> */}
                                </div>
                                
                                <input type="file" id="userImage" style={{display : "none"}} accept="image/*" onChange={handleUpload} /> 
                                </div>
                            </div>
                        </div>
                        <div className="row userProfile__first">
                            <div className="col-md-12">
                            
                            <div className="row">
                                <div className="col" style={{position : "relative"}}>
                                {fNameError  && <small className="profile__error" style={{marginRight :"60px"}}>&#9888;&#160;Please enter first name</small>}
                                <label htmlFor="fname" style={{lineHeight :"0.4" , color : "#707070"}}>First Name</label>
                                    <CustomTextfield disabled={true} customTextfield__input={fNameError  ? "form-control userProfile__firstTextField userProfile__errorInput" : "form-control userProfile__firstTextField"}  type="text" placeholder="First Name" name="fname" value={UserInformation.fname} handleChange={textChange}/>
                                </div>
                                <div className="col">
                                {lNameError  && <small className="profile__error" style={{marginRight :"60px"}}>&#9888;&#160;Please enter second name</small>}
                                <label htmlFor="lname" style={{lineHeight :"0.4" , color : "#707070"}}>Second Name</label>
                                    <CustomTextfield disabled={true} customTextfield__input={lNameError  ? "form-control userProfile__firstTextField userProfile__errorInput" : "form-control userProfile__firstTextField"} type="text" placeholder="Last Name" name="lname" value={UserInformation.lname} handleChange={textChange}/>
                                </div>
                            </div>                
                    </div>

                        </div>
                </div>
                 
                <div className="col-md-12 profile__first p-4 mt-4 pt-4">
                            <div className="row">
                   <div className="col-md-6">
                   {emailError  && <small className="profile__error">&#9888;&#160;Please enter a valid email</small>}
                   <label htmlFor="email" style={{lineHeight :"0.4" , color : "#707070"}}>Email</label>
                       <CustomTextfield disabled={true} customTextfield__input={emailError  ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Email" name="email" value={UserInformation.email} handleChange={textChange}/>
                   </div>
                   <div className="col-md-6">
                   {phoneError  && <small className="profile__error">&#9888;&#160;Please enter a number</small>}
                   {phoneLengthError  && <small className="profile__error">&#9888;&#160;Enter a valid number</small>}
                   <label htmlFor="phone" style={{lineHeight :"0.4" , color : "#707070"}}>Phone Number</label>
                   <div className="input-group mb-3">
                            <div className="input-group-prepend" style={{width : "20%"}}>
                                <CountryCode disabled={true} name="countryCode" value={UserInformation.countryCode} handleContryCodeChange={textChange}/>
                                    </div>
                                <input disabled={true} className={
                                       phoneError|| phoneLengthError? "form-control profile__phone-input profile__errorInput" : "form-control profile__phone-input"
                                    }
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={
                                        UserInformation.phone
                                    }
                                    onChange={textChange} />
                                </div>
                   </div>
                             </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                {addressError  && <small className="profile__error">&#9888;&#160;Please enter address</small>}
               <label htmlFor="address" style={{lineHeight :"0.4" , color : "#707070"}}>Address</label>
               <CustomTextfield disabled={true} customTextfield__input={addressError  ? "form-control profile__locationInput profile__errorInput" : "form-control profile__locationInput"} type="text"  name="address" value={UserInformation.address} handleChange={textChange}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                         <div className="col-md-4">
                            <div className="row">
                                <div className="col mb-1">
                                    {cityError  && <small className="profile__error">&#9888;&#160;Please enter city</small>}
                                    <label htmlFor="city" style={{lineHeight :"0.4" , color : "#707070"}}>City</label>
                                    <CustomTextfield disabled={true} customTextfield__input={cityError  ? "form-control profile__input profile__errorInput" : "form-control profile__input"} type="text"  name="city" value={UserInformation.city} handleChange={textChange}/>
                                </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="row">
                                                <div className="col mb-4">
                                                    {regionError  && <small className="profile__error">&#9888;&#160;please select your state</small>}
                                                    <label htmlFor="state" style={{lineHeight :"0.4" , color : "#707070"}}>State</label><br/>
                                                    <RegionDropdown disabled className="form-control profile__select" country={UserInformation.country}  value={UserInformation.region}  onChange={(val) => setUserInformation({...UserInformation , region: val})} />
                                                </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="row">
                                                <div className="col">
                                                    {countryError  && <small className="profile__error">&#9888;&#160;please select your country</small>}
                                                    <label htmlFor="country" style={{lineHeight :"0.4" , color : "#707070"}}>Country</label>
                                                    <CountryDropdown disabled className="form-control profile__select" value={UserInformation.country}   onChange={(val) => setUserInformation({...UserInformation , country: val})} />
                                                </div>
                                                </div>
                            </div>           
                            
                        </div>
                         
                         
                        <div className="row mt-3 ">
                            
                            <div className="col-md-6 mb-4" >
                                <div className="row">
                                <div className="col">
                                    <label htmlFor="gender" style={{lineHeight :"0.4" , color : "#707070"}}>Gender</label><br/>
                                    <select disabled name="gender" className="form-control profile__genderSelct" 
                                    value={ UserInformation.gender} onChange={textChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className="row">
                                <div className="col">
                                    {zipCodeError  && <small className="profile__error">&#9888;&#160;Phone enter zip code</small>}
                                    <label htmlFor="zip_code" style={{lineHeight :"0.4" , color : "#707070"}}>Zip Code</label>
                                    <CustomTextfield disabled={true} customTextfield__input={zipCodeError  ? "form-control profile__input profile__errorInput" : "form-control profile__input"}  type="text" placeholder="Enter zip code" name="zip_code" value={UserInformation.zip_code} handleChange={textChange}/>
                                
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
                        <div className="card-body user__card-body" style={{position : "relative"}}>
                    
                                <img className="mb-3 mt-4" width="60%" height="50px" src={"http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/subscription/"+sub.image} alt="7"/>
                                <p style={{ color : "#707070" , marginBottom : "10%"}}> {sub.cost}</p>
                                <div style={{marginTop : "1em"}}>
                                 <button className={ UserInformation.lastSubscription?.name ==  sub.name && UserInformation.lastSubscription?.userStatus == true ? "userProfile__subBtn userProfile__active" : "userProfile__subBtn userProfile__expired"} disabled> {UserInformation.lastSubscriptionStatus && UserInformation.lastSubscription?.name ==  sub.name && UserInformation.lastSubscription?.userStatus == true ? "Active" : "Expired" }</button>
                                </div>                   
                        
                        </div>
                        <div style={{marginTop: "-0.4em" ,zIndex: "2"}}>
                             <button className="userProfile__subBtn  userProfile__view-details responsiveView__button" style={{width: "120px"}} onClick={(e) => (
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
                                             <img  width="180px" style={{marginBottom : "40px" , objectFit : 'cover'}} src={noSubscriptionImg} alt="nosubscription"/>
                                                 <h6 style={{ color : "#707070" , }}>Didn't choose any subscription yet</h6>
                                         </div>)}
                                        
                                         
                                 </div>
                     
                     
                             </div>
                             </form>
                        </div>
                         )}
                         <ConfirmationUpdateModal  modall={successFullpopup} tog={successfullToggle}/>
                      </>
    )
}

export default UserProfileView
