import React from 'react';
import RouterComponent from './router/routerComponent'
import UserDetailsProvider from './context/user/userDetailsProvider'
import UserSubscriptionProvider from './context/user-subscription/userSubscriptionProvider'
import AdminDetailsProvider from './context/admin/adminDetailsProvider'

const App=()=> {
  
  return (
       <AdminDetailsProvider>
         <UserSubscriptionProvider>
          <UserDetailsProvider>
              <RouterComponent />
          </UserDetailsProvider> 
         </UserSubscriptionProvider> 
       </AdminDetailsProvider>   

  );
}

export default App;
