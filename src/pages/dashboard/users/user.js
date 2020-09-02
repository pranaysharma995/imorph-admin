import React,{useState} from 'react'
import CustomTable from '../../../customComponents/customTable'
import profile from '../../../assets/profile.png'

const UsersPage =()=> {

    const [search , setSearch] = useState('')

    const tableHeaderText = ["Photo","Name & Email","Conversions","Contact","Subscriptions","Status","Action"];
      const data = [
    {
      id : 12,
      photo : profile,
      fname : 'Rahul',
      lname : "roy",
      email : 'rahul@gmail.com',
      conversions : "300",
      contact : "723732673",
      status : "Active"
    },
    {
      id : 15,
      photo : profile,
      fname : 'Rajat',
      lname : "das",
      email : 'rajat@gmail.com',
      conversions : "600",
      contact : "86465745445",
      subscriptions : "INFINITE 7",
      status : "Expired"
    },
    {
      id : 18,
      photo : profile,
      fname : 'Rajat',
      lname : "ghosh",
      email : 'rajat@gmail.com',
      conversions : "600",
      contact : "86465745445",
      subscriptions : "INFINITE 365",
      status : "Inactive"
    },

  ]
    return (
       
            <CustomTable tableClass="users__tableClass table-striped"  tableHeaderText={tableHeaderText} userData={data} results="23456" searchValue={search}  onHandleChange={e => setSearch(e.target.value)} uri="/dashboard/users/view"/>
       
    )
}

export default UsersPage
