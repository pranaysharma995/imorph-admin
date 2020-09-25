import React,{useState,useEffect,useContext} from 'react'
import { Redirect , useHistory} from 'react-router-dom'
import CustomButton from '../../../customComponents/customButton'
import validator from 'validator'
import ConfirmationUpdateModal from '../modal/confirmationUpdateModal'
import profile from '../../../assets/profile.png'
import AdminContext from '../../../context/admin/adminDetailsContext'

import axiosInstance from '../../../axios'

const InquiriesView = ({data}) => {

    const [loadingBtn , setLoadingBtn] = useState(false)
    const [reply , setReply] = useState('')
    const [check , setCheck] = useState({
        status : false
    })
    const [error , setError] = useState(false)
    const history = useHistory();
    const [successFullpopup, setSuccessfullPopup] = useState(false)
    const successfullToggle = () => setSuccessfullPopup(!successFullpopup);
    const {adminData}  = useContext(AdminContext);
  

    useEffect(()=> {
        if(data.status == true){
            setCheck({
                 status : true,                        
                 })
        }
        else if(data.status == false){
            setCheck({
                status : false,                     
                })
        }
    },[data])

    const handleChange=e=> {
        if(e.target.id === 'resolved'){
            setCheck({
                status : true,
                
            })
        }else if(e.target.id === 'unresolved'){
            setCheck({
                status : false,
               
            })
        }
        // else {
        //     setCheck({
        //         inprogress : true,
                
        //     })
        // }

        console.log("Radio option ", e.target.id);
    }

    const onSubmit=e=>{
        e.preventDefault()
        if(!validator.isEmpty(reply)){
            submit();
            setError(false)
        }else{
            setError(true)
        }
    }
    

    const submit=()=>{
        setLoadingBtn(true)
        axiosInstance.post("/admin/inquiry/update",{
            inquiryID  : data.inquiryID,
            message : reply,
            status : check.status 
        },{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
          }).then(({data})=> {

            console.log("After repy by admin" , data);
                setSuccessfullPopup(!successFullpopup)
                setTimeout(() => {
                    setSuccessfullPopup(false)
                    setLoadingBtn(false);
                    return history.goBack()
                }, 1500);
          }).catch( error => {
            console.log("Error in inquary view inquiryview.js" , error);
          })
    }

    if(!data){
        return <Redirect to="/dashboard/inquiries"/>
    }

    return (
        <div className="inquiries-view">
            <div className="profile__head d-flex justify-content-between">
             <h3 style={{marginTop: "10px"}}>Enquiry</h3>
                 <div>
                    <CustomButton customButton__class="btn profile__backbtn" text="Back" handleClick={() => history.goBack()}/>
                 </div>
            </div>
            <hr/>
            <div className="inquiries-view__body">
                <div className="d-flex justify-content-between">
                        <div style={{display : 'block'}}>
                            <h5>{data && data.userName}</h5>
                            <p style={{color : "#009CB4"}}>{data.userEmail}</p>
                        </div>
                        <div className="inquary__date" style={{display : 'inline-block'}}>
                            <p>Date : {data && new Date(data.createdDate).toLocaleDateString()}</p>
                        </div>
                </div>

                <div className="d-flex mt-4">
                        <h6>Subject</h6> : <p className="ml-2 mt-0">{data && data.subject}</p>
                </div>
                <div className="d-flex mt-2">
                        <h6 className="mr-3">Enquiry</h6> : 
                        {/* {data.clientMessage.map((message,i) => (
                            <li key={i}>{message}</li>
                        ))} */}

                </div>

                <div className="inquary__chat mt-3">
                          <div className="msg d-flex mt-3">
                                <img className="mr-3" width="40px" height="40px" src={profile} alt="profilr"/>
                                <div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Quia sunt ex quam dolore nulla vitae nemo obcaecati vel eius quos. Adipisci sunt quaerat dicta!
                                    </p>
                                    <span style={{color : "rgba(0, 0, 0, 0.4)"}}>11:00 PM | Thursday</span>
                                </div>
                         </div>  
                         <div className="rply d-flex mt-3 justify-content-end">                               
                                <div style={{marginLeft : "auto"}}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Quia sunt ex quam dolore nulla vitae nemo obcaecati vel eius quos. Adipisci sunt quaerat dicta!
                                    </p>
                                    <div className="text-right" style={{color : "rgba(0, 0, 0, 0.4)" , width : "100%"}}>11:00 PM | Thursday</div>
                                </div>
                                <img className="rounded-circle" width="40px" height="40px" src={`http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/`+adminData.profileImage} alt="profilr"/>
                         </div> 
                         
                </div>

                <div className="mt-5 ml-2 row " >
                    <div className="form-group form-check col-md-2">
                        <input className="form-check-input" type="radio" name="radio" id="resolved" checked={check.status} onChange={handleChange}/>   
                        <label className="form-check-label pl-2">
                        Resolved
                        </label>
                    </div>
                    <div className="form-group form-check col-md-2">
                    <input className="form-check-input" type="radio" name="radio" id="unresolved" checked={!check.status} onChange={handleChange}/>
                        <label className="form-check-label pl-2">
                        Unresolved
                        </label>
                    </div>
                    <div className="form-group form-check col-md-2">
                    <input className="form-check-input" type="radio" name="radio" id="inprogress" checked={check.inprogress} onChange={handleChange}/>
                        <label className="form-check-label pl-2">
                        In-progress
                        </label>
                    </div>
                </div>

            </div>
            
            <hr/>
               

            <div className="pl-4 pr-4">
            {error && <small style={{color : "red"}}>&#9888;&#160;Please insert some value</small>}
               <textarea id="description"  className="form-control mt-4" type="text" value={reply}  placeholder="Enter your reply here!"
               onChange={e => setReply(e.target.value) }/>
                <div className="d-flex justify-content-end ">
                    {
                      loadingBtn ? (
                         <div className="spinner-border text-primary"></div>
                         ) : (<>
                            <CustomButton customButton__class=" profile__footerBtn" text="Send" type="submit" handleClick={onSubmit}/>
                            </>)
                 } </div>
            </div>
            <ConfirmationUpdateModal modall={successFullpopup} tog={successfullToggle} message="Successfully Sent"/>
        </div>
    )
}

export default InquiriesView
