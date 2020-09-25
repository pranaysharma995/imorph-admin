import React,{useState,useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import CustomButton from '../../../customComponents/customButton'
import CustomTextfield from '../../../customComponents/customTextfield'
import axiosInstance from '../../../axios'
import ImageSettingsContext from '../../../context/imageSettings/imageSettingsContext'

const Inquiries = ({data}) => {
    const history = useHistory();
    const [search, setSearch] = useState('')
    const [filerData, setFilterData] = useState([])
    const [userData, setUserData] = useState([])
    const {imageSettings} = useContext(ImageSettingsContext);
    const [loading , setLoading] = useState(false)

    useEffect(() => {


        setLoading(true)
        axiosInstance.get("/admin/inquiry/list",{
            headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
          }).then(({data})=> {

            console.log("List Enquiries" , data.data);
            let temp=[]
            Object.entries(data.data).map(inquiries => {
              temp.push(inquiries[1])
            })
            setUserData(temp);
            setFilterData(temp)
            setLoading(false)
          }).catch( error => {
            console.log("Error in user List" , error);
          })
       
        
    }, [])

    const handleFilter=e=> {
        if(e.target.value === "All Enquiries"){
            setFilterData(userData)
        }
        else if(e.target.value === "Resolved"){
            setFilterData(userData.filter(inquiries => inquiries.status == true))
        }
        else if(e.target.value === "UnResolved"){
            setFilterData(userData.filter(inquiries => inquiries.status == false))
        }
        console.log("Enquary filter" ,e.target.value);
    }


    return (
       <> {loading ? (
        <div className="container text-center"
            style={
                {
                    marginTop: "400px",
                    marginBottom: "50%"
                }
        }>
            <div className="spinner-border text-primary"></div>
        </div>
    )  : (
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
                <select name="status" className="customTable__select" onChange={handleFilter}
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
                                src={info.userImage ?  "http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/user/"+info.userImage : `http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/${imageSettings?.userIcon}`}/></td>
                        <td>
                            <div className="text-left">
                                <h6 style={
                                    {marginTop: "8px"}
                                }>
                                    {
                                    info.userName
                                }</h6>
                                <p>{
                                    info.userEmail
                                }</p>
                            </div>
                        </td>
                        <td>{new Date(info.createdDate).toLocaleDateString()}</td>
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
    {filerData.length <=0 &&<div className="customTable__no-element text-center">
        <p className="mt-3">No Enquiry available</p>
    </div>}
    {/* <div className="customTable__footer">
    </div> */}
    </div>
       )} </>
    )
}

export default Inquiries
