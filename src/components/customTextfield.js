import React from 'react'

const CustomTextfield=({type , placeholder , value ,handleChange,customTextfield__input})=> {
    return (
        <div className="customTextfield">
                <input className={customTextfield__input} type={type} placeholder={placeholder} value={value}  onChange={handleChange}/>
        </div>
    )
}

export default CustomTextfield
