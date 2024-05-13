import { Components, Theme } from '@mui/material'

const MuiInputLabel: Components<Theme>['MuiInputLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.secondary.main,
      marginBottom: '0.5rem'
    })
  }
}

export { MuiInputLabel }
