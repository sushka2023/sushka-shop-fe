import { Components, Theme } from '@mui/material'
import { BOLD_WEIGHT, OPEN_SANS } from '../fonts/config'

const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontFamily: OPEN_SANS,
      fontWeight: BOLD_WEIGHT,
      fontSize: '1rem',
      backgroundColor: 'inherit',
      borderRadius: '0.625rem',
      padding: '1rem 1.875rem',
      ['&:hover']: {
        backgroundColor: theme.palette.primary.darker,
        border: `2px solid ${theme.palette.primary.darker}`,
        boxShadow: 'none',
        color: '#fff'
      },
      color: theme.palette.primary.darker,
      minWidth: 'auto',
      height: '3.125rem',
      border: `2px solid ${theme.palette.primary.darker}`,
      boxShadow: 'none',
      ['&.Mui-disabled']: {
        cursor: 'not-allowed',
        backgroundColor: theme.palette.grey[200],
        border: `2px solid ${theme.palette.grey[200]}`,
        color: '#fff'
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

export { MuiButton }
