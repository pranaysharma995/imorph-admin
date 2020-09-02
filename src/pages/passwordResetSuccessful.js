import React,{useEffect,useState} from 'react'
import {useHistory , Redirect} from "react-router-dom"
import restPage from "../assets/restPage.png"

const ResetSuccessfull =() => {
    const history = useHistory()
    const [loading , setLoading] = useState(false);

    useEffect(() => {

        setTimeout(() => {
            setLoading(true)
        }, 2000);
    }, [])

    if(loading){
      return <Redirect to="/"/>
    }
    return (
        <div className="resetSuccess__page">
            <style>{'body { background-color: #009CB4; }'}</style>
            <div className="text-center">
                <img width="150rems" src={restPage} alt="logo" className="resetSuccess_img" />
            </div>
           <div className="text-center resetSuccess__header">
                <h5 style={{fontSize : "25px"}}> Password Reset Successful</h5>
                <p style={{fontSize : "12px"}}>You can use your password to login </p>
           </div>
        </div>
    )
}

export default ResetSuccessfull;
