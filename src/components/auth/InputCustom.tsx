import { Box } from '@mui/material'
import React from 'react'

interface InputProps {
  name: string
  label: string
  type?: 'text' | 'password' | 'tel'
  htmlFor: string
  style?: React.CSSProperties
  yourStBox?: React.CSSProperties
  yourStInput?: React.CSSProperties
  yourStLabel?: React.CSSProperties
}

export const CustomInput: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  htmlFor,
  yourStBox,
  yourStInput,
  yourStLabel
}) => {
  const styleLabel: React.CSSProperties = {
    color: '#567343',
    fontSize: 14,
    opacity: 0.6,
    position: 'relative',
    bottom: 8
  }

  const styleInput: React.CSSProperties = {
    display: 'block',
    width: 330,
    height: 44,
    color: '#567343',
    border: 'none',
    outline: 'none',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: '5px 15px'
  }

  const styleBoxInput: React.CSSProperties = {
    width: 330,
    margin: '20px 0',
    display: 'inline-block'
  }

  return (
    <Box sx={{ ...styleBoxInput, ...yourStBox }}>
      <label style={{ ...styleLabel, ...yourStLabel }} htmlFor={htmlFor}>
        {label}
      </label>
      <input
        style={{ ...styleInput, ...yourStInput }}
        type={type}
        id={htmlFor}
        name={name}
      ></input>
    </Box>
  )
}
