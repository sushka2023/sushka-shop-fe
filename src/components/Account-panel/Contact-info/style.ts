import { Button, styled } from '@mui/material'

export const BootstrapButton = styled(Button)({
  'width': 200,
  'height': 50,
  'padding': '15px 30px',
  'borderRadius': 10,
  'color': '#FFFFFF',
  'backgroundColor': '#FCC812',
  'border': 'none',
  'cursor': 'pointer',
  'marginTop': 20,
  'fontSize': 14,
  'fontWeight': 700,
  'fontFamily': 'Open Sans',
  'boxShadow': 'none',
  'transition': 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(252, 200, 18, 0.8)',
    boxShadow: 'none'
  }
})
