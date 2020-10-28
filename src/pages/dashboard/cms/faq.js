import React,{useState,useEffect} from 'react'
import CustomButton from '../../../customComponents/customButton'
import axiosInstance from '../../../axios'
import ConfirmationUpdateModal from '../modal/confirmationUpdateModal'
import DeleteConfirmation from '../modal/deleteConfirmation'


function Faq() {

    const [visible , setVisible] = useState(false)
    const [question , setQuestion] = useState('')
    const [answer , setAnswer] = useState('')
    const [qa , setQA] = useState([]);
    const [loading , setLoading] = useState(false);
    const [editable , setEditable] = useState(false);
    const [editableId , setEditableId ] = useState(-1);
    const [editQuestion , setEditQuestion] = useState('');
    const [editAnswer , setEditAnswer] = useState('')
    const [error , setError] = useState(false)
    const [reload , setReload] = useState(false)
    const [loadingBtn , setLoadingBtn] = useState(false)
    const [deleteButtonspinner , setDeleteBtnSpinner] = useState(false)
    const [deleteId , setDeleteId] = useState(-1)
 
    const [editIndex , setEditIndex] = useState(-1)

    const [successFullpopup, setSuccessfullPopup] = useState(false)
    const successfullToggle = () => setSuccessfullPopup(!successFullpopup);
    const [modalMessage, setModalMessage] = useState(null)


    useEffect(() => {
        setLoading(true)
        axiosInstance.get("/admin/cms-setting/faq/view",{
          headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(({data}) => {
          console.log("Faq us" , data.data[0]?.item);
         setQA(data.data[0]?.item);
          setLoading(false)
        }).catch(error => {
          console.log("Error in cmsSettings faq.js" , error);
        })

      },[reload])

    const handleSave =(e)=> {
        e.preventDefault();
        setError(false)      
        console.log("Index",editIndex);
        if(editable){
            if(editQuestion!=='' && editAnswer!=='') {
                setLoadingBtn(true);
              let data ={
                question : editQuestion,
                answer: editAnswer
              }
              
              qa.splice(editIndex,1,data)
                axiosInstance.post("/admin/cms-setting/faq/update",{
                    list : qa
                },{
                    headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
                  }).then(({data}) => {
                    console.log("Faq us update editable" , data);
                    setModalMessage(null)
                    setSuccessfullPopup(!successFullpopup)
                    
                    setQuestion('');
                    setAnswer('');
                    setVisible(false)
                    
                    setEditableId(false)
                    setEditable(false)

                    setTimeout(() => {
                        setReload(!reload)
                        setSuccessfullPopup(false)
                        setLoadingBtn(false);
                    }, 800);
                  }).catch(error => {
                    console.log("Error in cmsSettings faq update faq.js" , error);
                  })
            }else {
                if(editQuestion === '' || editAnswer === ''){
                    setError(true)
                }
            }

        }else{
            if(question!=='' && answer!=='') {
                setEditable(false)
                setLoadingBtn(true);
                let data = {
                    question,
                    answer
                }
                qa.push(data)               
            
                    axiosInstance.post("/admin/cms-setting/faq/update",{
                        list : qa
                    },{
                        headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
                      }).then(({data}) => {
                        console.log("Faq us update" , data);
                        setModalMessage("Added Successfully")
                        setSuccessfullPopup(!successFullpopup)
                        
                        setEditable(false)
                        setQuestion('');
                        setAnswer('');
                        setEditAnswer('');
                        setEditQuestion('');
                        setVisible(false)
        

                        setTimeout(() => {
                            setReload(!reload)
                            setSuccessfullPopup(false)
                            setLoadingBtn(false);
                        }, 800);
                      }).catch(error => {
                        console.log("Error in cmsSettings faq update faq.js" , error);
                      })
                   
                
            }else {
                if(question === '' || answer === ''){
                    setError(true)
                }
            }
        }
    }

    const toggle = (e,id,value)=> {
        e.preventDefault();
            setEditable(true)
            setEditableId(id);
            setEditQuestion(value.question)
            setEditAnswer(value.answer)
            setEditIndex(id);
            setVisible(false)
        
    }

    const handleCancel = e => {
        e.preventDefault()
        if(editable){
            setEditableId(false)
            setEditable(false)
        }
        setVisible(false);
        setQuestion('');
        setAnswer('');
        setEditQuestion("")
        setEditAnswer("")
        setLoading(true)
        setReload(!reload)
    }

    const handleDelete=(e,index)=> {
        e.preventDefault();
        setVisible(false);
        if(editable){
            setEditableId(false)
            setEditable(false)
        }
       setDeleteId(index)      
    }



    return (
        <>
        {loading ? (
            <div className="container text-center"
                style={
                    {
                        marginTop: "400px",
                        marginBottom: "50%"
                    }
            }>
                <div className="spinner-border text-primary"></div>
            </div>
        ): <div className ="faq">
            <form action="#">
            <div className="d-flex justify-content-end">                    
                    <button className="faq__add-btn" style={{position : 'relative'}} onClick={(e) => { e.preventDefault();  setEditableId(false); setVisible(true); setEditable(false)}}>
                        <i className="fa fa-plus faq__plus-icon" aria-hidden="true"></i>
                            Add New
                    </button>
            </div>
            
           <div className="faq__body">
                <div style={{padding : "0.6% 1.6% 0px 1.6%"}}>
                    <h5 style={{color : "#707070",marginTop : "9px"}}>FAQ</h5>
                </div>
                <hr/>
                {error && <p className="error__message" style={{paddingLeft: "1%"}}>*Please fill all details</p>}
                {visible && <div className="faq__qa" style={{ padding:"0% 2%"}}>
                    <h3><input type="text" placeholder="Write question here" value={question} onChange={e => setQuestion(e.target.value)} /></h3>
                    <textarea style={{height : "20vh" , padding : ""}} type="text" placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
                </div>}
                <div id="accordion"  style={{ padding:"0% 2%" , paddingBottom:"20px", color: "#707070"}}>

                        {qa && qa.map((value , i) => (
                             <div className="card faq__card" key={i}>
                             <div className="card-header faq__card-header" style={{position : "relative"}} href={`#jkfgfjgj${i}`} data-toggle={editableId === i ? "" : "collapse"} >
                             <input type="text" value={!editable ? value.question : editableId === i ? editQuestion : value.question} disabled={editableId!==i ? "disabled" :!editable ? 'disabled' : ''}   onChange={e => setEditQuestion(e.target.value)}/>
                        
                            <div className="faq__btn" >
                                {deleteButtonspinner ?  deleteId === i && <div className="spinner-border text-primary mr-2"></div> : <button id="delete" className="faq__delete mr-2" data-toggle="modal" data-target="#confirmDeleteModal" onClick={(e) => handleDelete(e,i)}><i id="delete"  className="fa fa-trash-o " aria-hidden="true"></i></button>}
                                <button id="edit" className="faq__edit" onClick={(e) => toggle(e,i,value)}><i id="edit" className="fa fa-pencil" aria-hidden="true"  ></i></button>
                            </div>
                            </div>
                            <div id={`jkfgfjgj${i}`} className={editableId === i ? "show" : "collapse"} data-parent="#accordion">
                            <div className="card-body faq__card-body">
                                <textarea type="text" value={!editable ? value.answer : editableId === i ? editAnswer : value.answer} disabled={editableId!==i ? "disabled" :!editable ? 'disabled' : ''} onChange={e => setEditAnswer(e.target.value)}/>
                            </div>
                            </div>
                        </div>))}
                </div>

                        <hr/>
                        <div className="d-flex justify-content-center" style={{paddingBottom: "2%"}}>
                                {loadingBtn ? (<div className="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class=" profile__footerBtn aboutus__btn-margin" text="Save" handleClick={handleSave} />
                                <CustomButton customButton__class="btn profile__canclebtn"  text="Cancel" handleClick={handleCancel}/></>)}
                        </div>

                </div>
           </form>
        </div>}
        <ConfirmationUpdateModal modall={successFullpopup} tog={successfullToggle} message={modalMessage}/>
        <DeleteConfirmation qa={qa} setQuestion={setQuestion} setAnswer={setAnswer} setEditAnswer={setEditAnswer} setEditQuestion={setEditQuestion} setVisible={setVisible} setReload={setReload} reload={reload} setDeleteBtnSpinner={setDeleteBtnSpinner} deleteId={deleteId}  setDeleteBtnSpinner={setDeleteBtnSpinner}/>
        </>
    )
}

export default Faq
