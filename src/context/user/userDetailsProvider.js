import React,{useState} from 'react'
import Context from './userDetailsContext'

const UserDetailsProvider =(props)=> {
    const [userDetails , setUserDetails] = useState(null)
    return (
        <Context.Provider value={{userDetails , setUserDetails}}>
            {props.children}
        </Context.Provider>
    )
}

export default UserDetailsProvider;
