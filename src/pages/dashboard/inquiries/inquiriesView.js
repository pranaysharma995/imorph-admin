import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import CustomButton from '../../../customComponents/customButton'
import validator from 'validator'

const InquiriesView = ({data}) => {

    const [loadingBtn , setLoadingBtn] = useState(false)
    const [reply , setReply] = useState('')
    const [check , setCheck] = useState({
        resolved : false,
        unresolved : false,
        inprogress : false
    })
    const [error , setError] = useState(false)

    useEffect(()=> {
        

    },[data])

    const handleChange=e=> {
        if(e.target.id === 'resolved'){
            setCheck({
                resolved : true,
                
            })
        }else if(e.target.id === 'unresolved'){
            setCheck({
                unresolved : true,
               
            })
        }else {
            setCheck({
                inprogress : true,
                
            })
        }
    }

    const onSubmit=e=>{

        if(!validator.isEmpty(reply)){
            alert();
            setError(false)
        }else{
            setError(true)
        }
    }

    if(!data){
        return <Redirect to="/dashboard/inquiries"/>
    }

    return (
        <div className="inquiries-view">
            <div className="profile__head d-flex justify-content-between">
             <h3 style={{marginTop: "10px"}}>Enquiry</h3>
                 <div>
                    <CustomButton customButton__class="btn profile__backbtn" text="Back"/>
                 </div>
            </div>
            <hr/>
            <div className="inquiries-view__body">
            <form>
                <div className="d-flex justify-content-between">
                    <div style={{display : 'block'}}>
                        <h5>{data && data.firstName} {data && data.lastName}</h5>
                        <p style={{color : "#009CB4"}}>{data.email}</p>
                    </div>
                    <div style={{display : 'inline-block'}}>
                        <p>Date : {data && data.date}</p>
                    </div>
                </div>

                <div className="d-flex mt-4">
                        <h6>Subject</h6> : <p>{data && data.subject}</p>
                </div>
                <div className="d-flex mt-2">
                        <h6>Enquiry</h6> : 
                        <p>Lorem ipsum dolor, 
                            sit amet consectetur adipisicing elit. Unde totam quas
                             fugiat maxime fugit quis asperiores omnis assumenda quasi? Sit, laudantium sint sapiente nisi ea
                              tempore reprehenderit a culpa praesentium perspiciatis facilis, odio qui?
                        </p>
                </div>
               {error && <small style={{color : "red"}}>&#9888;&#160;Please insert some value</small>}
               <textarea id="description"  className="form-control mt-4" type="text" value={reply}  placeholder="Enter your reply here!"
               onChange={e => setReply(e.target.value) }/>

                <div className="mt-5">
                <div className="form-group form-check">
                    <input className="form-check-input" type="checkbox" id="resolved" checked={check.resolved} onChange={handleChange}/>   
                    <label className="form-check-label pl-4">
                     Resolved
                    </label>
                </div>
                <div className="form-group form-check">
                <input className="form-check-input" type="checkbox" id="unresolved" checked={check.unresolved} onChange={handleChange}/>
                    <label className="form-check-label pl-4">
                     Unresolved
                    </label>
                </div>
                <div className="form-group form-check">
                <input className="form-check-input" type="checkbox" id="inprogress" checked={check.inprogress} onChange={handleChange}/>
                    <label className="form-check-label pl-4">
                     In-progress
                    </label>
                </div>
                </div>
                </form>
            </div>
            
            <hr/>
                <div className="d-flex " style={{paddingLeft : "6%"}}>
                    {
                      loadingBtn ? (
                         <div class="spinner-border text-primary"></div>
                         ) : (
                               <>
                                <CustomButton customButton__class=" profile__footerBtn" text="Send" type="submit" handleClick={onSubmit}/>
                                </>
                                    )
                 } </div>

        </div>
    )
}

export default InquiriesView
