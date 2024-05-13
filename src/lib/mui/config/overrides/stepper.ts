import { Components, Theme } from '@mui/material'
import { SEMI_BOLD_WEIGHT } from '../fonts/config'

const MuiStepper: Components<Theme>['MuiStepper'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      'gap': '20px',
      ['& .MuiStep-root']: {
        padding: 0
      },
      ['& .MuiStepConnector-root']: {
        flex: 'none',
        width: '1.563rem'
      },
      ['& .MuiStepLabel-iconContainer']: {
        paddingRight: '1.25rem'
      },
      '& .MuiStepIcon-root.Mui-active': {
        color: theme.palette.primary.darker,
        width: '2.5rem',
        height: '2.5rem'
      },
      ['.MuiStepIcon-root']: {
        width: '2.5rem',
        height: '2.5rem',
        color: theme.palette.grey[100]
      },
      ['.MuiStepIcon-root.Mui-completed']: {
        color: theme.palette.primary.darker
      },
      ['& .MuiStepLabel-label.Mui-active']: {
        fontWeight: SEMI_BOLD_WEIGHT,
        fontSize: '1.125rem',
        color: theme.palette.primary.darker
      },
      ['& .MuiStepLabel-label']: {
        fontWeight: SEMI_BOLD_WEIGHT,
        fontSize: '1.125rem',
        color: theme.palette.grey[400]
      },
      ['& .MuiStepLabel-label.Mui-completed']: {
        fontWeight: SEMI_BOLD_WEIGHT,
        color: theme.palette.primary.darker
      },
      ['& .MuiStepIcon-text']: {
        fill: 'white',
        fontSize: '0.85rem'
      }
    })
  }
}

export { MuiStepper }
