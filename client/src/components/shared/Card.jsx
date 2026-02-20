import React from 'react'

const Card = ({ children, title, footer, divider, noPadding, className = '', ...props }) => {
    return (
        <div className={`bg-white shadow-lg ${noPadding ? '' : 'px-5 py-4'} rounded-lg border border-gray-100 ${className}`} {...props}>
            {title && <h1 className='text-lg font-semibold capitalize'>{title}</h1>}
            {divider && <div className='border-b border-b-gray-100 -mx-5 my-4' />}
            {children && <div className='text-gray-500'>{children}</div>}
            {footer && <div className='mt-4'>{footer}</div>}
        </div>
    )
}

export default Card