import { FC, Fragment, ReactNode, SyntheticEvent } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { ListboxComponent, StyledPopper } from './VariableSizeList'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
interface AutocompleteCustomProps {
  name: string
  register: UseFormRegister<FieldValues>
  options: string[]
  onChange: (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => void
  loading: boolean
  setValueInput: (value: string) => void
  placeholder: string
  disabled?: boolean
  value?: string | null
  noOptionsText: string
}

export const AutocompleteCustom: FC<AutocompleteCustomProps> = ({
  onChange,
  placeholder,
  register,
  setValueInput,
  name,
  ...props
}) => {
  const isOptionEqualToValue = (option: any, value: string | null) => {
    return option === value || option === null || value === ''
  }

  return (
    <Autocomplete
      {...props}
      {...register(name)}
      id={name}
      sx={{ width: 400, mt: 2 }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      clearOnEscape
      onInputChange={(_, val) => setValueInput(val)}
      onChange={onChange}
      isOptionEqualToValue={isOptionEqualToValue}
      popupIcon={<ExpandMoreIcon sx={{ color: 'secondary.darker' }} />}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {props.loading && (
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
              </Fragment>
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
