import React,{useState} from 'react'
import Context from './imageSettingsContext'

const ImageSettingsProvider = (props) => {

    const [imageSettings , setImageSettings] = useState(null)

    return (
        <Context.Provider value={{imageSettings , setImageSettings}}>
            {props.children}
        </Context.Provider>
    )
}

export default ImageSettingsProvider
