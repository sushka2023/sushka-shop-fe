import { FC, Fragment, ReactNode } from 'react'
import { Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material'
import { NovaPoshtaBranch } from './BranchesNP'
import { NovaPoshtaPostomats } from './PostomatsNP'
import { AddressNP } from './AddressNP'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormClearErrors,
  FieldValues
} from 'react-hook-form'

type RadioFormProps = {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors
  clearErrors: UseFormClearErrors<FieldValues>
  children: ReactNode
  selectedValue: string
  setError: any
  setSelectedValue: (value: string) => void
}
export type FormProps = Omit<RadioFormProps, 'children' | 'setSelectedValue'>

export const RadioForm: FC<RadioFormProps> = ({
  register,
  setValue,
  errors,
  setError,
  clearErrors,
  selectedValue,
  setSelectedValue,
  children
}) => {
  return (
    <Fragment>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <FormControlLabel
          value="novaPoshtaBranches"
          control={<Radio />}
          label="Нова пошта (відділення)"
        />
        {selectedValue === 'novaPoshtaBranches' && (
          <NovaPoshtaBranch
            selectedValue={selectedValue}
            errors={errors}
            setError={setError}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        )}

        <FormControlLabel
          value="novaPoshtaPostomats"
          control={<Radio />}
          label="Нова пошта (поштомат)"
        />
        {selectedValue === 'novaPoshtaPostomats' && (
          <NovaPoshtaPostomats
            selectedValue={selectedValue}
            errors={errors}
            setError={setError}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        )}

        <FormControlLabel
          value="novaPoshtaAddress"
          control={<Radio />}
          label="Нова пошта (адресна)"
        />
        {selectedValue === 'novaPoshtaAddress' && (
          <AddressNP
            selectedValue={selectedValue}
            errors={errors}
            setError={setError}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
          />
        )}

        <FormControlLabel value="other" control={<Radio />} label="Інше" />
        {selectedValue === 'other' && (
          <Typography>Додатковий текст для варіанту </Typography>
        )}
      </RadioGroup>
      {children}
    </Fragment>
  )
}
