// LabelCustom.tsx
import React from 'react'

interface LabelProps {
  htmlFor: string
  style?: React.CSSProperties
  errorStyle?: React.CSSProperties // New prop for error style
  hasError?: boolean // New prop to indicate if there's an error
  children: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  style,
  errorStyle,
  hasError
}) => {
  const labelStyle = hasError ? { ...style, ...errorStyle } : style
  return (
    <label htmlFor={htmlFor} style={labelStyle}>
      {children}
    </label>
  )
}
