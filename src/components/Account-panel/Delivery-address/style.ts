import { Theme } from '@mui/material/styles'

export const stCard = (theme: Theme) => {
  return {
    minHeight: '100px',
    position: 'relative',
    backgroundColor: 'background.default',
    padding: '20px 12px',
    borderRadius: 7,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 2
    }
  }
}

export const stDeleteBtn = (theme: Theme) => {
  return {
    'position': 'absolute',
    'top': -15,
    'right': -15,
    'backgroundColor': 'error.lighter',
    'borderRadius': '50%',
    'color': 'error.darker',
    'padding': 1,
    '&:hover': {
      backgroundColor: 'error.lighter',
      color: 'error.darker',
      opacity: 0.8
    },
    '&.Mui-disabled': {
      backgroundColor: 'error.lighter',
      color: 'error.darker',
      opacity: 0.5
    },
    [theme.breakpoints.down('sm')]: {
      top: -10,
      right: -5
    }
  }
}

export const stAddBtn = (theme: Theme) => ({
  'padding': '10px 30px',
  'backgroundColor': 'background.default',
  'borderRadius': 20,
  'fontWeight': 500,
  'fontSize': 18,
  'mt': 2,
  '&:hover': {
    backgroundColor: 'background.default',
    color: 'secondary.main'
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[200],
    color: 'background.default'
  }
})
