import React from 'react'
import { FieldErrors, get } from 'react-hook-form'
import { FormValue } from './AddressForm'

type Errors = FieldErrors<FormValue> | null

type ErrorProps = {
  errors: Errors
  fields: Array<keyof FormValue>
}

export const ErrorMessages: React.FC<ErrorProps> = ({ errors, fields }) => {
  if (errors) {
    for (const field of fields) {
      const errorMessage = get(errors, field)?.message
      if (errorMessage) {
        return <p style={{ color: 'red' }}>{errorMessage}</p>
      }
    }
  }
  return null
}
