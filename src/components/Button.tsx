import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-500 border border-primary',
  secondary: 'bg-secondary text-white hover:bg-orange-600 border border-secondary',
  success: 'bg-green-600 text-white hover:bg-green-700 border border-green-600',
  danger: 'bg-red-600 text-white hover:bg-red-700 border border-red-600',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700 border border-yellow-600',
  info: 'bg-blue-500 text-white hover:bg-blue-600 border border-blue-500',
  outline: 'bg-white text-primary hover:text-white hover:bg-primary border border-primary/60',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border border-gray-300',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-2 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantStyle = variantStyles[variant]
  const sizeStyle = sizeStyles[size]
  const widthStyle = fullWidth ? 'w-full justify-center' : ''
  const disabledStyle = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && !loading && <span>{icon}</span>}
      {loading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && !loading && <span>{icon}</span>}
    </>
  )

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${disabledStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </button>
  )
}
