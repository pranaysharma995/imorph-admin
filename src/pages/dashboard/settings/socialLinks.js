import React,{useState,useEffect} from 'react'
import CustomButton from '../../../customComponents/customButton'
import axiosInstance from '../../../axios'

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
    },[reload])

    const handleChange= (e)=>{
        setUrls({
            [e.target.id] : e.target.value
        })
    }

    const handleValidation=e=> {
        e.preventDefault();
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
    }

    return (
        <>
        {loading ? (<div className="container text-center" style={{marginTop: "25%" , marginBottom : "30%"}}>   
        <div   className="spinner-border text-primary"></div>
        </div>) :
        ( <div className="social-links">
                <div className="d-flex justify-content-between" style={{padding : "0.7% 1.6%"}}>
                <h3 style={{color : "#707070"}}>Social Media Links</h3> 
            </div>
            <hr style={{lineHeight: "0.4", marginTop: "-5px"}}/>
            <div className = "social-links__body">
                <form onSubmit={handleValidation}>
                    <div className="row justify-content-center">
                            <div className="col-md-12 ">
                            {/* {error.plan_name && <small className="profile__error">&#9888;&#160;Please enter plan name</small>} */}
                            <label htmlFor="company" style={{lineHeight :"0.4" , color : "#707070"}}>Company Website Url</label>
                                <input id="company" className="form-control" type="text" value={urls.company} onChange={handleChange} placeholder="www.xyzexample.com"/>
                            </div>                        
                    </div>
                    <div className="row justify-content-center mt-4">
                            <div className="col-md-12">
                            {/* {error.description && <small className="profile__error">&#9888;&#160;Please enter description</small>} */}
                            <label htmlFor="facebook" style={{lineHeight :"0.4" , color : "#707070"}}>Facebook Url</label>
                                <input id="facebook"  className="form-control" type="text" value={urls.facebook} onChange={handleChange} placeholder="Facebook Url"/>
                            </div>
                    </div>
                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {/* {error.image && <small className="profile__error">&#9888;&#160;Please enter subscription logo</small>} */}
                            <label htmlFor="twitter" style={{lineHeight :"0.4" , color : "#707070"}}>Twitter Url</label>
                                <input id="twitter" className="form-control" type="text" value={urls.twitter} onChange={ handleChange} placeholder="Twitter Url"/>                    
                            </div>                 
                        
                    </div>

                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {/* {error.image && <small className="profile__error">&#9888;&#160;Please enter subscription logo</small>} */}
                            <label htmlFor="instagram" style={{lineHeight :"0.4" , color : "#707070"}}>Instagram Url</label>
                                <input id="instagram" className="form-control" type="text" value={urls.instagram} onChange={ handleChange} placeholder="Instagram Url"/>                    
                            </div>                 
                        
                    </div>
                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {/* {error.image && <small className="profile__error">&#9888;&#160;Please enter subscription logo</small>} */}
                            <label htmlFor="linkedin" style={{lineHeight :"0.4" , color : "#707070"}}>LinkedIn Url</label>
                                <input id="linkedin" className="form-control" type="text" value={urls.linkedin} onChange={ handleChange} placeholder="LinkedIn Url"/>                    
                            </div>                 
                        
                    </div>
                    <div className="row justify-content-between mt-4 ">
                            <div className="col-md-12">
                            {/* {error.image && <small className="profile__error">&#9888;&#160;Please enter subscription logo</small>} */}
                            <label htmlFor="youtube" style={{lineHeight :"0.4" , color : "#707070"}}>Youtube Url</label>
                                <input id="youtube" className="form-control" type="text" value={urls.youtube} onChange={ handleChange} placeholder="Youtube Url"/>                    
                            </div>                 
                        
                    </div>
                    </form>
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
                    {loadingBtn ? (<div  className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class="btn profile__footerBtn" text="Save" type="submit" handleClick={handleValidation} />
                            <CustomButton customButton__class="btn profile__backbtn"  text="Cancel" handleClick={onCancle}/></>)}
                        </div>
            </div>)}
       </>
    )
     
}

export default SocialLinks
