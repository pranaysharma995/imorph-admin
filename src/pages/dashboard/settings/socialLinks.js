import React,{useState,useEffect} from 'react'
import CustomButton from '../../../customComponents/customButton'
import axiosInstance from '../../../axios'
import validator from 'validator'

const SocialLinks = () => {

    const [urls , setUrls] = useState({
        company : '',
        facebook : "",
        twitter : "",
        instagram : "",
        linkedin : "",
        youtube : "",
    })
    const [loading , setLoading] = useState(false)
    const [loadingBtn , setLoadingBtn] = useState(false)
    const [reload,setReload] = useState(false)
    const [errorCompany , setErrorCompany] = useState(false)
    const [errorFaceBook , setErrorFacebook] = useState(false)
    const [errorInsta , setErrorInsta] = useState(false)
    const [errorTwitter , setErrorTwitter] = useState(false)
    const [errorLinkedIn , setErrorLinked] = useState(false)
    const [errorYoutube , setErrorYoutube] = useState(false)


    useEffect(()=> {
        setLoading(true)
        axiosInstance.get('/admin/setting/social-media/view',{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(({data})=> {
            setUrls({
                ...urls,
                company : data.data[0]?.companyWebsite,
                facebook : data.data[0]?.facebook,
                twitter : data.data[0]?.twitter,
                instagram : data.data[0]?.instagram,
                linkedin : data.data[0]?.linkedin,
                youtube : data.data[0]?.youtube,
            });

            setLoading(false)
        }).catch(error => {
            console.log("Error in Social Link Fetch sociallinks.js",error);
        })
    
    },[reload] )

    const handleChange= (e)=>{
        setUrls({
            ...urls,
            [e.target.name] : e.target.value
        })
    }

    const handleValidation=e=> {
        e.preventDefault();
        if(!validator.isURL(urls.company,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company)){
            setErrorCompany(true)

            setErrorFacebook(false)
            setErrorTwitter(false)
            setErrorInsta(false)
            setErrorLinked(false)
            setErrorYoutube(false)

            if(!validator.isURL(urls.facebook ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.facebook)){
                setErrorFacebook(true)
            }
            if(!validator.isURL(urls.twitter ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.twitter)){               
                setErrorTwitter(true)
            }if(!validator.isURL(urls.instagram ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.instagram)){
                setErrorInsta(true)
            }
            if(!validator.isURL(urls.linkedin ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.linkedin)){
                setErrorLinked(true)
            }if(!validator.isURL(urls.youtube ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.youtube)){
                setErrorYoutube(true)
            }           

        }
        else if(!validator.isURL(urls.facebook ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.facebook)){
            setErrorFacebook(true)  
            
            setErrorCompany(false)
            setErrorTwitter(false)
            setErrorInsta(false)
            setErrorLinked(false)
            setErrorYoutube(false)

            if(!validator.isURL(urls.twitter ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.twitter)){               
                setErrorTwitter(true)
            }if(!validator.isURL(urls.instagram ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.instagram)){
                setErrorInsta(true)
            }
            if(!validator.isURL(urls.linkedin ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.linkedin)){
                setErrorLinked(true)
            }if(!validator.isURL(urls.youtube ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.company) && !validator.isEmpty(urls.youtube)){
                setErrorYoutube(true)
            }      
        }
        else if(!validator.isURL(urls.twitter ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.twitter)){
            setErrorTwitter(true)

            setErrorCompany(false)
            setErrorFacebook(false)
            setErrorInsta(false)
            setErrorLinked(false)
            setErrorYoutube(false)

            if(!validator.isURL(urls.instagram ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.instagram)){
                setErrorInsta(true)
            }
            if(!validator.isURL(urls.linkedin ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.linkedin)){
                setErrorLinked(true)
            }if(!validator.isURL(urls.youtube ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.youtube)){
                setErrorYoutube(true)
            }   
        }else if(!validator.isURL(urls.instagram ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.instagram)){
            setErrorInsta(true)

            setErrorCompany(false)
            setErrorFacebook(false)
            setErrorTwitter(false)
            setErrorLinked(false)
            setErrorYoutube(false)

            if(!validator.isURL(urls.linkedin ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.linkedin)){
                setErrorLinked(true)
            }if(!validator.isURL(urls.youtube ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.youtube)){
                setErrorYoutube(true)
            }  
        }
        else if(!validator.isURL(urls.linkedin ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.linkedin)){
            setErrorLinked(true)

            setErrorCompany(false)
            setErrorFacebook(false)
            setErrorTwitter(false)
            setErrorInsta(false)
            setErrorYoutube(false)

            if(!validator.isURL(urls.youtube ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true})  && !validator.isEmpty(urls.youtube)){
                setErrorYoutube(true)
            }  
        }else if(!validator.isURL(urls.youtube ,{protocols :['http' , 'https','ftp'] , require_tld : true , require_valid_protocol : true, require_protocol : true}) && !validator.isEmpty(urls.youtube)){
            setErrorYoutube(true)

            setErrorCompany(false)
            setErrorFacebook(false)
            setErrorTwitter(false)
            setErrorInsta(false)
            setErrorLinked(false)
        }
        else {
            submit();
        }
    }

    const submit=()=> {
        setErrorCompany(false)
        setErrorFacebook(false)
        setErrorTwitter(false)
        setErrorInsta(false)
        setErrorLinked(false)
        setErrorYoutube(false)

        setLoadingBtn(true)
        axiosInstance.post("/admin/setting/social-media/edit", {
                facebook : urls.facebook,
                twitter : urls.twitter,
                instagram : urls.instagram,
                companyWebsite : urls.company,
                youtube : urls.youtube,
                linkedin : urls.linkedin
        },{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(() => {
            setReload(!reload);
            setLoadingBtn(false)
        }).catch(error => {
            console.log("Error in social media links socialLinks.js" , error);
        })
    }

    const onCancle=e=> {
        e.preventDefault();
        setReload(!reload)
        setErrorCompany(false)
        setErrorFacebook(false)
        setErrorTwitter(false)
        setErrorInsta(false)
        setErrorLinked(false)
        setErrorYoutube(false)
    }

    return (
        <>
        {loading ? (<div className="container text-center" style={{marginTop: "25%" , marginBottom : "30%"}}>   
        <div   className="spinner-border text-primary"></div>
        </div>) :
        ( <div className="social-links">
                <div className="d-flex justify-content-between" style={{padding : "0.7% 1.6%"}}>
                <h5 style={{color : "#707070" ,marginTop : "9px"}}>Social Media Links</h5> 
            </div>
            <hr style={{lineHeight: "0.4", marginTop: "-5px"}}/>
            <div className = "social-links__body">
                <form onSubmit={handleValidation}>
                    <div className="row justify-content-center">
                            <div className="col-md-12 ">
                            {errorCompany && <small className="profile__error">&#9888;&#160;Please provide valid url</small>}
                            <label htmlFor="company" style={{lineHeight :"0.4" , color : "#707070"}}>Company Website Url</label>
                                <input name="company" className={errorCompany ? "form-control profile__errorInput" : "form-control "} type="text" value={urls.company} onChange={handleChange} placeholder="www.xyzexample.com"/>
                            </div>                        
                    </div>
                    <div className="row justify-content-center mt-4">
                            <div className="col-md-12">
                            {errorFaceBook && <small className="profile__error">&#9888;&#160;Please provide valid url</small>}
                            <label htmlFor="facebook" style={{lineHeight :"0.4" , color : "#707070"}}>Facebook Url</label>
                                <input name="facebook"  className={errorFaceBook ? "form-control profile__errorInput" : "form-control "} type="text" value={urls.facebook} onChange={handleChange} placeholder="Facebook Url"/>
                            </div>
                    </div>
                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {errorTwitter && <small className="profile__error">&#9888;&#160;Please provide valid url</small>}
                            <label htmlFor="twitter" style={{lineHeight :"0.4" , color : "#707070"}}>Twitter Url</label>
                                <input name="twitter" className={errorTwitter ? "form-control profile__errorInput" : "form-control "} type="text" value={urls.twitter} onChange={ handleChange} placeholder="Twitter Url"/>                    
                            </div>                 
                        
                    </div>

                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {errorInsta && <small className="profile__error">&#9888;&#160;Please provide valid url</small>}
                            <label htmlFor="instagram" style={{lineHeight :"0.4" , color : "#707070"}}>Instagram Url</label>
                                <input name="instagram" className={errorInsta ? "form-control profile__errorInput" : "form-control "} type="text" value={urls.instagram} onChange={ handleChange} placeholder="Instagram Url"/>                    
                            </div>                 
                        
                    </div>
                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {errorLinkedIn && <small className="profile__error">&#9888;&#160;Please provide valid url</small>}
                            <label htmlFor="linkedin" style={{lineHeight :"0.4" , color : "#707070"}}>LinkedIn Url</label>
                                <input name="linkedin" className={errorLinkedIn ? "form-control profile__errorInput" : "form-control "} type="text" value={urls.linkedin} onChange={ handleChange} placeholder="LinkedIn Url"/>                    
                            </div>                 
                        
                    </div>
                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {errorYoutube && <small className="profile__error">&#9888;&#160;Please provide valid url</small>}
                            <label htmlFor="youtube" style={{lineHeight :"0.4" , color : "#707070"}}>Youtube Url</label>
                                <input name="youtube" className={errorYoutube ? "form-control profile__errorInput" : "form-control "} type="text" value={urls.youtube} onChange={ handleChange} placeholder="Youtube Url"/>                    
                            </div>                 
                        
                    </div>
                    </form>
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
                    {loadingBtn ? (<div  className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class="btn profile__footerBtn" text="Save" type="submit" handleClick={handleValidation} />
                            <CustomButton customButton__class="btn profile__canclebtn"  text="Cancel" handleClick={onCancle}/></>)}
                        </div>
            </div>)}
       </>
    )
     
}

export default SocialLinks
