import React,{useState,useEffect} from 'react'
import CustomButton from '../../../customComponents/customButton'
import logo from '../../../assets/imoph3d.png'
import camera from '../../../assets/camera.png'
import defaultImage from '../../../assets/subdefault.png'
import profile from '../../../assets/profile.png'

const ImageSettings = () => {


    const [loading , setLoading] = useState(false)
    const [loadingBtn , setLoadingBtn] = useState(false)
    const [text , setText] = useState('')
    const [images , setImages] = useState({ 
        applogo : null,
        favicon : null,
        profile : null
    })

    const handleChange =async e=> {
        let file = e.target.files[0];
        if(e.target.id === 'favicon'){
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

    return (
        <>
        {loading ? (<div className="container text-center" style={{marginTop: "25%" , marginBottom : "30%"}}>   
        <div   className="spinner-border text-primary"></div>
        </div>) :
        ( <div className="image-settings">
                <div className="d-flex justify-content-between" style={{padding : "0.7% 1.6%"}}>
                <h3 style={{color : "#707070"}}>Social Media Links</h3> 
            </div>
            <hr style={{lineHeight: "0.4", marginTop: "-5px"}}/>
            <div className = "image-settings__body">
                <form method="POST" encType="multipart/form-data"  action="#" >
                    
                    <div className="d-flex">
                        <label htmlFor="" className="mr-4 mt-2">Company Name:</label>
                        <input type="text" value={text} onChange={e=> setText(e.target.value)}/>
                    </div>
                    <div className="d-flex mt-5">
                        <label htmlFor="" className=" mt-2" style={{marginRight:"70px"}}>App Logo:</label>
                        <div style={{position: 'relative'}}>
                             <img className="image-settings__logo" src={images.applogo!==null ? images.applogo : logo} alt="logo"/>                            
                                           
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
                             <img className="image-settings__logo" src={images.favicon!==null ? images.favicon : defaultImage} alt="logo"/>                            
                                           
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
                             <img  className="image-settings__profile" src={images.profile!==null ? images.profile : profile} alt="logo"/>                            
                                           
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
            <div className="d-flex justify-content-center">
                    {loadingBtn ? (<div  className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class="btn profile__footerBtn" text="Save" type="submit"  />
                            <CustomButton customButton__class="btn profile__backbtn"  text="Cancel"/></>)}
                        </div>
            </div>)}
       </>
    )
}

export default ImageSettings
