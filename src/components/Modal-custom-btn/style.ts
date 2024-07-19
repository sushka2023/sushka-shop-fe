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

export const boxModWin = {
  width: '100%',
  maxWidth: 520,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'secondary.darker',
  border: 'none',
  fontFamily: 'Open Sans'
}

export const boxModForm = (theme: Theme, isClosing: boolean) => {
  console.log('✌️isClosing --->', isClosing)
  return {
    'alignItems': 'start',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      position: 'fixed',
      top: 'auto',
      bottom: 0,
      left: 0,
      p: 0,
      transform: 'none',
      borderRadius: '20px 20px 0 0',
      animation: isClosing
        ? 'slideUp 0.5s ease-out forwards'
        : 'slideDown 0.5s ease-out forwards'
    },
    '@keyframes slideUp': {
      '0%': {
        transform: 'translateY(100%)'
      },
      '100%': {
        transform: 'translateY(0)'
      }
    },
    '@keyframes slideDown': {
      '0%': {
        transform: 'translateY(0)'
      },
      '100%': {
        transform: 'translateY(100%)'
      }
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
