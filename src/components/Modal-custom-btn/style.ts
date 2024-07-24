import { Theme } from '@mui/material'

export const btnEditAccount = {
  'marginLeft': 'auto',
  'borderRadius': '20px',
  'cursor': 'pointer',
  'fontFamily': 'Open Sans',
  'fontWeight': 600,
  'fontStyle': '16px',
  'color': 'background.default',
  'padding': '21px clamp(1.25rem, 0.355rem + 2.38vw, 2.5rem)',
  'bgcolor': 'pink.darker',
  '&.MuiButton-root:hover': {
    bgcolor: 'error.light',
    color: 'background.default'
  }
}

export const btnEditModWin = {
  '&.MuiButton-root': {
    bgcolor: 'error.darker',
    color: 'background.default',
    border: 'none'
  },
  '&:hover': {
    bgcolor: 'error.dark',
    color: 'background.default'
  },
  '&.Mui-disabled': {
    bgcolor: 'error.dark',
    color: 'background.default'
  }
}

export const boxModWin = (theme: Theme) => {
  return {
    width: '100%',
    heignt: 'auto',
    maxWidth: 520,
    maxHeight: '95%',

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'secondary.darker',
    border: 'none',
    fontFamily: 'Open Sans',
    boxSizing: 'border-box',
    p: '50px 20px 20px 20px',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      p: '40px 10px 15px 10px',
      width: '95%',
      maxHeight: 'calc(100vh - 40px)'
    }
  }
}

export const emailIconLink = {
  color: 'error.darker',
  borderBottom: '0.5px solid ',
  borderColor: 'error.darker',
  fontSize: 18,
  fontWeight: 500,
  position: 'relative',
  bottom: 5,
  ml: 1
}

export const emailLinkList = {
  ml: 1,
  fontSize: 16,
  fontWeight: 600,
  borderBottom: '0.5px solid',
  BorderColor: 'secondary.darker',
  cursor: 'pointer'
}
