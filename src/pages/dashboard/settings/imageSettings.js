import React,{useState,useEffect} from 'react'
import CustomButton from '../../../customComponents/customButton'
import logo from '../../../assets/imoph3d.png'
import camera from '../../../assets/camera.png'
import defaultImage from '../../../assets/subdefault.png'
import profile from '../../../assets/profile.png'
import ConfirmationUpdateModal from '../modal/confirmationUpdateModal'

import axiosInstance from '../../../axios'

const ImageSettings = ({setRefresh, refresh}) => {


    const [loading , setLoading] = useState(false)
    const [loadingBtn , setLoadingBtn] = useState(false)
    const [text , setText] = useState('')
    const [error , setError] = useState(false)
    const [reload, setReload] = useState(false)
     const [images , setImages] = useState({ 
        applogo : null,
        favicon : null,
        profile : null
    })
    const [imagesFile , setImagesFile] = useState({ 
        applogo : null,
        favicon : null,
        profile : null
    })
    const [successFullpopup, setSuccessfullPopup] = useState(false)
    const successfullToggle = () => setSuccessfullPopup(!successFullpopup);
  
    useEffect(()=> {
        setLoading(true)
        axiosInstance.get('/admin/image-setting/view',{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(({data})=> {
            console.log("Image Settings " , data);
            setText( data.data[0]?.companyName)
            setImages({
                ...images,
                applogo : data.data[0]?.appLogo,
                favicon : data.data[0]?.fevicon,
                profile : data.data[0]?.userIcon,
                
            });

            setLoading(false)
        }).catch(error => {
            console.log("Error in Social media settings Fetch socialSettings.js",error);
        })
    },[reload])

    const handleChange =async e=> {
        let file = e.target.files[0];
        if(e.target.id === 'favicon'){
            setImagesFile({
                ...imagesFile,
                favicon : file
            })
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
                    console.log("Baaase64 fav", base64Image);
                    setImages({
                        ...images,
                        favicon: base64Image
                    })
                }
               
        }else {
            setImages({
                ...images,
                favicon: null
            })
        }
    }

    else if(e.target.id === 'applogo'){
        setImagesFile({
            ...imagesFile,
            applogo : file
        })
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
                console.log("Baaase64 app", base64Image);
                setImages({
                    ...images,
                    applogo: base64Image
                })
            }
           
    }else {
        setImages({
            ...images,
            applogo: null
        })
    }
} 
else if(e.target.id === 'profile'){
    setImagesFile({
        ...imagesFile,
        profile : file
    })
    
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
            console.log("Baaase64 profile", base64Image);
            setImages({
                ...images,
                profile: base64Image
            })
        }
       
}else {
    setImages({
        ...images,
        profile: null
    })
}
}
}

const onSubmit=e=> {
    e.preventDefault();
    if(text!= ''){

        let formData = new FormData();
        formData.set("companyName" , text)
        formData.append("appLogo" , imagesFile.applogo!==null ? imagesFile.applogo : images.applogo)
        formData.append("fevicon" , imagesFile.favicon!==null ? imagesFile.favicon : images.favicon)
        formData.append("userIcon" , imagesFile.profile!==null ? imagesFile.profile : images.profile)
        setLoadingBtn(true)

        axiosInstance.post('/admin/image-setting/edit',formData,{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(({data})=> {
            console.log("Image Settings after submit " , data);
            setError(false)            
            setSuccessfullPopup(!successFullpopup)
            setTimeout(() => {
                setReload(!reload);
                setRefresh(!refresh)
                setSuccessfullPopup(false)
                setLoadingBtn(false);
            }, 1500);
            setImages({
                applogo : null,
                favicon : null,
                profile : null
            })
            setImagesFile({
                applogo : null,
                favicon : null,
                profile : null
            })
        }).catch(error => {
            console.log("Error in Social Link Fetch sociallinks.js",error);
        })
    }else{
        setError(true)
    }
}


    return (
        <>
        {loading ? (<div className="container text-center" style={{marginTop: "25%" , marginBottom : "30%"}}>   
        <div   className="spinner-border text-primary"></div>
        </div>) :
        ( <div className="image-settings">
                <div className="d-flex justify-content-between" style={{padding : "0.7% 1.6%"}}>
                <h5 style={{color : "#707070"}}>Image Settings</h5> 
            </div>
            <hr style={{lineHeight: "0.4", marginTop: "-5px"}}/>
            
            <div className = "image-settings__body">
                <form method="POST" encType="multipart/form-data"  action="#" onSubmit={onSubmit}>
                        
                {
                          error && <small style={{color : "red", paddingLeft: "8%"}}>&#9888;&#160;Please enter company name</small>
                        }
                    <div className="d-flex">
                        <label htmlFor="" className="mr-4 mt-2">Company Name:</label>
                        
                        <input type="text" value={text} onChange={e=> setText(e.target.value)}/>
                    </div>
                    <div className="d-flex mt-5">
                        <label htmlFor="" className=" mt-2" style={{marginRight:"70px"}}>App Logo:</label>
                        <div style={{position: 'relative'}}>
                             <img  className="image-settings__logo" src={images.applogo!==null ? imagesFile.applogo!=null ? images.applogo :  "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/"+images.applogo : logo} alt="logo"/>                            
                                           
                                            <label htmlFor="applogo" className="image-settings__imgAdd rounded-circle text-center"><img width="15rem"
                                                    src={camera}
                                                    alt="add"
                                                    style={
                                                        {
                                                            marginTop: "-5px",
                                                        }
                                                    }/></label>
                                     <input type="file" id="applogo" style={{display: "none"}} accept="image/*" onChange={handleChange}/>


                        </div>
                    </div>
                    <div className="d-flex mt-5">
                        <label htmlFor="" className=" mt-2" style={{marginRight:"85px"}}>Fevicon:</label>
                        <div style={{position: 'relative'}}>
                             <img  className="image-settings__logo" src={images.favicon!==null ? imagesFile.favicon!=null ? images.favicon : "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/"+images.favicon : defaultImage} alt="logo"/>                            
                                           
                                            <label htmlFor="favicon" className="image-settings__imgAdd rounded-circle text-center"><img width="15rem"
                                                    src={camera}
                                                    alt="add"
                                                    style={
                                                        {
                                                            marginTop: "-5px",
                                                        }
                                                    }/></label>
                                     <input type="file" id="favicon" style={{display: "none"}} accept="image/*" onChange={handleChange}/>


                        </div>
                    </div>
                    <div className="d-flex mt-5">
                        <label htmlFor="" className=" mt-2" style={{marginRight:"85px"}}>User Icon:</label>
                        <div style={{position: 'relative'}}>
                             <img  className="image-settings__profile" src={images.profile!==null ? imagesFile.profile!=null ? images.profile : "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/"+images.profile  : profile} alt="logo"/>                            
                                           
                                            <label htmlFor="profile" className="image-settings__imgAdd-profile rounded-circle text-center"><img width="15rem"
                                                    src={camera}
                                                    alt="add"
                                                    style={
                                                        {
                                                            marginTop: "-5px",
                                                        }
                                                    }/></label>
                                     <input type="file" id="profile" style={{display: "none"}} accept="image/*" onChange={handleChange}/>


                        </div>
                    </div>

                </form>
            </div>
            <hr/>
            <ConfirmationUpdateModal modall={successFullpopup} tog={successfullToggle}/>
            <div className="d-flex justify-content-center">
                    {loadingBtn ? (<div  className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class="btn profile__footerBtn" text="Save" type="submit"  handleClick={onSubmit} />
                            <CustomButton customButton__class="btn profile__backbtn"  text="Cancel"/></>)}
                        </div>
            </div>)}
            
       </>
    )
}

export default ImageSettings
