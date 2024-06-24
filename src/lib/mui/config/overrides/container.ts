import { Components, Theme } from '@mui/material'
const MuiContainer: Components<Theme>['MuiContainer'] = {
  styleOverrides: {
    root: {
      padding: '0 clamp(0.938rem, -0.179rem + 2.98vw, 2.5rem) !important'
    }
  }
}

export { MuiContainer }
