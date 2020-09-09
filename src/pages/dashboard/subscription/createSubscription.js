import React,{useState} from 'react'
import CustomButton from '../../../customComponents/customButton'
import {useHistory} from 'react-router-dom'
import defaultImage from '../../../assets/subdefault.png'
import axiosInstance from '../../../axios'

const CreateSubscription = () => {

    const history = useHistory();
    const [loading , setLoading] = useState(false)
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [checked , setChecked] = useState(false);
    const [error , setError] = useState({
        plan_name : false,
        cost : false,
        description : false,
        image : false        
    })

    const handleValidation = e=> {
        e.preventDefault();

        if(name === ''){
            setError({
                plan_name : true
            })
        }else if(cost === ""){
            setError({
                cost : true
            })
        }else if(description === ""){
            setError({
                description : true
            })
        }else if(image === ''){
            setError({
                image : true
            })
        }

        else{
            submit();
        }
    }

    const handleImage = async e=> {
        let file = e.target.files[0]
      if(file){
        setImageFile(e.target.files[0])
       
        let base64Image = await new Promise((resolve, reject) =>{
            const fileReader =new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
                
            }
            fileReader.onerror=err => {
                reject(err);
            }
        })
        if(base64Image !== undefined){
            setImage(base64Image);
        }
      }else {
        setError({
            image : true
        })
      }
     }


    const submit = ()=> {
        //setLoading(true)
        setError({
            plan_name : false,
            cost : false,
            description : false,
            image : false, 
        })
        let data = new FormData();
        data.set("name" , name)
        data.set("cost" , cost)
        data.set("status" , checked)
        data.set("description" , description)
        data.append("image" , imageFile)

        axiosInstance.post("/admin/subscription/create" , data
        ).then(() => (
           setLoading(false),
            history.push("/dashboard/subscription")
        )).catch(err => {
            console.log("Error in create Subscription" , err);
        })
    }

   


    return (
        <div className="createSubscription">
             <div className="d-flex justify-content-between" style={{padding : "0.7% 1.6%"}}>
             <h3 style={{color : "#707070"}}>Create Subscription</h3>

             <div>
                <CustomButton customButton__class="btn subs__back-btn"  text="Back" handleClick={() => history.push("/dashboard/subscription")}/>
             </div>
          </div>
          <hr style={{lineHeight: "0.4", marginTop: "-5px"}}/>
          <div className = "createSubscription__body">
              <form method="POST" enctype="multipart/form-data"  action="#" onSubmit={handleValidation}>
                <div className="row justify-content-center">
                        <div className="col-md-6 ">
                        {error.plan_name && <small className="profile__error">&#9888;&#160;Please enter plan name</small>}
                        <label htmlFor="name" style={{lineHeight :"0.4" , color : "#707070"}}>Subscription Plan Name</label>
                            <input id="name" className={error.plan_name ? "form-control createSubscription__errorInput" :"form-control"} type="text" value={name} onChange={ e=> setName(e.target.value)}/>
                        </div>
                        <div className="col-md-6">
                             {error.cost && <small className="profile__error">&#9888;&#160;Please enter plan cost</small>}
                            <label htmlFor="cost" style={{lineHeight :"0.4" , color : "#707070"}}>Cost(USD)</label>
                            <input id="cost" className={error.cost ? "form-control createSubscription__errorInput" :"form-control"} type="text" value={cost} onChange={ e=> setCost(e.target.value)}/>
                        </div>
                </div>
                <div className="row justify-content-center mt-4">
                        <div className="col-md-12">
                        {error.description && <small className="profile__error">&#9888;&#160;Please enter description</small>}
                        <label htmlFor="description" style={{lineHeight :"0.4" , color : "#707070"}}>Description</label>
                            <textarea id="description"  className={error.description ? "form-control createSubscription__errorInput" :"form-control"} type="text" value={description} onChange={ e=> setDescription(e.target.value)}/>
                        </div>
                </div>
                <div className="row justify-content-between mt-4 ">
                        <div className="col-md-6">
                        {error.image && <small className="profile__error">&#9888;&#160;Please enter subscription logo</small>}
                        <label htmlFor="file" style={{lineHeight :"0.4" , color : "#707070"}}>Subscription Image</label><br/>
                            <input id="file"  type="file" accept="image/*" onChange={handleImage}/>
                            <div className=" d-flex mt-4 ">
                                <div style={{marginRight : "50px"}}><label htmlFor="radio" style={{color : "#707070"}}>   Subscription Active/Inactive</label></div>
                                <div className="mt-1"><input id="radio" type="radio" class="form-check-input" checked={checked} onClick={() => setChecked(!checked)}/></div>
                            </div>
                        </div>
                        
                        <div className="col-md-6 text-right">
                            <img width="180rem" src={image ? image : defaultImage} alt="fgf"/>
                        </div>
                </div>
                </form>
          </div>
          <hr/>
          <div className="d-flex justify-content-center">
                 {loading ? (<div  className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class="btn profile__footerBtn" text="Save" type="submit" handleClick={handleValidation} />
                         <CustomButton customButton__class="btn profile__backbtn"  text="Cancel"/></>)}
                    </div>
                   

          
        </div>
    )
}

export default CreateSubscription;
