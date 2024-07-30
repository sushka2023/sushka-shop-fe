import { Components, Theme } from '@mui/material'
import { BOLD_WEIGHT, OPEN_SANS, MEDIUM_WEIGHT } from '../fonts/config'

const MuiButtonOutlined: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    outlined: ({ theme }) => ({
      fontFamily: OPEN_SANS,
      fontWeight: BOLD_WEIGHT,
      fontSize: '1rem',
      backgroundColor: 'inherit',
      borderRadius: '0.625rem',
      padding: '0.875rem 1.75rem',
      ['&:hover']: {
        backgroundColor: theme.palette.primary.darker,
        border: `2px solid ${theme.palette.primary.darker}`,
        boxShadow: 'none',
        color: '#fff'
      },
      color: theme.palette.primary.darker,
      minWidth: 'auto',
      border: `2px solid ${theme.palette.primary.darker}`,
      boxShadow: 'none',
      ['&.Mui-disabled']: {
        cursor: 'not-allowed',
        backgroundColor: theme.palette.grey[200],
        border: `2px solid ${theme.palette.grey[200]}`,
        color: '#fff'
      },
      [theme.breakpoints.down('sm')]: {
        borderRadius: '1.25rem'
      }
    })
  }
}

const MuiButtonText: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    text: ({ theme }) => ({
      padding: '0.875rem 1.75rem',
      fontFamily: OPEN_SANS,
      fontWeight: MEDIUM_WEIGHT,
      border: 'none',
      fontSize: '0.875rem',
      letterSpacing: 'normal',
      textTransform: 'none',
      color: theme.palette.secondary.darker,
      ['&:hover']: {
        border: 'none',
        backgroundColor: 'inherit',
        color: theme.palette.secondary.darker
      },
      ['&.Mui-disabled']: {
        border: 'none',
        backgroundColor: 'inherit',
        color: theme.palette.grey[200]
      }
    })
  }
}

const MuiButtonContained: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    contained: ({ theme }) => ({
      padding: '0.875rem 1.75rem',
      borderRadius: '0.625rem',
      boxShadow: 'none',
      fontFamily: OPEN_SANS,
      fontWeight: BOLD_WEIGHT,
      fontSize: '1rem',
      border: `2px solid ${theme.palette.primary.darker}`,
      letterSpacing: 'normal',
      color: '#fff',
      backgroundColor: theme.palette.primary.darker,
      ['&:hover']: {
        backgroundColor: '#fff',
        border: `2px solid ${theme.palette.primary.darker}`,
        boxShadow: 'none',
        color: theme.palette.primary.darker
      },
      ['&.Mui-disabled']: {
        border: 'none',
        backgroundColor: 'inherit',
        color: theme.palette.grey[200]
      },
      [theme.breakpoints.down('sm')]: {
        borderRadius: '1.25rem'
      }
    }),
    sizeSmall: ({ theme }) => ({
      borderRadius: '1.25rem',
      padding: '0.6rem 1.25rem',
      height: '2.5rem',
      ['&:hover']: {
        backgroundColor: theme.palette.primary.lighter,
        border: '2px solid transparent',
        boxShadow: 'none',
        color: theme.palette.primary.darker
      }
    })
  }
}

const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    ...MuiButtonOutlined.styleOverrides,
    ...MuiButtonText.styleOverrides,
    ...MuiButtonContained.styleOverrides
  }
}

export { MuiButton }
