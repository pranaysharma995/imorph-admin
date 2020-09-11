import React, {useState} from 'react'
import Context from './userSubcriptionContext'

const UserSubscriptionProvider = (props) => {

    const [subscription, setSubscription] = useState(null)

    return (
        <Context.Provider value={
            {subscription, setSubscription}
        }>
            {
            props.children
        } </Context.Provider>
    )
}

export default UserSubscriptionProvider
