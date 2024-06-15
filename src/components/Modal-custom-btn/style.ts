export const btnEditAccount = {
  'marginLeft': 'auto',
  'borderRadius': '20px',
  'cursor': 'pointer',
  'fontFamily': 'Open Sans',
  'fontWeight': 600,
  'fontStyle': '16px',
  'color': 'background.default',
  'padding': '21px 40px',
  'bgcolor': 'pink.darker',
  '&.MuiButton-root:hover': {
    bgcolor: 'error.light',
    color: 'background.default'
  }
}

export const btn = {
  width: 250,
  height: 50,
  textTransform: 'capitalize'
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
  maxWidth: 600,
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
  padding: '30px 20px 50px 20px',
  border: 'none',
  fontFamily: 'Open Sans'
}

export const btnEmail = {
  'borderRadius': 3,
  'padding': '15px 80px',
  'bgcolor': 'primary.darker',
  'fontFamily': 'Open Sans',
  'fontWeight': 700,
  'fontSize': 14,
  'border': '2px solid transparent',
  'boxShadow': 'none !important',
  '&:hover': {
    bgcolor: 'background.default',
    color: 'primary.darker',
    border: '2px solid ',
    BorderColor: 'primary.darker',
    cursor: 'pointer'
  }
}

export const emailP2 = {
  fontSize: 18,
  fontWeight: 400,
  textAlign: 'center',
  mt: 1
}

export const iconLinkEmail = {
  color: 'error.darker',
  borderBottom: '0.5px solid ',
  borderColor: 'error.darker',
  fontSize: 18,
  fontWeight: 500,
  position: 'relative',
  bottom: 5,
  ml: 1
}

export const linkEmailList = {
  ml: 1,
  fontSize: 16,
  fontWeight: 600,
  borderBottom: '0.5px solid',
  BorderColor: 'secondary.darker',
  cursor: 'pointer'
}
