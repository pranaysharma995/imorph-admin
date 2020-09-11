import React, {useContext, useState, useEffect} from 'react'
import CustomButton from './customButton'
import '../css/style.css'
import CustomTextfield from './customTextfield'
import UserDetailsContext from '../context/user/userDetailsContext'
import {useHistory} from 'react-router-dom'
import axiosInstance from '../axios'
import UserBlockModal from '../pages/dashboard/modal/userBlockModal'
import unblockimg from '../assets/unblock.png'

const CustomTable = ({
    tableClass,
    tableHeaderText,
    userData,
    results,
    searchValue,
    onHandleChange,
    uri,
    toggle
}) => {

    const context = useContext(UserDetailsContext);
    const history = useHistory();
    const [search, setSearch] = useState('')
    const [blockValue, setBlockValue] = useState(null)
    const [unBlockValue, setUnBlockValue] = useState(null)

    const viewBtnClick = (e, info) => {
        e.preventDefault();
        console.log("View Button", info);
        context.setUserDetails(info)
        history.push(uri)
    }

    const deleteUser = (e, info) => {
        e.preventDefault();
        setBlockValue(info);
        setUnBlockValue(null)
    }

    const unBlockUser=(e,info)=>{
        e.preventDefault();
        setUnBlockValue(info);
        setBlockValue(null);
    }

    const filerData = userData.filter(user => (user.email.toLocaleLowerCase().includes(search.toLowerCase())))


    const filterUser = e => {

        // if(e.target.name === "device"){
        //     console.log(e.target.value);
        // }
        // else  if(e.target.name === "subscription"){
        //     if(e.target.value === "All User"){
        //         setData(userData);
        //     }
        //     else if(e.target.value === "Subscription"){
        //         setData(userData);
        //         setData(userData.filter(user => user.subscriptions !== undefined))
        //     }
        //     else if(e.target.value === "Non Subscription"){
        //         setData(userData);
        //         setData(userData.filter(user => user.subscriptions === undefined))
        //     }
        // }
        // else if(e.target.name === "days"){
        //     if(e.target.value === "All Plan"){
        //         setData(userData);
        //     }
        //     else if(e.target.value === "7 Days"){
        //         setData(userData);
        //         setData(userData.filter(user => user.subscriptions === "INFINITE 7"))

        //     }
        //     else if(e.target.value === "1 Month"){
        //         setData(userData);
        //         setData(userData.filter(user => user.subscriptions === "INFINITE 30"))

        //     }
        //     else if(e.target.value === "12 Month"){
        //         setData(userData);
        //         setData(userData.filter(user => user.subscriptions === "INFINITE 365"))

        //     }
        // }

    }


    return (
        <div className="customTable"
            style={
                {
                    marginTop: "120px",
                    marginBottom: "8%"
                }
        }>
            <div className="d-flex justify-content-between users__tableHeader">
                <div>
                    <h5 style={
                        {
                            marginTop: "10px",
                            color: "black",
                            marginLeft: "10px",
                            paddingLeft: "10px"
                        }
                    }>Users</h5>
                </div>
                <div style={
                    {
                        position: "relative",
                        marginTop: "2px"
                    }
                }>
                    <CustomTextfield customTextfield__input="form-control customTable__input" type="text" placeholder="Search" icon_class="fa fa-search customTable__searchIcon"
                        value={search}
                        handleChange={
                            e => setSearch(e.target.value)
                        }/>
                </div>
                <div className="styleWrape"
                    style={
                        {marginTop: "3px"}
                    }
                    onClick={filterUser}>

                    <label htmlFor="device" className="select__label">
                        <select name="device" className="customTable__select">
                            <option value="All User">All User</option>
                            <option value="Android User">Android User</option>
                            <option value="iOS User">iOS User</option>
                        </select>
                    </label>
                    <label htmlFor="subscription" className="select__label">
                        <select name="subscription" className="customTable__select">
                            <option value="All User">All User</option>
                            <option value="Subscription">Subscription</option>
                            <option value="Non Subscription">Non Subscription</option>
                        </select>
                    </label>
                    <label htmlFor="days" className="select__label">
                        <select name="days" className="customTable__select">
                            <option value="All Plan">All Plan</option>
                            <option value="7 Days">7 Days</option>
                            <option value="1 Month">1 Month</option>
                            <option value="12 Month">12 Month</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="customTable__results">
                <p>Showing Results :
                    <strong>{
                        " " + userData.length
                    }</strong>
                </p>
            </div>

            <div style={
                {
                    overflowX: 'auto',
                    maxHeight: "600px"
                }
            }>
                <table className={tableClass}>

                    <thead>
                        <tr> {
                            tableHeaderText.map((text, i) => (
                                <th key={i}>
                                    <h6 style={
                                        {marginTop: "8px"}
                                    }>
                                        {text}</h6>
                                </th>
                            ))
                        } </tr>
                    </thead>
                    <tbody> {
                        filerData.map((info, i) => (
                            <tr key={i}>

                                <td><img width="70rem" className="rounded-circle p-2"
                                        alt={i}
                                        src={
                                            info.photo
                                        }/></td>
                                <td>
                                    <div className="text-left">
                                        <h6 style={
                                            {marginTop: "8px"}
                                        }>
                                            {
                                            info.firstName
                                        }&#x20;{
                                            info.lastName
                                        }</h6>
                                        <p>{
                                            info.email
                                        }</p>
                                    </div>
                                </td>
                                <td>{
                                    info.conversion.length
                                }</td>
                                <td>{
                                    info.phoneNumber
                                }</td>
                                <td>{
                                    info.subscriptions
                                }</td>
                                {
                                console.log("Subscription status", info.subscriptionStatus)
                            }
                                <td className={
                                    info.subscriptionStatus == true ? "customTable__statusActive" : "customTable__statusExpired"
                                }>
                                    {
                                    info.subscriptionStatus == true ? "Active" : "Expired"
                                }</td>
                                <td>
                                    <div className="d-flex">

                                        {
                                        info.block == true ?( <button className="customTable__delete "
                                            style={
                                                {position: "relative",padding: "13px"}
                                            }
                                            data-toggle="modal"
                                            data-target="#blockModal" onClick={(e) =>unBlockUser(e,info)}><img width="12rem" className="blockbtn__icon"
                                                src={unblockimg}
                                                alt="block"/></button>) : (<button className="customTable__block"
                                            onClick={
                                                (e) => deleteUser(e, info)
                                            }
                                            data-toggle="modal"
                                            data-target="#blockModal">
                                            <i className="fa fa-ban"></i>
                                        </button>)
                                    }
                                        <CustomButton customButton__class="customTable__edit"
                                            handleClick={
                                                (e) => viewBtnClick(e, info)
                                            }
                                            icon={
                                                <i
                                            className="fa fa-eye"
                                            aria-hidden="true"></i>
                                            }/>
                                    </div>
                                </td>
                            </tr>
                        ))
                    } </tbody>

                </table>
            </div>
            <UserBlockModal blockvalue={blockValue} unblockvalue={unBlockValue}
                toggle={toggle}
                />
        </div>
    )
}

export default CustomTable
