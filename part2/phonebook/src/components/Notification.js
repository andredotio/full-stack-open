import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes('added') || message.includes('updated')) {
        return (
            <div className='added-updated-notif'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='error-notif'>
                {message}
            </div>
        )
    }
}

export default Notification