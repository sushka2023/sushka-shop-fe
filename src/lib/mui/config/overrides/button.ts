import { Components, Theme } from '@mui/material'
import { BOLD_WEIGHT, OPEN_SANS } from '../fonts/config'

const MuiButtonContained: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    contained: ({ theme }) => ({
      fontFamily: OPEN_SANS,
      fontWeight: BOLD_WEIGHT,
      fontSize: '0.875rem',
      backgroundColor: theme.palette.primary.darker,
      borderRadius: '0.625rem',
      color: '#fff',
      minWidth: 'auto',
      height: '3.125rem',
      padding: '0.875rem 1.75rem',
      textTransform: 'none',
      border: '2px solid transparent',
      boxShadow: 'none',
      ['&:hover']: {
        backgroundColor: '#fff',
        border: `2px solid ${theme.palette.primary.darker}`,
        boxShadow: 'none',
        color: theme.palette.primary.darker
      },
      [`.MuiButton-endIcon`]: {
        '& > svg': {
          height: '1rem',
          width: '1rem'
        },
        'marginLeft': '0.625rem'
      },
      [`.MuiButton-startIcon`]: {
        '& > svg': {
          height: '1rem',
          width: '1rem'
        },
        'marginRight': '0.625rem'
      }
    }),
    sizeMedium: ({ theme }) => {
      return {
        borderRadius: '1.25rem',
        padding: '1.43rem 2.5rem',
        height: '3.75rem',
        ['&:hover']: {
          backgroundColor: theme.palette.primary.lighter,
          border: '2px solid transparent',
          boxShadow: 'none',
          color: theme.palette.primary.darker
        }
      }
    },
    sizeLarge: () => {
      return {
        borderRadius: '0.625rem',
        padding: '1.31rem 11.4375rem',
        height: '3.75rem'
      }
    }
  }
}

const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    ...MuiButtonContained.styleOverrides
  }
}

export { MuiButton }
