import React from 'react'

const CustomTextfield=({type , placeholder , value ,handleChange,customTextfield__input , name})=> {
    return (
        <div className="customTextfield">
                <input className={customTextfield__input} type={type} placeholder={placeholder} value={value} name={name} onChange={handleChange}/>
        </div>
    )
}

export default CustomTextfield
