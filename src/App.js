import React from 'react';
import RouterComponent from './router/routerComponent'
import UserDetailsProvider from './context/user/userDetailsProvider'
import UserSubscriptionProvider from './context/user-subscription/userSubscriptionProvider'
import AdminDetailsProvider from './context/admin/adminDetailsProvider'
import ImageSettingsProvider  from './context/imageSettings/imageSettingsProvider'

const App=()=> {
  
  return (
    <ImageSettingsProvider>
       <AdminDetailsProvider>
            <UserSubscriptionProvider>
              <UserDetailsProvider>
              <RouterComponent />
          </UserDetailsProvider> 
         </UserSubscriptionProvider> 
       </AdminDetailsProvider>
    </ImageSettingsProvider>
          

  );
}

export default App;
