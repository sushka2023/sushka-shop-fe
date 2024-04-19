import { Button, styled } from '@mui/material'

export const ContactInfoBtn = styled(Button)({
  'width': 200,
  'height': 50,
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
    backgroundColor: '',
    border: 'rgba(252, 200, 18, 0.8)',
    boxShadow: 'none'
  }
})
export const DelivetyAddressBtn = styled(Button)({
  'width': 300,
  'height': 50,
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
    backgroundColor: '#FFFFFF',
    color: '#FCC812',
    border: '2px solid rgba(252, 200, 18, 0.8)',
    boxShadow: 'none'
  }
})
