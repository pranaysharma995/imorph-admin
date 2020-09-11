import React from 'react';
import RouterComponent from './router/routerComponent'
import UserDetailsProvider from './context/user/userDetailsProvider'
import UserSubscriptionProvider from './context/user-subscription/userSubscriptionProvider'

const App=()=> {
  
  return (
       <UserSubscriptionProvider>
          <UserDetailsProvider>
              <RouterComponent />
          </UserDetailsProvider> 
       </UserSubscriptionProvider>    

  );
}

export default App;
