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

export const stItem = {
  width: 300,
  height: 180,
  boxShadow: 'none',
  borderRadius: 5,
  padding: 0
}
export const stDeleteIcon = {
  position: 'absolute',
  top: -14,
  right: -14,
  width: 25,
  height: 25,
  backgroundColor: '#FED9DD',
  borderRadius: 20,
  padding: 1,
  color: '#D21C1C'
}
export const stContainerAddress = {
  display: 'flex',
  alignItems: 'center',
  color: '#567343',
  padding: 2
}
export const stTypographyBody1Address = {
  fontSize: 22,
  fontWeight: 600,
  fontFamily: 'Open Sans'
}
export const stTypographyBody2Address = {
  fontSize: 16,
  fontFamily: 'Open Sans',
  textAlign: 'start',
  fontWeight: 400
}

export const stTypographyBody1 = {
  fontSize: 16,
  fontWeight: 400,
  fontFamily: 'Open Sans',
  color: '#567343',
  textAlign: 'start',
  margin: '0 15px'
}
export const stBtn = {
  width: 222,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#567343',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  borderRadius: 5,
  boxShadow: 'none',
  fontFamily: 'Open Sans',
  fontWeight: 400,
  fontSize: 18,
  paddingRight: 1,
  [`&:hover`]: {
    backgroundColor: '#FFFFFF',
    color: '#9AAB8E',
    boxShadow: 'none'
  }
}
export const stTypographyBody2 = {
  fontFamily: 'Open Sans',
  fontWeight: 400,
  fontSize: 18,
  margin: '20px 0 45px 0'
}

export const stIconM = { margin: '10px 20px 10px 10px' }
