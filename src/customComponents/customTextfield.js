import React from 'react'

const CustomTextfield=({type , placeholder , value ,handleChange,customTextfield__input , name ,icon_class , handleIconClick})=> {
    return (
        <div className="customTextfield" style={{position : 'relative'}}>
                <input className={customTextfield__input} type={type} placeholder={placeholder} value={value} name={name} onChange={handleChange}/>
                {icon_class ? (<i  style={{color :"#707070"}} className={icon_class} onClick={handleIconClick}></i>)  : null}
        </div>
    )
}

export default CustomTextfield
