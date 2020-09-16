import React,{useState} from 'react'
import CustomButton from '../../../customComponents/customButton'

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


    const handleSave =(e)=> {

        
        setError(false)      

        if(editable){
            if(editQuestion!=='' && editAnswer!=='') {
                setLoading(true);
               
                setTimeout(() => {
    
                    setLoading(false);
                    setVisible(false)
                    setEditQuestion('');
                    setEditAnswer('');
                    setEditableId(false)
                }, 2000);
            }else {
                if(editQuestion === '' || editAnswer === ''){
                    setError(true)
                }
            }

        }else{
            if(question!=='' && answer!=='') {
                setLoading(true);
                let data = {
                    id : Math.floor(Math.random() * 101),
                    question,
                    answer
                }
                setTimeout(() => {
                    setQA([...qa , data]);
                    setQuestion('');
                    setAnswer('');
                    setLoading(false);
                    setVisible(false)
                }, 2000);
            }else {
                if(question === '' || answer === ''){
                    setError(true)
                }
            }
        }
    }

    const toggle = (e,id,value)=> {
        e.preventDefault();
            setEditable(!editable)
            setEditableId(id);
            setEditQuestion(value.question)
            setEditAnswer(value.answer)

            setVisible(false)
        
    }

    const handleCancel = e => {
        e.preventDefault()
        if(editable){
            setEditableId(false)
        }
        setVisible(false);
        setQuestion('');
        setAnswer('')
    }

    const handleDelete=(e,v)=> {
        e.preventDefault();
        setVisible(false);
        if(editable){
            setEditableId(false)
        }

        setQA(qa.filter(value => value.id !== v.id))

    }



    return (
        <div className ="faq">
            <form action="#">
            <div className="d-flex justify-content-end">                    
                    <button className="faq__add-btn" style={{position : 'relative'}} onClick={() => {  setEditableId(false); setVisible(true)}}>
                        <i className="fa fa-plus faq__plus-icon" aria-hidden="true"></i>
                            Add New
                    </button>
            </div>
            
           <div className="faq__body">
                <div style={{padding : "0.7% 1.6%"}}>
                    <h3 style={{color : "#707070"}}>FAQ</h3>
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
                             <div className="card-header faq__card-header" style={{position : "relative"}} href={`#${value.question}${i}`} data-toggle="collapse" >
                             <input type="text" value={!editable ? value.question : editableId === i ? editQuestion : value.question} disabled={editableId!==i ? "disabled" :!editable ? 'disabled' : ''}   onChange={e => setEditQuestion(e.target.value)}/>
                        
                            <div className="faq__btn" >
                                <button id="delete" className="faq__delete mr-2" onClick={(e) => handleDelete(e,value)}><i id="delete"  className="fa fa-trash-o " aria-hidden="true"></i></button>
                                <button id="edit" className="faq__edit" onClick={(e) => toggle(e,i,value)}><i id="edit" className="fa fa-pencil" aria-hidden="true"  ></i></button>
                            </div>
                            </div>
                            <div id={`${value.question}${i}`} className="collapse" data-parent="#accordion">
                            <div className="card-body faq__card-body">
                                <textarea type="text" value={!editable ? value.answer : editableId === i ? editAnswer : value.answer} disabled={editableId!==i ? "disabled" :!editable ? 'disabled' : ''} onChange={e => setEditAnswer(e.target.value)}/>
                            </div>
                            </div>
                        </div>))}
                        </div>

                        <hr/>
                        <div className="d-flex justify-content-center" style={{paddingBottom: "2%"}}>
                                {loading ? (<div class="spinner-border text-primary"></div>) : (<> <CustomButton customButton__class=" profile__footerBtn aboutus__btn-margin" text="Save" handleClick={handleSave} />
                                <CustomButton customButton__class="btn profile__backbtn"  text="Cancel" handleClick={handleCancel}/></>)}
                        </div>

                </div>
           </form>
        </div>
    )
}

export default Faq
