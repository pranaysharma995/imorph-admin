import React from 'react'
import {Redirect , Route} from 'react-router-dom'

const  AfterLoginRoute =(props)=> {
   if(!localStorage.getItem('user')){
        return <Route {...props} />
   }

   return <Redirect to="/dashboard" />
}

export default AfterLoginRoute
