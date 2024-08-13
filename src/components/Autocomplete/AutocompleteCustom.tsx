import { FC, Fragment, ReactNode } from 'react'
import {
  Autocomplete,
  CircularProgress,
  TextField,
  useTheme
} from '@mui/material'
import { ListboxComponent, StyledPopper } from './VariableSizeList'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
type Props = {
  name: string
  register: UseFormRegister<FieldValues>
  options: string[]
  loading: boolean
  setValueInput: (value: string) => void
  placeholder: string
  disabled?: boolean
  value?: string | null
  noOptionsText: string
  onChange: (value: string | null) => void
}

export const AutocompleteCustom: FC<Props> = ({
  onChange,
  placeholder,
  register,
  setValueInput,
  name,
  ...props
}) => {
  const theme = useTheme()
  const isOptionEqualToValue = (
    option: string | null,
    value: string | null
  ) => {
    return option === value || option === null || value === ''
  }

  return (
    <Autocomplete
      {...props}
      {...register(name)}
      id={name}
      sx={{
        width: 400,
        mt: 2,
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        }
      }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      clearOnEscape
      onInputChange={(_, val) => setValueInput(val)}
      onChange={(_, value) => onChange(value)}
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
