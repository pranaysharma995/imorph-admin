import React,{useState} from 'react'
import Context from './userDetailsContext'

const UserDetailsProvider =(props)=> {
    const [user , setUser] = useState(null)
    return (
        <Context.Provider value={{user , setUser}}>
            {props.children}
        </Context.Provider>
    )
}

export default UserDetailsProvider;
