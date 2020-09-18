import React, {useState, useEffect} from 'react'
import CustomButton from '../../../customComponents/customButton'
import {useHistory, Redirect} from 'react-router-dom'
import defaultImage from '../../../assets/subdefault.png'



const EditSubscription = ({plan}) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState({plan_name: false, cost: false, description: false, image: false, validity: false  })
    const [validity , setValidity] = useState('')
    useEffect(() => {
        if (plan) {
            setName(plan.name);
            setCost(plan.cost);
            setDescription(plan.description);
            setImage("http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/subscription/"+plan.image)
            setValidity(plan.validity)
            console.log("Plans", plan);
        }
    }, [])


    if (!plan) {
        return <Redirect to="/dashboard/subscription"/>
    }

    return (
        <div className="createSubscription">
            {
            loading ? <div className="container text-center"
                style={
                    {
                        marginTop: "400px",
                        marginBottom: "50%"
                    }
            }>
                <div className="spinner-border text-primary"></div>
            </div> : <>
                <div className="d-flex justify-content-between"
                    style={
                        {padding: "0.7% 1.6%"}
                }>
                    <h3 style={
                        {color: "#707070"}
                    }>Edit Subscription Plan</h3>

                    <div>
                        <CustomButton customButton__class="btn subs__back-btn"  text="Back" handleClick={() => history.push("/dashboard/subscription")}/>
                    </div>
                </div>
                <hr style={
                    {
                        lineHeight: "0.4",
                        marginTop: "-5px"
                    }
                }/>
                <div className="createSubscription__body">
                    <form action="#">
                        <div className="row justify-content-center">
                            <div className="col-md-6 ">
                                <label htmlFor="name"
                                    style={
                                        {
                                            lineHeight: "0.4",
                                            color: "#707070"
                                        }
                                }>Subscription Plan Name</label>
                                <input id="name"
                                    className={
                                        error.plan_name ? "form-control createSubscription__errorInput" : "form-control"
                                    }
                                    type="text"
                                    value={name}
                                   disabled/>
                            </div>
                            <div className="col-md-6">
                            
                                <label htmlFor="cost"
                                    style={
                                        {
                                            lineHeight: "0.4",
                                            color: "#707070"
                                        }
                                }>Cost(USD)</label>
                                <input id="cost"
                                    className={
                                        error.cost ? "form-control createSubscription__errorInput" : "form-control"
                                    }
                                    type="text"
                                    value={cost}
                                    disabled/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6 ">
                            
                            <label htmlFor="validity" style={{lineHeight :"0.4" , color : "#707070"}}>Subscription Plan Validity</label>
                                <div className="d-flex">
                                <input id="validity" className={error.validity ? "form-control createSubscription__errorInput" :"form-control"} type="text" value={validity} disabled/>
                                 <p style={{ color : "#707070", marginLeft : "10px"}}>Days</p>
                                </div>
                            </div>
                       
                         </div>
                        <div className="row justify-content-center mt-4">
                            <div className="col-md-12">
                                <label htmlFor="description"
                                    style={
                                        {
                                            lineHeight: "0.4",
                                            color: "#707070"
                                        }
                                }>Description</label>
                                <textarea id="description"
                                    className={
                                        error.description ? "form-control createSubscription__errorInput" : "form-control"
                                    }
                                    type="text"
                                    value={description}
                                    disabled/>
                            </div>
                        </div>
                       
                        <div className="row mt-4 ">
                            <div className="col-md-6">
                               
                                <label htmlFor="image"
                                    style={
                                        {
                                            lineHeight: "0.4",
                                            color: "#707070"
                                        }
                                }>Subscription Image</label><br/>
                              <img id="image" width="180rem"
                                    src={
                                        image !== '' ? image : defaultImage
                                    }
                                    alt="alt"/>
                            </div>

                            
                        </div>
                    </form>
                </div>
            </>
        } </div>
    )
}

export default EditSubscription;
