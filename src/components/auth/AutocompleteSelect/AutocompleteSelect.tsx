import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import {
  stAutocompleteBase,
  stBoxAutocomplete,
  stTextFieldAutocomplete
} from '../../AddressForm/style'
interface Props {
  type: 'city' | 'office' | 'parcelLocker'
  value: string | null | undefined
  onChange: (newValue: string | null) => void
  options: {
    city?: string
    office?: string
    parcelLocker?: string
  }[]
}

const CustomAutocomplete: React.FC<Props> = ({
  type,
  value,
  onChange,
  options
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [open, setOpen] = useState(false)

  const calculateLoading = (type: 'city' | 'office' | 'parcelLocker') => {
    const optionsMap = {
      city: options[0]?.city,
      office: options[0]?.office,
      parcelLocker: options[0]?.parcelLocker
    }

    return open && !optionsMap[type]?.length
  }

  useEffect(() => {
    setOpen(false)
  }, [type])

  const calculatedLoading = calculateLoading(type)

  return (
    <Autocomplete
      disablePortal
      size="small"
      id={`combo-box-demo-${type}`}
      value={value ? { [type]: value } : null}
      onChange={(_, newValue) => {
        onChange(newValue ? newValue[type] || null : null)
      }}
      loading={calculatedLoading}
      getOptionLabel={(option) => option?.[type] || ''}
      options={options}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      sx={stAutocompleteBase}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={`Оберіть ${type === 'city' ? 'місто' : type === 'office' ? 'відділення' : 'поштомат'}`}
          sx={stTextFieldAutocomplete}
          InputProps={{
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            ...params.InputProps,
            endAdornment: (
              <Box sx={stBoxAutocomplete}>
                <Box
                  sx={{
                    transform: isFocused ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 11,
                      height: 2,
                      backgroundColor: '#567343',
                      transform: 'rotate(45deg)',
                      position: 'relative',
                      left: 2
                    }}
                  />
                  <span
                    style={{
                      display: 'inline-block',
                      width: 11,
                      height: 2,
                      backgroundColor: '#567343',
                      transform: 'rotate(135deg)',
                      position: 'relative',
                      right: 2
                    }}
                  />
                </Box>
              </Box>
            )
          }}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          style={{
            backgroundColor: selected ? '#F7F7F7' : 'inherit',
            color: '#567343'
          }}
        >
          {option?.[type] || ''}
        </li>
      )}
    />
  )
}

export default CustomAutocomplete
