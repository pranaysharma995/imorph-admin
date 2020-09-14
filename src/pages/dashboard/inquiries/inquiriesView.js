import React,{useState} from 'react'
import CustomButton from '../../../customComponents/customButton'

const InquiriesView = () => {

    const [loadingBtn , setLoadingBtn] = useState(false)

    return (
        <div className="inquiries-view">
            <div className="profile__head d-flex justify-content-between">
             <h3 style={{marginTop: "10px"}}>Enquiry</h3>
                 <div>
                    <CustomButton customButton__class="btn profile__backbtn" text="Back"/>
                 </div>
            </div>
            <hr/>
            <h1>Inquaries</h1>
            <h1>Inquaries</h1>
            <h1>Inquaries</h1>
            <h1>Inquaries</h1>
            <h1>Inquaries</h1>
            
            <hr/>
                <div className="d-flex justify-content-center">
                    {
                      loadingBtn ? (
                         <div class="spinner-border text-primary"></div>
                         ) : (
                               <>
                                <CustomButton customButton__class=" profile__footerBtn" text="Save" type="submit"/>
                                <CustomButton customButton__class="btn profile__backbtn" text="Cancel" /></>
                                    )
                 } </div>

        </div>
    )
}

export default InquiriesView
