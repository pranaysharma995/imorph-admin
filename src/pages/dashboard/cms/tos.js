import React,{useState} from 'react'
import CKEditor from 'ckeditor4-react';
import CustomButton from '../../../customComponents/customButton'


function Tos() {

    const [text , setText] = useState('')
    const [loading , setLoading] = useState(false)

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

    return (
        <div className ="aboutus">
          <div style={{padding : "0.7% 1.6%"}}>
             <h3 style={{color : "#707070"}}>Terms of Service</h3>
          </div>

          <div>
              <CKEditor config={editorConfig} data={text} onChange={(e) => {                 
                setText(e.editor.getData())}} />
          </div>
          <hr/>
          <div className="d-flex justify-content-center" style={{paddingBottom: "2%"}}>
                 {loading ? (<div class="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class=" profile__footerBtn aboutus__btn-margin" text="Save" />
                  <CustomButton customButton__class="btn profile__backbtn"  text="Cancel"/></>)}
           </div>
            
        </div>
    )
}

export default Tos
