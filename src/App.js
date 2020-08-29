import React from 'react';
import RouterComponent from './router/routerComponent'
import UserDetailsProvider from './context/user/userDetailsProvider'

const App=()=> {

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
