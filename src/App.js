import React from 'react';
// import CustomButton from './customComponents/customButton'
// import CustomTextfield from './customComponents/customTextfield'
// import CustomTable from './customComponents/customTable'
// import profile from './assets/profile.png'
// import CustomBar from './customComponents/customBar'
import RouterComponent from './router/routerComponent'
import UserDetailsProvider from './context/auth/userDetailsProvider'

const App=()=> {

  // const click = () => {
  //   alert();
  // }

  // const [text , setText] = useState('')
  // const tableHeaderText = ["Photo","Name & Email","Conversions","Contact","Subscriptions","Status","Action"];
  // const data = [
  //   {
  //     photo : profile,
  //     name : 'Rahul',
  //     email : 'rahul@gmail.com',
  //     conversions : "300",
  //     contact : "723732673",
  //     subscriptions : "7 days , $1/mo",
  //     status : "active"
  //   },
  //   {
  //     photo : profile,
  //     name : 'Rajat',
  //     email : 'rajat@gmail.com',
  //     conversions : "600",
  //     contact : "86465745445",
  //     subscriptions : "8 days , $1/mo",
  //     status : "pending"
  //   },
  //   {
  //     photo : profile,
  //     name : 'Rajat',
  //     email : 'rajat@gmail.com',
  //     conversions : "600",
  //     contact : "86465745445",
  //     subscriptions : "8 days , $1/mo",
  //     status : "pending"
  //   },

  // ]

  // const graphData = {
  //    label : ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "June" , "July" , "Aug","Sep","Oct","Nov","Dec"],
  //    dataSetData : [100, 155, 400, 200, 300 , 222 , 121 , 333, 455, 589 ,211 , 131],
  //    totalConversion : 121213  
  // }
  
  
  return (
        <UserDetailsProvider>
            <RouterComponent/>
        </UserDetailsProvider>     

  );
}

export default App;
