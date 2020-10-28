import React, {useState, useEffect,useContext} from 'react'
import profile from '../../assets/profile.png'
import CustomTextfield from '../../customComponents/customTextfield'
import CustomButton from '../../customComponents/customButton'
import {useHistory} from 'react-router-dom'
import camera from '../../assets/camera.png'
import validator from 'validator'
import ChangePasswordModal from './modal/changePasswordModal'
import axiosInstance from '../../axios'
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import AdminContext from '../../context/admin/adminDetailsContext'
import CountryCode from './countryCode'
import ConfirmationUpdateModal from './modal/confirmationUpdateModal'


function ProfilePage({refresh , refreshValue}) {

    const history = useHistory();
    const {adminData} = useContext(AdminContext);
    const [modal, setModal] = useState(false);
    const [adminDetails, setAdminDetails] = useState({
        fname: '',
        lname: "",
        email: "",
        phone: "",
        address: "",
        zip_code: "",
        city: '',
        country: '',
        region: '',
        gender: '',
        image: null,
        countryCode : ""
    })
    const [successFullpopup, setSuccessfullPopup] = useState(false)
    const [imageFile , setImageFile] = useState(null)
    //errors 
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

    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [reload, setReload] = useState(false)
    const successfullToggle = () => setSuccessfullPopup(!successFullpopup);

    useEffect(() => {
        if(fNameError||lNameError || emailError || phoneError || phoneLengthError || addressError
             || cityError || regionError || countryError || zipCodeError || imageError){
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
             }
        },[imageError , fNameError , lNameError , emailError, phoneError ,  phoneLengthError , addressError , cityError ,regionError ,countryError , zipCodeError  ])

    useEffect(() => {
        setLoading(true)
       if(adminData) {
        setLoading(false)
       
            setAdminDetails({
                ...adminDetails,
                fname: adminData?.firstName,
                lname: adminData?.lastName,
                email: adminData?.email,
                phone: adminData?.phoneNumber,
                zip_code: adminData?.zipcode,
                address: adminData?.location,
                city: adminData?.city[0].toUpperCase() + adminData?.city.slice(1),
                country: adminData?.country[0].toUpperCase() + adminData?.country.slice(1),
                region: adminData?.state[0].toUpperCase() + adminData?.state.slice(1),
                image: adminData?.profileImage,
                gender: adminData?.gender[0].toUpperCase() + adminData?.gender.slice(1),
                countryCode : adminData?.countryCode
            })
       };
            // axiosInstance.get("/admin/profile", {
            //     params: {
            //         id: uid
            //     }
            // }).then(({data}) => {
            //     let adminData = data.data
                
            //     setLoading(false)
            // }).catch(err => console.log("Error in admin fetch", err))
    }, [adminData , reload])


    const textChange = e => {
        e.preventDefault();
        if(e.target.name === "phone"){
            if(e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)){
                setAdminDetails({
                    ...adminDetails,
                    [e.target.name]: e.target.value
                })
            }
        }else if(e.target.name === "zip_code"){
            if(e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)){
                setAdminDetails({
                    ...adminDetails,
                    [e.target.name]: e.target.value
                })
            }
        }

        else if(e.target.name === 'city'){
            if(!e.target.value.match(/[0-9\b]+$/gi) || e.target.value === ''){
                setAdminDetails({
                    ...adminDetails,
                    [e.target.name]: e.target.value
                })
            }
        }
        else {
            setAdminDetails({
                ...adminDetails,
                [e.target.name]: e.target.value
            })
    }
    }

    const checkSubmit = e => {
        e.preventDefault();
        // if(!validator.isEmpty(adminDetails.fname) && !validator.isEmpty(adminDetails.lname) && !validator.isEmpty(adminDetails.email) && !validator.isEmpty(adminDetails.phone)
        // && !validator.isEmpty(adminDetails.address) && !validator.isEmpty(adminDetails.zip_code)){
        //         alert();
        // }
        if (validator.isEmpty(adminDetails.fname)) {
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

            if (validator.isEmpty(adminDetails.lname)) {
                setlNameError(true)
            }  if (!validator.isEmail(adminDetails.email) || validator.isEmpty(adminDetails.email)) {
                setEmailError(true)
            }  if (!validator.isInt(adminDetails.phone) || validator.isEmpty(adminDetails.phone)) {
                setPhoneError(true)
            }  else if (!validator.isLength(adminDetails.phone, {
                min: 10,
                max: 10
            })) {
                setPhoneLengthError(true)

            }  if (validator.isEmpty(adminDetails.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(adminDetails.city)) {
                setCityError(true)
            } if (validator.isEmpty(adminDetails.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }else if(validator.isEmpty(adminDetails.lname)){
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

            if (!validator.isEmail(adminDetails.email) || validator.isEmpty(adminDetails.email)) {
                setEmailError(true)
            }  if (!validator.isInt(adminDetails.phone) || validator.isEmpty(adminDetails.phone)) {
                setPhoneError(true)
            }  else if (!validator.isLength(adminDetails.phone, {
                min: 10,
                max: 10
            })) {
                setPhoneLengthError(true)

            }  if (validator.isEmpty(adminDetails.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(adminDetails.city)) {
                setCityError(true)
            } if (validator.isEmpty(adminDetails.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }

        }
        else if(!validator.isEmail(adminDetails.email) || validator.isEmpty(adminDetails.email)){
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

            if (!validator.isInt(adminDetails.phone) || validator.isEmpty(adminDetails.phone)) {
                setPhoneError(true)
            } else if (!validator.isLength(adminDetails.phone, {
                min: 10,
                max: 10
            })) {
                setPhoneLengthError(true)

            }  if (validator.isEmpty(adminDetails.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(adminDetails.city)) {
                setCityError(true)
            } if (validator.isEmpty(adminDetails.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }

        else if(!validator.isInt(adminDetails.phone) || validator.isEmpty(adminDetails.phone)){
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

            if (validator.isEmpty(adminDetails.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(adminDetails.city)) {
                setCityError(true)
            } if (validator.isEmpty(adminDetails.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }

        else if(!validator.isLength(adminDetails.phone, {
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


            if (validator.isEmpty(adminDetails.address)) {
                setAddressError(true)
            }  if (validator.isEmpty(adminDetails.city)) {
                setCityError(true)
            } if (validator.isEmpty(adminDetails.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }

        else if(validator.isEmpty(adminDetails.address)){
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

            if (validator.isEmpty(adminDetails.city)) {
                setCityError(true)
            } if (validator.isEmpty(adminDetails.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(adminDetails.city)){
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

            if (validator.isEmpty(adminDetails.country)) {
                setCountryError(true)
            }  if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(adminDetails.country)){
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


            if (validator.isEmpty(adminDetails.region)) {
                setRegionError(true)
            }  if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(adminDetails.region)){
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

            if (validator.isEmpty(adminDetails.zip_code)) {
                setZipCodeError(true)
            } if (adminDetails.image == null) {
                setImageError(true)
            }
        }
        else if(validator.isEmpty(adminDetails.zip_code)){
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

            if (adminDetails.image == null) {
                setImageError(true)
            }
        }
        else if(adminDetails.image == null){
            setImageError(true)
        }
         else {
            submit();
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

        let data = new FormData();
        data.set("id", localStorage.getItem('uid') ? localStorage.getItem('uid') : sessionStorage.getItem('uid'));
        data.set("firstName", adminDetails.fname)
        data.set("lastName", adminDetails.lname)
        data.set("email", adminDetails.email)
        data.set("phoneNumber", adminDetails.phone)
        data.append("profileImage", imageFile!==null ? imageFile : adminDetails.image)
        data.set("country", adminDetails.country)
        data.set("state", adminDetails.region)
        data.set("city", adminDetails.city)
        data.set("location", adminDetails.address)
        data.set("zipcode", adminDetails.zip_code)
        data.set("gender", adminDetails.gender)
        data.set("countryCode", adminDetails.countryCode)

        axiosInstance.post("/admin/update-profile", data ,{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(({data}) => {
            console.log("Updated Admin Details", data);
            
            setSuccessfullPopup(true)
            setTimeout(() => {
                setReload(!reload)
                refresh(!refreshValue)
                setSuccessfullPopup(false)
                setLoadingBtn(false);
                setImageFile(null)
            }, 600);
            
        }).catch(error => {
            console.log("Error in Admin Update", error);
        })
    }

    const onBack = e => {
        e.preventDefault();
        history.goBack()
    }

    const toggle = () => {
        setModal(!modal);
       
    }

    const handleUpload = async e => {
        e.preventDefault();
        let file = e.target.files[0];
        console.log("Admin Image", file)
        setImageFile(file)
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
                setAdminDetails({
                    ...adminDetails,
                    image: base64Image
                })  
                setImageError (false)          
            }
        }
         else {
            setImageError (false)   
            setAdminDetails({
                ...adminDetails,
                image: null
            })
        }
    }

    const onCancle = e => {
        e.preventDefault();
        setReload(!reload)
        setImageFile(null);

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

    return (
        <> 
        {loading ? (
                <div className="container text-center"
                    style={
                        {
                            marginTop: "400px",
                            marginBottom: "50%"
                        }
                }>
                    <div className="spinner-border text-primary"></div>
                </div>
            ) : <div className=" container-fluid profile"
                    style={
                        {marginTop: "120px"}
                }>
                    <form method="POST" encType="multipart/form-data" action="#"
                        onSubmit={checkSubmit}>
                        <div className="row">
                            <div className="col-lg-12 profile__first">
                                <div className="profile__head d-flex justify-content-between">
                                    <h5 style={
                                        {marginTop: "20px"}
                                    }>Profile</h5>
                                    
                                        <CustomButton customButton__class="btn profile__backbtn" text="Back"
                                            handleClick={onBack}/>
                                
                                </div>
                                <hr/>
                                <div className="row profile__body"
                                    style={
                                        {padding: "1px 20px"}
                                }>

                                    <div className="col-lg-3">
                                        {
                                        imageError  && <small className="profile__error">&#9888;&#160;Please select a image</small>
                                    }
                                        <div className="text-center" style={
                                            {
                                                position: "relative",
                                                width: "100%"
                                            }
                                        }>
                                            
                                            <img width="150rem" height="150rem" className="rounded-circle"
                                                src={
                                                    adminDetails.image != null ? imageFile!=null ?adminDetails.image : "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/"+adminDetails.image : profile
                                                }
                                                alt="profile"
                                                style={
                                                    {
                                                        color: "black",
                                                        maxHeight: "150px"
                                                    }
                                                }/>
                                            <label htmlFor="adminImage" className="profile__imgAdd rounded-circle text-center"><img width="15rem"
                                                    src={camera}
                                                    alt="add"
                                                    style={
                                                        {
                                                            marginTop: "-5px",
                                                        
                                                        }
                                                    }/></label>
                                        </div>

                                        <input type="file" id="adminImage"

                                            onChange={handleUpload}
                                            style={
                                                {display: "none"}
                                            }
                                            accept="image/*"/>

                                    </div>
                                    <div className="col-lg-9">

                                        <div className="row">
                                            <div className="col-md-6"
                                                style={
                                                    {position: "relative"}
                                            }>
                                                {
                                                fNameError  && <small className="profile__error">&#9888;&#160;Please enter first name</small>
                                            }
                                                <label htmlFor="fname"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>First Name</label>
                                                <CustomTextfield customTextfield__input={
                                                        fNameError  ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                                                    }
                                                    type="text"
                                                    placeholder="First Name"
                                                    name="fname"
                                                    value={
                                                        adminDetails.fname
                                                    }
                                                    handleChange={textChange}/>
                                            </div>
                                            <div className="col-md-6">
                                                {
                                                lNameError  && <small className="profile__error">&#9888;&#160;Please enter second name</small>
                                            }
                                                <label htmlFor="lname"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>Second Name</label>
                                                <CustomTextfield customTextfield__input={
                                                        lNameError  ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                                                    }
                                                    type="text"
                                                    placeholder="Last Name"
                                                    name="lname"
                                                    value={
                                                        adminDetails.lname
                                                    }
                                                    handleChange={textChange}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                {
                                                emailError  && <small className="profile__error">&#9888;&#160;Please enter email properly</small>
                                            }
                                                <label htmlFor="email"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>Email</label>
                                                <CustomTextfield customTextfield__input={
                                                        emailError  ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                                                    }
                                                    type="text"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={
                                                        adminDetails.email
                                                    }
                                                    handleChange={textChange}/>
                                            </div>
                                            <div className="col-md-6">
                                                {
                                                phoneError  && <small className="profile__error">&#9888;&#160;Please enter a number</small>
                                            }
                                                {
                                               phoneLengthError && <small className="profile__error">&#9888;&#160;Enter a valid number</small>
                                            }
                                                <label htmlFor="phone"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>Phone Number</label>

                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend" style={{width : "20%"}}>
                                                        <CountryCode name="countryCode" value={adminDetails.countryCode} handleContryCodeChange={textChange}/>
                                                    </div>
                                                    <input className={
                                                        phoneError  || phoneLengthError ? "form-control profile__phone-input profile__errorInput" : "form-control profile__phone-input"
                                                    }
                                                    type="text"
                                                    placeholder="Phone"
                                                    name="phone"
                                                    value={
                                                        adminDetails.phone
                                                    }
                                                    onChange={textChange} />
                                                </div>
                                               
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-12 profile__first p-4 mt-3">
                                <div className="row">
                                    <div className="col">
                                        {
                                        addressError && <small className="profile__error">&#9888;&#160;Phone enter address</small>
                                    }
                                        <label htmlFor="address"
                                            style={
                                                {
                                                    lineHeight: "0.4",
                                                    color: "#707070"
                                                }
                                        }>Address</label>
                                        <CustomTextfield customTextfield__input={
                                                addressError ? "form-control profile__locationInput profile__errorInput" : "form-control profile__locationInput"
                                            }
                                            type="text"
                                            name="address"
                                            value={
                                                adminDetails.address
                                            }
                                            handleChange={textChange}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-4">                               
                                        
                                                {
                                                cityError && <small className="profile__error">&#9888;&#160;Please enter city</small>
                                            }
                                                <label htmlFor="city"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>City</label><br/>
                                                <CustomTextfield customTextfield__input={
                                                        cityError ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                                                    }
                                                    type="text"
                                                    name="city"
                                                    value={
                                                        adminDetails.city
                                                    }
                                                    handleChange={textChange}/>
                                           
                                    </div>
                                    <div className="col-md-4 mb-4">
                                       
                                                {
                                                regionError && <small className="profile__error">&#9888;&#160;please select your state</small>
                                            }
                                                <label htmlFor="state"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>State</label><br/>
                                                <RegionDropdown className="form-control profile__select"
                                                    country={
                                                        adminDetails.country
                                                    }
                                                    value={
                                                        adminDetails.region
                                                    }
                                                    onChange={
                                                        (val) => setAdminDetails({
                                                            ...adminDetails,
                                                            region: val
                                                        })
                                                    }/>
                                            
                                    </div>
                                    <div className="col-md-4">
                                        
                                                {
                                                countryError  && <small className="profile__error">&#9888;&#160;please select your country</small>
                                            }
                                                <label htmlFor="country"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>Country</label>
                                                <CountryDropdown className="form-control profile__select"
                                                    value={
                                                        adminDetails.country
                                                    }
                                                    onChange={
                                                        (val) => setAdminDetails({
                                                            ...adminDetails,
                                                            country: val
                                                        })
                                                    }/>
                                            
                                    </div>

                                </div>


                                <div className="row mt-3 profile__grnderPadding">

                                    <div className="col-md-6 mb-4">
                    
                                                <label htmlFor="gender"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>Gender</label><br/>
                                                <select name="gender" className="form-control profile__genderSelct"
                                                    value={
                                                        adminDetails.gender
                                                    }
                                                    onChange={textChange}>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                          
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col">
                                                {
                                                zipCodeError && <small className="profile__error">&#9888;&#160;Phone enter zip code</small>
                                            }
                                                <label htmlFor="zip_code"
                                                    style={
                                                        {
                                                            lineHeight: "0.4",
                                                            color: "#707070"
                                                        }
                                                }>Zip Code</label>
                                                <CustomTextfield customTextfield__input={
                                                        zipCodeError ? "form-control profile__input profile__errorInput" : "form-control profile__input"
                                                    }
                                                    type="text"
                                                    placeholder="Enter zip code"
                                                    name="zip_code"
                                                    value={
                                                        adminDetails.zip_code
                                                    }
                                                    handleChange={textChange}/>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6 style={
                                    {
                                        lineHeight: "0.4",
                                        color: "#009CB4",
                                        marginBottom: "45px",
                                        textDecoration: "underline"
                                    }
                                }>
                                    <label style={{color : "#009CB4",textDecoration: "underline"}} onClick={
                                        () => setModal(!modal)
                                    }>Change Password</label>
                                </h6>

                                <hr/>
                                <div className="d-flex justify-content-center " style={{display : "inline-block"}}>
                                    {
                                    loadingBtn ? (
                                        <div className="spinner-border text-primary"></div>
                                    ) : (
                                        <>
                                            <CustomButton customButton__class=" profile__footerBtn" text="Save" type="submit"/>
                                            <CustomButton customButton__class="btn profile__canclebtn" text="Cancel" handleClick={onCancle}/></>
                                    )
                                } </div>
                            </div>


                        </div>
                    </form>
                        <ConfirmationUpdateModal modall={successFullpopup} tog={successfullToggle}/>
                        <ChangePasswordModal modal={modal}
                        toggle={toggle}/>
                    
                </div>
               
        } </>
    )
}

export default ProfilePage
