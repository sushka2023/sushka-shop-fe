import { Components, Theme } from '@mui/material'

const MuiTabs: Components<Theme>['MuiTabs'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiTabs-indicator': {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.primary.darker,
        borderRadius: '1.25rem',
        zIndex: -1
      }
    })
  }
}

export { MuiTabs }
