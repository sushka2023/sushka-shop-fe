import { Components, Theme } from '@mui/material'
const MuiContainer: Components<Theme>['MuiContainer'] = {
  styleOverrides: {
    root: {
      padding: '0 clamp(0.875rem, 0.429rem + 1.19vw, 1.5rem)'
    }
  }
}

export { MuiContainer }
