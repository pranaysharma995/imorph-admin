import React, {useEffect, useState} from 'react'
import CustomButton from '../../../customComponents/customButton'
import axiosInstance from '../../../axios'
import {useHistory} from 'react-router-dom'

const Subscription = ({plan}) => {

    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [listData, setListData] = useState([])
    const [reload , setReload] = useState(false)
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        let tt= []
        axiosInstance.get("/admin/subscription/list",{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(({data}) => {
            setLoading(false);

            let tt= [];
            Object.entries(data.data).forEach(value => {
                tt.push(value[1])
            })
            setList(tt);
            setListData(tt)
        }).catch(error => console.log("Error in Subscription List Fetch", error))
        
    }, [reload])


    const planChange=e=> {
       
        if(e.target.value === "All Enquiries" ){
           setList(listData)
        }
        else if(e.target.value === "Active"){
            console.log("Active List " , list);
             setList(listData.filter(value => value.status === true))
        }else if(e.target.value === "InActive"){
            setList(listData.filter(value => value.status !== true))
        }
    }

    const handleStatus=(item,e)=> {
        let data = new FormData();
        data.set("status", e.target.checked)
        data.set("id", item.subscriptionID)
        
        axiosInstance.post("/admin/subscription/update", data ,{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
        }).then(() => {
            setReload(!reload)
        }).catch(err => {
            console.log("Error in Subscription check subscription.js", err);
        })
    }

    return (
        <div className="subscription">
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
                <div className="d-flex justify-content-end">
                    <button className="subscription__add-btn"
                        style={
                            {position: 'relative'}
                        }
                        onClick={
                            () => history.push('/dashboard/subscription/create')
                    }>
                        Create New
                    </button>
                </div>
                <div className="d-flex justify-content-between users__tableHeader">
                    <div>
                        <h5 style={
                            {
                                marginTop: "10px",
                                color: "#707070",
                                marginLeft: "10px",
                                paddingLeft: "10px"
                            }
                        }>Subscription Plan</h5>
                    </div>

                    <label htmlFor="status" className="select__label">
                    <select name="status" className="customTable__select" onChange={planChange}
                        >
                        <option value="All Enquiries">All Plans</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                    </select>
                </label>

                </div>


                <div className="subscription__body"
                    style={
                        {
                            overflowX: 'auto',
                            maxHeight: "600px"
                        }
                }>
                    <table className="subscription__table table-striped">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>
                                    <h5>Subscription Plan</h5>
                                </th>
                                <th>
                                    <h5>Active ?</h5>
                                </th>
                                <th>
                                    <h5>View</h5>
                                </th>
                            </tr>
                        </thead>
                        <tbody> {
                            list && list.map((item, i) => (
                                <tr key={i}>
                                    <td>{
                                        i + 1
                                    }</td>

                                    <td>{
                                        item.name
                                    }
                                       &#160;&#160;${
                                        item.cost
                                    }</td>
                                    <td><input type="checkbox" style={{width : "20px" , height : "20px"}} checked={item.status} onChange={(e) =>handleStatus(item,e)}/></td>
                                    <td>
                                        <div className="d-flex">
                                            <CustomButton customButton__class="subscription__edit-btn"
                                                icon={
                                                    <i
                                                className="fa fa-eye"
                                                aria-hidden="true"></i>
                                                }
                                                handleClick={
                                                    () => {
                                                        history.push("/dashboard/subscription/edit");
                                                        plan(item)
                                                    }
                                                }/>
                                        </div>
                                </td>
                            </tr>
                            ))
                        } </tbody>

                    </table>
                </div>
                {/* <div className="subscription__footer p-4"></div> */}
            </>
        } </div>
    )
}

export default Subscription
