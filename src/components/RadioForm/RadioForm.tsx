import React, { FC, ReactNode } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText
} from '@mui/material'
import Typography from '@mui/material/Typography'
import {
  ListboxComponent,
  StyledPopper
} from '../Autocomplete/VariableSizeList'
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form'
import { AutocompleteForCityNP } from '../Autocomplete/AutocompleteForCityNP'
import { useAutocompleteCityLogic } from './FunctionalityForNovaPoshtaPickup'
import { NovaPoshtaPickup } from './Form/NovaPoshtaPickup'

interface FormValues {
  pickupNP: string
}

type PropsType = {
  children: ReactNode
  register: UseFormRegister<FormValues>
  setValue: UseFormSetValue<FormValues>
  errors: FieldErrors<FormValues>
}

export const RadioForm: FC<PropsType> = ({
  children,
  register,
  setValue,
  errors
}) => {
  const {
    selectedValue,
    setSelectedValue,
    setValueInput,
    loading,
    cityRenderArray,
    handleChange,
    stateRef
  } = useAutocompleteCityLogic(setValue)

  return (
    <React.Fragment>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        sx={{
          '& .MuiFormControlLabel-label': {
            cursor: 'pointer'
          },
          '& .MuiFormControlLabel-root:hover': {
            cursor: 'default'
          }
        }}
      >
        <FormControlLabel
          value="female"
          control={<Radio />}
          label="Нова пошта (самовивіз)"
        />
        {selectedValue === 'female' && (
          <NovaPoshtaPickup
            errors={errors}
            register={register}
            stateRef={stateRef}
            StyledPopper={StyledPopper}
            ListboxComponent={ListboxComponent}
            cityRenderArray={cityRenderArray}
            loading={loading}
            setValueInput={setValueInput}
            handleChange={handleChange}
          />
        )}

        <FormControlLabel
          value="male"
          control={<Radio />}
          label="Нова пошта (адресна)"
        />
        {selectedValue === 'male' && (
          <React.Fragment>
            {errors.pickupNP && (
              <FormHelperText
                sx={{
                  color: 'error.darker',
                  fontWeight: 500
                }}
              >
                {errors.pickupNP?.message}
              </FormHelperText>
            )}
            <AutocompleteForCityNP
              register={register}
              stateRef={stateRef}
              StyledPopper={StyledPopper}
              ListboxComponent={ListboxComponent}
              cityRenderArray={cityRenderArray}
              loading={loading}
              setValueInput={setValueInput}
              handleChange={handleChange}
            />
          </React.Fragment>
        )}

        <FormControlLabel value="other" control={<Radio />} label="Укрпошта" />
        {selectedValue === 'other' && (
          <Typography>Additional text for Other option</Typography>
        )}
      </RadioGroup>
      {children}
    </React.Fragment>
  )
}
