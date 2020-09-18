import React from 'react'
import danger from '../../../assets/danger.png'
import axiosInstance from '../../../axios'


const DeleteConfirmation = ({qa, setQuestion, setAnswer, setEditAnswer, setEditQuestion ,setVisible ,setReload ,reload ,setDeleteBtnSpinner, deleteId }) => {


    const onYes=e=> {
        e.preventDefault();

        let tt=[]
        for(let i=0; i<qa.length ; i++){
             if(i!==deleteId){
                 tt.push(qa[i])
             }
        }
        
        setDeleteBtnSpinner(true)
        axiosInstance.post("/admin/cms-setting/faq/update",{
            list : tt
        },{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
          }).then(({data}) => {
            console.log("Faq us delete" , data);
            
            setQuestion('');
            setAnswer('');
            setEditAnswer('');
            setEditQuestion('');
            setVisible(false)

            setTimeout(() => {
                setReload(!reload)
                setDeleteBtnSpinner(false)
            }, 1500);
          }).catch(error => {
            console.log("Error in cmsSettings faq update faq.js" , error);
          })
    }

    return (
        <div className="modal fade text-center" id="confirmDeleteModal" >
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">

                <div className="modal-body"
                    style={
                        {
                            paddingTop: "4%",
                            paddingBottom: "4%"
                        }
                }>

                    <div style={
                        {
                            position: "relative",
                            marginTop: "10px",
                            marginBottom: "18%"
                        }
                    }>
                        <div className="logout__ticBackground">
                            <img width="40rem"
                                src={danger}
                                alt="logo"/>
                        </div>
                    </div>
                    <div style={
                        {marginBottom: "6%"}
                    }>
                        <h3 style={
                            {
                                fontWeight: "400",
                                color: "#707070"
                            }
                        }>Do yo want to delete this FAQ ? </h3>
                    </div>

                    <div className="d-flex justify-content-between"
                        style={
                            {padding: "2.8vh 9vw"}
                    }>
                       
                            <button className=" modal__yes  " data-dismiss="modal"
                              onClick={onYes} >Yes</button>
                        
                            <button className="modal__no btn-block " data-dismiss="modal">No</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DeleteConfirmation
