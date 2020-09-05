import React,{useEffect,useState} from 'react'
import CustomButton from '../../../customComponents/customButton'
import {useHistory} from 'react-router-dom'

function UserSubscriptionPlanView() {

    const history = useHistory();

    return (
        <div className="userSubs" >
           <div className="d-flex justify-content-between" style={{padding : "0.7% 1.6%"}}>
             <h3 style={{color : "#707070"}}>Subscription Plan Details</h3>

             <div>
                <CustomButton customButton__class="btn subs__back-btn"  text="Back" handleClick={() => history.push("/dashboard/users")}/>
             </div>
          </div>
          <hr style={{lineHeight: "0.4", marginTop: "-5px"}}/>

          <div style={{padding : "1% 10%"}}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-left">
                        <h6>Subscription Plan Name:&#160;</h6>
                        <ul><p className="text-danger">Infinite 365</p></ul>
                    </div>
                    <div className="d-flex justify-content-left">
                        <div>
                             <h6>Status: &#160;</h6>
                        </div>
                       <div>
                        <button className="userProfile__subBtn userProfile__active " disabled>Active</button>
                       </div>
                    </div>
                </div>

                <div className="d-flex justify-content-left">
                        <h6>Duration:&#160;</h6>
                        <ul><p>12 Months</p></ul>
                </div>
                    <div className="d-flex justify-content-left">
                        <h6>Cost:&#160;</h6>
                        <ul><p>$30 One-Off</p></ul>
                    </div>
                    <div className="d-flex justify-content-left">
                        <h6>Active Date:&#160;</h6>
                        <ul> <p>21-12-2019</p></ul>
                    </div>
                    <div className="d-flex justify-content-left">
                        <h6>Expire Date:&#160;</h6>
                        <ul><p>21-12-2020</p></ul>
                    </div>
                    <div className="d-flex justify-content-left">
                        <h6>Description:&#160;</h6>
                        <ul>
                        <li>Benifits 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, dolores?</li>
                        <li>Benifits 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, dolores?</li>
                        <li>Benifits 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, dolores?</li>
                        </ul>
                    </div>         
          </div>

        </div>
    )
}

export default UserSubscriptionPlanView
