import React,{useState} from 'react'
import Context from './adminDetailsContext'


const AdminDetailsProvider = (props) => {

    const [adminData , setAdminData] = useState(null);

    return (
        <Context.Provider value={{adminData , setAdminData}}>
            {props.children}
        </Context.Provider>
    )
}

export default AdminDetailsProvider
