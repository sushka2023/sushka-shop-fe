import { Dispatch, FC, Fragment } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  useTheme
} from '@mui/material'
import { NovaPoshtaBranch } from './BranchesNP'
import { NovaPoshtaPostomats } from './PostomatsNP'
import { AddressNP } from './AddressNP'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormClearErrors,
  FieldValues,
  UseFormSetError
} from 'react-hook-form'

type RadioFormProps = {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors
  clearErrors: UseFormClearErrors<FieldValues>
  selectedValue: string
  setError: UseFormSetError<FieldValues>
  setSelectedValue: Dispatch<string>
}

export type FormProps = Omit<RadioFormProps, 'children' | 'setSelectedValue'>

export const RadioForm: FC<RadioFormProps> = ({
  register,
  setValue,
  errors,
  setError,
  clearErrors,
  selectedValue,
  setSelectedValue
}) => {
  const theme = useTheme()
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
          label={
            <Typography sx={{ pointerEvents: 'auto' }}>
              Нова пошта (відділення)
            </Typography>
          }
          sx={{
            pointerEvents: 'none',
            [theme.breakpoints.down('sm')]: {
              pointerEvents: 'auto',
              p: '5px 0'
            }
          }}
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
          label={
            <Typography sx={{ pointerEvents: 'auto' }}>
              Нова пошта (поштомат)
            </Typography>
          }
          sx={{
            pointerEvents: 'none',
            [theme.breakpoints.down('sm')]: {
              pointerEvents: 'auto'
            }
          }}
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
          label={
            <Typography sx={{ pointerEvents: 'auto' }}>
              Нова пошта (адресна)
            </Typography>
          }
          sx={{
            pointerEvents: 'none',
            [theme.breakpoints.down('sm')]: {
              pointerEvents: 'auto',
              p: '5px 0'
            }
          }}
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

        <FormControlLabel
          value="urkPoshta"
          control={<Radio />}
          label={
            <Typography sx={{ pointerEvents: 'auto' }}>Укрпошта</Typography>
          }
          sx={{
            pointerEvents: 'none',
            [theme.breakpoints.down('sm')]: {
              pointerEvents: 'auto',
              p: '5px 0'
            }
          }}
        />
        {selectedValue === 'urkPoshta' && <Typography>Urk</Typography>}
      </RadioGroup>
    </Fragment>
  )
}
