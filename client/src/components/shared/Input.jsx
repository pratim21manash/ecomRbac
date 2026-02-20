import React from 'react';

const Input = ({
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    className = '',
    ...props
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
            {...props}
        />
    );
};

export default Input;