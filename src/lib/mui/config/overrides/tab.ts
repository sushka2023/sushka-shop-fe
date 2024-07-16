import { Components, Theme } from '@mui/material'
import { SEMI_BOLD_WEIGHT } from '../fonts/config'

const MuiTab: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: '20%',
      whiteSpace: 'pre-line',
      textTransform: 'none',
      color: theme.palette.secondary.darker,
      borderRadius: '1.25rem',
      fontStyle: '1.625rem',
      fontWeight: SEMI_BOLD_WEIGHT,
      height: '4rem',
      wordWrap: 'break-word',
      padding: '1.312rem 2.5rem',

      ['&.Mui-selected']: {
        color: '#FFFFFF'
      }
    })
  }
}

export { MuiTab }
