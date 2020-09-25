import React,{useEffect} from 'react';
import RouterComponent from './router/routerComponent'
import UserDetailsProvider from './context/user/userDetailsProvider'
import UserSubscriptionProvider from './context/user-subscription/userSubscriptionProvider'
import AdminDetailsProvider from './context/admin/adminDetailsProvider'
import ImageSettingsProvider  from './context/imageSettings/imageSettingsProvider'
import axiosInstance from './axios'

const App=()=> {

  useEffect(() => {
    axiosInstance.get("/admin/image-setting/view",{
      headers : {authorization : `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`}
  }).then(({data}) => {

      console.log("Image settings" , data?.data[0]);
      const favicon = document.getElementById("favicon"); // Accessing favicon element
      favicon.href = `http://ec2-34-209-115-216.us-west-2.compute.amazonaws.com/imorph-api/public/image-setting/${data?.data[0]?.fevicon}`;
  }).catch(error => {
      console.log("Error in routerComponent", error);
  })
    
  }, [])
  
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
