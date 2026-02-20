const Button = ({
    children,
    onClick,
    type = "primary",
    disabled = false,
    icon,
    className = '',
    ...props
}) => {
    const baseClasses = 'px-4 py-2 rounded font-medium transition duration-200 flex items-center gap-2'

     const typeClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
        success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-yellow-300',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100'
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${typeClasses[type]} ${className}`}
            {...props}
        >
            {icon && <i className={`ri-${icon}`}></i>}
            {children}
        </button>
    )
}

export default Button