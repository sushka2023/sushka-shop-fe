import { Button, styled } from '@mui/material'

export const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5
})

export const editBtnAccount = {
  'borderRadius': '20px',
  'border': 0,
  'cursor': 'pointer',
  'fontFamily': 'Open Sans',
  'fontWeight': 600,
  'fontStyle': '16px',
  'textAlign': 'center',
  'color': 'background.default',
  'padding': '21px 40px',
  'backgroundColor': 'pink.darker',
  '&.MuiButton-root:hover': {
    backgroundColor: 'error.light',
    color: 'background.default'
  }
}
export const styleBoxModalWindow = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 580,
  height: '291px',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Open Sans',
  color: '#567343'
}
export const styleBtnModalWindow = {
  'width': 250,
  'height': 50,
  'bgcolor': 'background.paper',
  'borderRadius': '10px',
  'color': '#FCC812',
  'border': '2px solid #FCC812',
  'lineHeight': '18.2px',
  'fontStyle': '14px',
  'fontFamily': 'Open Sans',
  'fontWeight': 700,
  '&:hover': {
    backgroundColor: '#FCC812',
    boxShadow: 'none',
    border: '2px solid #FCC812',
    color: 'background.default'
  }
}
export const styleBtnEditModalWindow = {
  'width': 250,
  'height': 50,
  'bgcolor': '#D21C1C',
  'borderRadius': '10px',
  'color': 'background.default',
  'border': '0',
  'lineHeight': '18.2px',
  'fontStyle': '14px',
  'fontFamily': 'Open Sans',
  'fontWeight': 700,
  '&:hover': {
    backgroundColor: '#DB4949'
  }
}

export const stBoxModalWindow = {
  width: '100%',
  maxWidth: 600,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#567343',
  padding: '30px 20px 50px 20px',
  border: 'none',
  fontFamily: 'Open Sans'
}

export const stBtnEmail = {
  'borderRadius': 3,
  'padding': '15px 80px',
  'backgroundColor': '#FCC812',
  'fontFamily': 'Open Sans',
  'fontWeight': 700,
  'fontSize': 14,
  'border': '2px solid transparent',
  'boxShadow': 'none !important',
  '&:hover': {
    backgroundColor: 'background.default',
    color: '#FCC812',
    border: '2px solid #FCC812',
    cursor: 'pointer'
  }
}

export const stLinkEmail = {
  height: 30,
  display: 'inline-block',
  alignItems: 'center',
  color: '#D21C1C'
}

export const stEmailP2 = {
  fontSize: 18,
  fontWeight: 400,
  textAlign: 'center',
  padding: '0 80px'
}

export const stIconLinkEmail = {
  fontFamily: 'Open Sans',
  borderBottom: '0.5px solid #D21C1C',
  fontSize: 18
}

export const stEmailSpan = { fontSize: '22px', fontWeight: 600 }
export const stIconEmail: React.CSSProperties = {
  marginRight: 5,
  position: 'relative',
  top: 5
}
export const stLinkEmailList = {
  marginLeft: 10,
  fontSize: 14,
  fontWeight: 600,
  borderBottom: '0.5px solid #567343',
  cursor: 'pointer'
}
export const stLinkEmailP = { fontSize: 14, fontWeight: 400, margin: '40px 0' }
