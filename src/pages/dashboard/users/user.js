import React,{useState,useEffect} from 'react'
import CustomTable from '../../../customComponents/customTable'
import profile from '../../../assets/profile.png'
import axiosInstance from '../../../axios'

const UsersPage =()=> {

    
    const [loading , setLoading] = useState(false)
    const [userData , setUserData] = useState([])
    const [toggle , setToggle] = useState(false);
    const [subscriptionList , setSubscriptionList] = useState([])

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

    let list=[]
    axiosInstance.get("/admin/subscription/list").then((({data}) => {
      console.log("List of Subscription" , data?.data);
      Object.entries(data.data).map(lis => {
        list.push(lis[1])
      })
      setSubscriptionList(list);

    })).catch(error=> {
      console.log("Error in fetching subscription list in User.js" , error);
    })
   }, [toggle])

    const tableHeaderText = ["Photo","Name & Email","Conversions","Contact","Subscriptions","Status","Action"];


    return (
      <>
      {loading ? (<div className="container text-center" style={{marginTop: "400px" , marginBottom : "50%"}}>   
      <div   className="spinner-border text-primary"></div>
      </div>) : 
            <CustomTable toggle={setToggle} tableClass="users__tableClass table-striped"  tableHeaderText={tableHeaderText} userData={userData} results="23456"  uri="/dashboard/users/edit" list={subscriptionList}/>
          }
        </>
    )
}

export default UsersPage
