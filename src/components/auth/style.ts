import { Button, styled } from '@mui/material'

export const styleLabel: React.CSSProperties = {
  color: '#567343',
  fontSize: 14,
  position: 'relative',
  bottom: 8
}

export const styleInput: React.CSSProperties = {
  'display': 'block',
  'width': 330,
  'height': 40,
  'color': '#567343',
  'border': 'none',
  'outline': 'none',
  'borderRadius': 8,
  'backgroundColor': '#FFFFFF',
  'padding': '5px 15px',
  '& ::placeholder': {
    color: 'blue'
  }
}

export const styleBoxInput: React.CSSProperties = {
  width: 330,
  margin: '20px 0',
  display: 'inline-block'
}

export const styleInputError: React.CSSProperties = {
  border: '1px solid #D21C1C'
}

export const stH3 = {
  fontFamily: 'Comfortaa',
  fontSize: '32px',
  fontWeight: 500
}

export const stP = {
  fontFamily: 'Open Sans',
  fontSize: '18px',
  fontWeight: 300
}

export const BootstrapButton = styled(Button)({
  'boxShadow': 'none',
  'textTransform': 'none',
  'fontSize': 16,
  'padding': '6px 12px',
  'border': '1px solid',
  'lineHeight': 1.5,
  'fontFamily': [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf'
  }
})

export const styleBoxModalWindow = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#567343',
  padding: '40px 0'
}
export const styleBtnModalWindow = {
  'width': 250,
  'height': 50,
  'bgcolor': 'background.paper',
  'borderRadius': '10px',
  'border': '2px solid #FCC812',
  'lineHeight': '18.2px',
  'backgroundColor': '#FCC812',
  'color': '#FFFFFF',
  'textTransform': 'uppercase',
  '&:hover': {
    backgroundColor: '#FCC812',
    boxShadow: 'none',
    border: '2px solid #FCC812'
  }
}
