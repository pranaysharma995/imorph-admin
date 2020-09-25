import React,{useState,useEffect} from 'react'
import CKEditor from 'ckeditor4-react';
import CustomButton from '../../../customComponents/customButton'
import axiosInstance from '../../../axios'
import ConfirmationUpdateModal from '../modal/confirmationUpdateModal'


function Tos() {

    const [text , setText] = useState('')
    const [loading , setLoading] = useState(false);
    const [loadingBtn , setLoadingBtn] = useState(false)
    const [error ,setError] = useState(false)
    const [reload , setReload] = useState(false)

    const [successFullpopup, setSuccessfullPopup] = useState(false)
  const successfullToggle = () => setSuccessfullPopup(!successFullpopup);

    useEffect(() => {
      setLoading(true)
      axiosInstance.get("/admin/cms-setting/terms-conditions",{
        headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
      }).then(({data}) => {
        console.log("Tos us" , data);
        setText(data.data[0]?.terms);
        setLoading(false);
      }).catch(error => {
        console.log("Error in cmsSettings tos.js" , error);
      })
    },[reload])

    const editorConfig = {    
        toolbar: [ 
          { name: 'document', items: [  'Print' ] },
          { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
          { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
          { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat' ,'CopyFormatting'] },
          { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
          { name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
          { name: 'links', items: [ 'Link', 'Unlink' ] },
          { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
          { name: 'insert', items: [ 'Image', 'Table', 'PageBreak', ] },		
          { name: 'tools', items: [ 'Maximize' ] },
          { name: 'editing', items: ['Scayt' ] },
         ],   
         extraPlugins :['font' , 'print' , 'colorbutton' , 'justify' , 'copyformatting'],
        
    };

    const submit =e=> {
      e.preventDefault();
    
      if(text!== ''){
        setLoadingBtn(true)
        axiosInstance.post("/admin/cms-setting/terms-conditions/update", {
          terms : text
        },{
          headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then((result) => {

          console.log("After update" , result);
          setError(false)
          setSuccessfullPopup(!successFullpopup)
          setTimeout(() => {
            setReload(!reload)
            setSuccessfullPopup(false)
            setLoadingBtn(false);
        }, 1500);

        }).catch(error => {
          console.log("Error in About us update aboutus.js" , error);
        })
      }else {
        setError(true)
      }
    }

    const onCancle=e=> {
      setReload(!reload);
      setError(false);
    }

    return (
       <>{loading ? (
        <div className="container text-center"
            style={
                {
                    marginTop: "400px",
                    marginBottom: "50%"
                }
        }>
            <div className="spinner-border text-primary"></div>
        </div>
    ) :
        <div className ="aboutus">
          <div style={{padding : "0.7% 1.6%"}}>
             <h3 style={{color : "#707070"}}>Terms of Service</h3>
          </div>

      
             {error && <small style={{color : "red"}}>&#9888;&#160;Please insert some value</small>}
              <CKEditor config={editorConfig} data={text} onChange={(e) => {                 
                setText(e.editor.getData())}} />
        
          <hr/>
          <ConfirmationUpdateModal modall={successFullpopup} tog={successfullToggle}/>
          <div className="d-flex justify-content-center" style={{paddingBottom: "2%"}}>
                 {loadingBtn ? (<div class="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class=" profile__footerBtn aboutus__btn-margin" text="Save"  handleClick={submit}/>
                  <CustomButton customButton__class="btn profile__canclebtn"  text="Cancel"  handleClick={onCancle}/></>)}
           </div>
            
        </div>}
       </>
    )
}

export default Tos
