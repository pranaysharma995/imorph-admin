import React,{useState,useEffect} from 'react'
import CustomTable from '../../../customComponents/customTable'
import profile from '../../../assets/profile.png'
import axiosInstance from '../../../axios'

const UsersPage =()=> {

    
    const [loading , setLoading] = useState(false)
    const [userData , setUserData] = useState([])
    const [toggle , setToggle] = useState(false)

   useEffect(() => {
     setLoading(true);

    axiosInstance.get("/user/list").then(({data})=> {
      setLoading(false);
      let temp=[]
      Object.entries(data.data).map(user => {
        temp.push(user[1])
      })
      setUserData(temp)
    }).catch( error => {
      console.log("Error in user List" , error);
    })
    console.log("Toggle");
   }, [toggle])

    const tableHeaderText = ["Photo","Name & Email","Conversions","Contact","Subscriptions","Status","Action"];


    return (
      <>
      {loading ? (<div className="container text-center" style={{marginTop: "400px" , marginBottom : "50%"}}>   
      <div   className="spinner-border text-primary"></div>
      </div>) : 
            <CustomTable toggle={setToggle} tableClass="users__tableClass table-striped"  tableHeaderText={tableHeaderText} userData={userData} results="23456"  uri="/dashboard/users/edit"/>
          }
        </>
    )
}

export default UsersPage
