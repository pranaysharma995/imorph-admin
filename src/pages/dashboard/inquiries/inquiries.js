import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import CustomButton from '../../../customComponents/customButton'
import CustomTextfield from '../../../customComponents/customTextfield'
import avatar from '../../../assets/profile.png'

const Inquiries = ({data}) => {
    const history = useHistory();
    const [search, setSearch] = useState('')
    const [filerData, setFilterData] = useState([])
    const [userData, setUserData] = useState([])

    useEffect(() => {

        setUserData([
            { firstName : "Dipta", 
              lastName : "Biswas",
              email: "dkjfkj@jadfjd.com",
              date : "12-7-2020",
              subject : 'Lorem, ipsum dolor sit amet consectetur adipisicing.' ,
              status : true },
              { firstName : "Rahul",
              lastName : "Das" ,
              email: "trtryetr@jadfjd.com",
              date : "12-7-2020",
              subject : 'Lorem, ipsum dolor sit amet consectetur adipisicing.' ,
              status : false },
        ])
        setFilterData([{ firstName : "Dipta", 
        lastName : "Biswas",
        email: "dkjfkj@jadfjd.com",
        date : "12-7-2020",
        subject : 'Lorem, ipsum dolor sit amet consectetur adipisicing.' ,
        status : true },
        { firstName : "Rahul",
        lastName : "Das" ,
        email: "trtryetr@jadfjd.com",
        date : "12-7-2020",
        subject : 'Lorem, ipsum dolor sit amet consectetur adipisicing.' ,
        status : false }
    ])
        
    }, [])


    return (
        <div className="inquiries">
            <div className="d-flex justify-content-between users__tableHeader">
                <div>
                    <h5 style={
                        {
                            marginTop: "10px",
                            color: "black",
                            marginLeft: "10px",
                            paddingLeft: "10px",
                            color : "#707070"
                        }
                    }>Enquiry</h5>
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

                <label htmlFor="status" className="select__label">
                    <select name="status" className="customTable__select"
                        >
                        <option value="All Enquiries">All Enquiries</option>
                        <option value="Resolved">Resolved</option>
                        <option value="UnResolved">UnResolved</option>
                        <option value="In-progress">In-progress</option>
                    </select>
                </label>
                
            </div>
        </div>
        <div style={
            {
                overflowX: 'auto',
                maxHeight: "600px"
            }
        }>
            <table className="users__tableClass table-striped">

                <thead>
                    <tr>
                         <th><h6 style={  {marginTop: "8px"} }> Photo</h6></th> 
                         <th><h6 style={  {marginTop: "8px"} }> Name/User ID</h6></th>  
                         <th><h6 style={  {marginTop: "8px"} }> Date</h6></th>  
                         <th><h6 style={  {marginTop: "8px"} }> Subject</h6></th>  
                         <th><h6 style={  {marginTop: "8px"} }> Status</h6></th>  
                         <th><h6 style={  {marginTop: "8px"} }> Action</h6></th>   
                     </tr>                                 
                </thead>
                <tbody> {
                    filerData.map((info, i) => (
                        <tr key={i}>
                            <td><img width="70rem" className="rounded-circle p-2"
                                    alt={i}
                                    src={avatar}/></td>
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
                            <td>{info.date}</td>
                            <td>{info.subject}</td>
                            <td className={
                                info.status === true ? "customTable__statusActive" : "customTable__statusInactive"
                            }>
                                {
                                info.status === true ? "In-progress" : "Unresolved"
                            }</td>
                            <td>
                                    <CustomButton customButton__class="customTable__edit"
                                        
                                        icon={
                                            <i
                                        className="fa fa-eye"
                                        aria-hidden="true"></i>
                                        }
                                        handleClick={()=>{
                                            data(info)
                                            history.push("/dashboard/inquiries/view")
                                        }}/>
                            </td>
                        </tr>
                    ))
                } </tbody>

            </table>
        </div>
        {/* {notFound &&<div className="customTable__no-element text-center">
            <p className="mt-3">No user has this subscription plan</p>
        </div>} */}
        {/* <div className="customTable__footer">
        </div> */}
        </div>
    )
}

export default Inquiries
