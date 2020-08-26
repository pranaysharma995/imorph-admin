import React from 'react'

const CustomButton=({customButton__class , handleClick , icon , text , type ,disabled}) =>{
    return (
        <div className="customButton">
            <button type={type} className={customButton__class} onClick={handleClick} disabled={disabled}>
                {icon ? icon : null}
                {text}</button>
        </div>
    )
}

export default CustomButton;
