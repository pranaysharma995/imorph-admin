import React from 'react'
import danger from '../../../assets/danger.png'
import axiosInstance from '../../../axios'


const UserBlockModal = ({blockvalue ,unblockvalue ,toggle,toggleValue}) => { 

    const onYes = e=> {
        e.preventDefault();       
        
        
        if(blockvalue !=null){
            axiosInstance.post("/user/change-status" ,{
                id : blockvalue._id,
                block : true
            },{
                headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
            }).then((result) =>{
                console.log("Block Value" , result.data);
                toggle(!toggleValue)   
            }).catch(error => {
                console.log("Error in userBlock Modal" , error);
            })
        }else if(unblockvalue !=null){
            axiosInstance.post("/user/change-status" ,{
                id : unblockvalue._id,
                block : false
            },{
                headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
            }).then((result) =>{
                console.log("Block Value" , result.data);
                toggle(!toggleValue)
            }).catch(error => {
                console.log("Error in userBlock Modal" , error);
            })
        }
    }

    return (
        <div className="modal fade text-center" id="blockModal" >
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
                            }>{blockvalue ? `Are you sure you want to block ${blockvalue && blockvalue.firstName} ${blockvalue && blockvalue.lastName}?` : `Are you sure you want to unblock ${unblockvalue && unblockvalue.firstName} ${unblockvalue && unblockvalue.lastName}?`} </h3>
                        </div>

                        <div className="d-flex justify-content-between"
                            style={
                                {padding: "2.8vh 9vw"}
                        }>
                           
                                <button className=" modal__yes  " data-dismiss="modal"
                                   onClick={onYes}>Yes</button>
                            
                                <button className="modal__no btn-block " data-dismiss="modal">No</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBlockModal
