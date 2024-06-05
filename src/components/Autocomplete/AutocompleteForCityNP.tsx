import React, { FC, ReactNode, Ref } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { UseFormRegister } from 'react-hook-form'

interface FormValues {
  pickupNP: string
}

interface AutocompleteForCityNPProps {
  register: UseFormRegister<FormValues>
  stateRef: Ref<any>
  StyledPopper: React.ComponentType<any>
  ListboxComponent: React.ComponentType<any>
  cityRenderArray: string[]
  loading: boolean
  handleChange: any
  setValueInput: any
}

const stLoading = {
  position: 'absolute',
  right: 35,
  color: 'sapphire.dark'
}

export const AutocompleteForCityNP: FC<AutocompleteForCityNPProps> = ({
  register,
  stateRef,
  StyledPopper,
  ListboxComponent,
  cityRenderArray,
  loading,
  handleChange,
  setValueInput
}) => {
  return (
    <Autocomplete
      {...register('pickupNP')}
      ref={stateRef}
      id="virtualize-demo1"
      sx={{ width: 350 }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={cityRenderArray}
      loading={loading}
      noOptionsText="Немає варіантів"
      onInputChange={(_, val) => {
        setValueInput(val)
      }}
      onChange={(_, value: string | null) => handleChange(value)}
      renderGroup={(params: any) => params}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Оберіть місто"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={23} sx={stLoading} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
      renderOption={(props, option, state) =>
        [props, option, state.index] as ReactNode
      }
    />
  )
}
