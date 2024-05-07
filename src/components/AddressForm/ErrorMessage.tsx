import React from 'react'
import { FieldErrors, get } from 'react-hook-form'
import { FormValue } from './AddressForm'

type Errors = FieldErrors<FormValue> | null

type ErrorProps = {
  errors: Errors
  fields: Array<keyof FormValue>
}

export const ErrorMessages: React.FC<ErrorProps> = ({ errors, fields }) => {
  if (!errors) return null

  const errorField = fields.find((field) => {
    const errorMessage = get(errors, field)?.message
    return errorMessage
  })

  if (errorField) {
    const errorMessage = get(errors, errorField)?.message
    return <p style={{ color: 'red' }}>{errorMessage}</p>
  }
}
