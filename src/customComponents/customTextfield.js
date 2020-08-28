import React from 'react'

const CustomTextfield=({type , placeholder , value ,handleChange,customTextfield__input , name ,icon_class})=> {
    return (
        <div className="customTextfield">
                <input className={customTextfield__input} type={type} placeholder={placeholder} value={value} name={name} onChange={handleChange}/>
                {icon_class ? (<i className={icon_class}></i>)  : null}
        </div>
    )
}

export default CustomTextfield
