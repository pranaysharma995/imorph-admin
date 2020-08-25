import React from 'react'

const CustomButton=({customButton__class , handleClick , icon , text , type}) =>{
    return (
        <div className="customButton">
            <button type={type} className={customButton__class} onClick={handleClick}>
                {icon ? icon : null}
                {text}</button>
        </div>
    )
}

export default CustomButton;
