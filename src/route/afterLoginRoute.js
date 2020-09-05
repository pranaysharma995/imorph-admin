import React from 'react'
import {Redirect , Route} from 'react-router-dom'

const  AfterLoginRoute =(props)=> {
   if(localStorage.getItem('uid')){
         return <Route {...props} />
   }
   else if(sessionStorage.getItem('uid')){
        return <Route {...props} />
   }
   return <Redirect to="/" />
}

export default AfterLoginRoute
