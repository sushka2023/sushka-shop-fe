import React, { FC, ReactNode } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { ListboxComponent, StyledPopper } from './VariableSizeList'

type PropsType = {
  name: string
  placeholder?: string
  register: (name: string) => any
  options: string[]
  onChange: (event: any, value: string) => void
  loading: boolean
  setValueInput: (value: string) => void
  errors: any
  disabled?: any
  val?: any
  optionsText: any
}

export const AutocompleteCustom: FC<PropsType> = ({
  name,
  register,
  options,
  onChange,
  loading,
  setValueInput,
  errors,
  placeholder,
  disabled,
  val,
  optionsText
}) => {
  const isOptionEqualToValue = (option: any, value: string | null) => {
    return option === value || option === null || value === ''
  }
  return (
    <Autocomplete
      {...register(name)}
      id="name"
      value={val}
      sx={{ width: 300, mt: 2 }}
      disableListWrap
      onError={errors[name] ? () => {} : undefined}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={options}
      loading={loading}
      disabled={disabled}
      clearOnEscape
      noOptionsText={optionsText}
      onInputChange={(_, val) => setValueInput(val)}
      onChange={onChange}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && (
                  <CircularProgress
                    color="inherit"
                    size={23}
                    sx={{
                      position: 'absolute',
                      right: 35,
                      color: 'sapphire.dark'
                    }}
                  />
                )}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
      renderOption={(props, option, state) =>
        [props, option, state.index] as ReactNode
      }
      renderGroup={(params) => params as any}
    />
  )
}
