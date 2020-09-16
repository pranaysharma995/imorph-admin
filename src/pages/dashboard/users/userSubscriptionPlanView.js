import React, {useEffect, useState, useContext} from 'react'
import CustomButton from '../../../customComponents/customButton'
import {useHistory, Redirect} from 'react-router-dom'
import SubscriptionContext from '../../../context/user-subscription/userSubcriptionContext'

function UserSubscriptionPlanView() {

    const history = useHistory();
    const {subscription} = useContext(SubscriptionContext)

    if (!subscription) {
        return <Redirect to="/dashboard/users"/>
    }
    console.log("Subscciii", subscription);
    return (
        <div className="userSubs">
            <div className="d-flex justify-content-between"
                style={
                    {padding: "0.7% 1.6%"}
            }>
                <h3 style={
                    {color: "#707070"}
                }>Subscription Plan Details</h3>

                <div>
                    <CustomButton customButton__class="btn subs__back-btn" text="Back"
                        handleClick={
                            () => history.goBack("dashboard/users/edit")
                        }/>
                </div>
            </div>
            <hr style={
                {
                    lineHeight: "0.4",
                    marginTop: "-5px"
                }
            }/>

            <div style={
                {padding: "1% 10%"}
            }>
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-left">
                        <h6>Subscription Plan Name:&#160;</h6>
                        <ul>
                            <p className="text-danger">
                                {
                                subscription.name
                            }</p>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-left">
                        <div >
                            <h6>Status: &#160;</h6>
                        </div>
                        <div style={{width: "100%"}}>
                            <button className={
                                    subscription.status == true ? "userProfile__subBtn userProfile__active" : "userProfile__subBtn userProfile__expired"
                                }
                                disabled>{subscription.status == true ? "Active" : "Expired"}</button>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-left">
                    <h6>Duration:&#160;</h6>
                    <ul>
                        <p>{subscription.validity} Days</p>
                    </ul>
                </div>
                <div className="d-flex justify-content-left">
                    <h6>Cost:&#160;</h6>
                    <ul>
                        <p>{
                            subscription.cost
                        }</p>
                    </ul>
                </div>
                <div className="d-flex justify-content-left">
                    <h6>Active Date:&#160;</h6>
                    <ul>
                        <p>{
                            new Date(subscription.activateDate).toLocaleDateString()
                        }</p>
                    </ul>
                </div>
                <div className="d-flex justify-content-left">
                    <h6>Expire Date:&#160;</h6>
                    <ul>
                        <p>{new Date(subscription.expiredDate).toLocaleDateString()}</p>
                    </ul>
                </div>
                <div className="d-flex justify-content-left">
                    <h6>Description:&#160;</h6>
                    <ul>
                        <li>{subscription.description}</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default UserSubscriptionPlanView
