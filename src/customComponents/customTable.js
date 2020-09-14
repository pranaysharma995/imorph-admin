import React, {useContext, useState, useEffect} from 'react'
import CustomButton from './customButton'
import '../css/style.css'
import CustomTextfield from './customTextfield'
import UserDetailsContext from '../context/user/userDetailsContext'
import {useHistory} from 'react-router-dom'
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
    toggle,
    list
}) => {

    const context = useContext(UserDetailsContext);
    const history = useHistory();
    const [search, setSearch] = useState('')
    const [blockValue, setBlockValue] = useState(null)
    const [unBlockValue, setUnBlockValue] = useState(null)
    const [filterValue, setFilterValue] = useState({device: '', subscription: "", bySubscriptionName: ''})
    const [filerData, setFilterData] = useState([])
    const [notFound, setNotFound] = useState(false)

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

    const unBlockUser = (e, info) => {
        e.preventDefault();
        setUnBlockValue(info);
        setBlockValue(null);
    }

    useEffect(() => {
        setFilterData(userData)
    }, [userData])

    const getShortedData = (subscription) => {
        let shortedData = subscription.sort((var1, var2) => {
            let a = new Date(var1?.createdAt),
                b = new Date(var2?.createdAt);
            if (a < b) 
                return 1;
            
            if (a > b) 
                return -1;
          
            return 0;
        })
        return shortedData[0]?.name;
    }

    useEffect(() => {

        if (filterValue.subscription === "" && filterValue.bySubscriptionName === '') {
            setFilterData(userData);
            setNotFound(false)
        } else if (filterValue.subscription === "Subscription" && filterValue.bySubscriptionName === '') {
            setFilterData(userData.filter(user => user.subscription.length > 0));
            setNotFound(false)
        } else if (filterValue.subscription === "Non Subscription" && filterValue.bySubscriptionName === '') {
            setFilterData(userData.filter(user => user.subscription.length === 0))
        }
        else if(filterValue.subscription === 'Non Subscription' && filterValue.bySubscriptionName !== ''){
            setNotFound(true);
            setFilterData([]);
        }
        else if (filterValue.subscription === '') {
            let tt = []
            list.forEach(value => {
                if (filterValue.bySubscriptionName === value?.name) {
                    console.log("Filter value", value);
                    userData.forEach(user => {
                        if (user.subscription.length > 0) {
                            let planName = getShortedData(user.subscription)
                            if (planName === value.name) {
                                tt.push(user)
                            } else { // No Subscribe user
                            }
                        }
                    })
                }
            })
            if (tt.length > 0) {
                setFilterData(tt);
                setNotFound(false)
            }else{
                setNotFound(true);
                setFilterData([]);
            }
        } else if (filterValue.subscription === 'Subscription' && filterValue.bySubscriptionName !== '') {
            let tt = []
            list.forEach(value => {
                if (filterValue.bySubscriptionName === value?.name) {
                    console.log("Filter value", value);
                    userData.forEach(user => {
                        if (user.subscription.length > 0) {
                            let planName = getShortedData(user.subscription)
                            if (planName === value.name) {
                                tt.push(user)
                            } else { // No Subscribe user
                            }
                        }
                    })
                }
            })
            if (tt.length > 0) {
                setFilterData(tt);
                setNotFound(false)
            }else{
                setNotFound(true)
                setFilterData([]);
            }
        }

    }, [filterValue])

    const filterUser = e => {

        console.log("OnChnaginggin");
        if (e.target.name === 'subscription') { // setFilterData(userData.filter(user => user.subscription.length > 0))
            if (e.target.value === "All User") {
                setFilterValue({
                    ...filterValue,
                    subscription: ''

                })
            } else {
                setFilterValue({
                    ...filterValue,
                    subscription: e.target.value
                })
            }
        }
        if (e.target.name === "days") {
            if (e.target.value === "All Subscription") {
                setFilterValue({
                    ...filterValue,
                    bySubscriptionName: ''
                })
            } else {
                setFilterValue({
                    ...filterValue,
                    bySubscriptionName: e.target.value
                })
            }
        }

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
                            e => {
                                setSearch(e.target.value)
                                setFilterData(userData.filter(user => (user.email.toLocaleLowerCase().includes(e.target.value.toLowerCase()))))
                            }
                        }/>
                </div>
            <div className="styleWrape"
                style={
                    {marginTop: "3px"}
            }>

                <label htmlFor="device" className="select__label">
                    <select name="device" className="customTable__select"
                        onChange={filterUser}>
                        <option value="All User">All User</option>
                        <option value="Android User">Android User</option>
                        <option value="iOS User">iOS User</option>
                    </select>
                </label>
                <label htmlFor="subscription" className="select__label">
                    <select name="subscription" className="customTable__select"
                        onChange={filterUser}>
                        <option value="All User">All User</option>
                        <option value="Subscription">Subscription</option>
                        <option value="Non Subscription">Non Subscrip...</option>
                    </select>
                </label>
                <label htmlFor="days" className="select__label">
                    <select name="days" className="customTable__select"
                        onChange={filterUser}>
                        <option value="All Subscription">All Subscription</option>
                        {
                        list && list.map((value, i) => (
                            <option key={i}
                                value={
                                    value.name
                            }>
                                {
                                value.name
                            }</option>
                        ))
                    } </select>
                </label>
            </div>
        </div>
        <div className="customTable__results">
            <p>Showing Results :  <strong>{ " " + filerData.length }</strong> </p>
        </div>

        <div style={
            {
                overflowX: 'auto',
                maxHeight: "600px"
            }
        }>
            <table className={tableClass}>

                <thead>
                    <tr> { tableHeaderText.map((text, i) => ( <th key={i}> <h6 style={  {marginTop: "8px"} }>   {text}</h6> </th>   ))   } </tr>                                 
                </thead>
                <tbody> {
                    filerData.map((info, i) => (
                        <tr key={i}>
                            <td><img width="70rem" height="70rem" className="rounded-circle p-2"
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
                            <td> {
                                info.subscription.length > 0 ? (
                                    <>{
                                        getShortedData(info.subscription)
                                    }</>
                                ) : "No Subscription"
                            } </td>
                            {}
                            <td className={
                                info.subscriptionStatus === true ? "customTable__statusActive" : "customTable__statusExpired"
                            }>
                                {
                                info.subscriptionStatus === true ? "Active" : "Expired"
                            }</td>
                            <td>
                                <div className="d-flex">

                                    {
                                    info.block === true ? (
                                        <button className="customTable__delete "
                                            style={
                                                {
                                                    position: "relative",
                                                    padding: "13px"
                                                }
                                            }
                                            data-toggle="modal"
                                            data-target="#blockModal"
                                            onClick={
                                                (e) => unBlockUser(e, info)
                                        }><img width="12rem" className="blockbtn__icon"
                                                src={unblockimg}
                                                alt="block"/></button>
                                    ) : (
                                        <button className="customTable__block"
                                            onClick={
                                                (e) => deleteUser(e, info)
                                            }
                                            data-toggle="modal"
                                            data-target="#blockModal">
                                            <i className="fa fa-ban"></i>
                                        </button>
                                    )
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
        {notFound &&<div className="customTable__no-element text-center">
            <p className="mt-3">No user has this subscription plan</p>
        </div>}
        <div className="customTable__footer">
        </div>
        <UserBlockModal blockvalue={blockValue}
            unblockvalue={unBlockValue}
            toggle={toggle}/>
    </div>
    )
}

export default CustomTable
