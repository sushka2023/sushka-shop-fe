import React, { FC } from 'react'
import { Box, FormHelperText } from '@mui/material'
import { AutocompleteForCityNP } from '../../Autocomplete/AutocompleteForCityNP'

type PropsType = {
  errors: any
  register: any
  stateRef: any
  StyledPopper: any
  ListboxComponent: any
  cityRenderArray: any
  loading: any
  setValueInput: any
  handleChange: any
}

export const NovaPoshtaPickup: FC<PropsType> = ({
  errors,
  register,
  stateRef,
  StyledPopper,
  ListboxComponent,
  cityRenderArray,
  loading,
  setValueInput,
  handleChange
}) => {
  return (
    <Box sx={{ p: '5px 0' }}>
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
    </Box>
  )
}
