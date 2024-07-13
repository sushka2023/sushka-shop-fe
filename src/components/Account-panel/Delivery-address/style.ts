import { Theme } from '@mui/material'

export const stCard = {
  height: '180px',
  position: 'relative',
  backgroundColor: 'background.default',
  margin: '10px 0',
  padding: '25px 15px',
  borderRadius: 7
}
export const stDeleteBtn = {
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
