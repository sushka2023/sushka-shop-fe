import { Components, Theme } from '@mui/material'

const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  styleOverrides: {
    root: () => {
      return {
        ['&.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-root .MuiOutlinedInput-root']:
          {
            padding: 0
          },
        ['&.MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input']:
          {
            padding: '0.9rem 1.2rem'
          }
      }
    }
  }
}

export { MuiAutocomplete }
