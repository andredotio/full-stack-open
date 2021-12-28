import React from 'react'

const Button = ({ text, type, handleClick}) => {
    return (
        <button onClick={handleClick} type={type}>{text}</button>
    )
}

export default Button