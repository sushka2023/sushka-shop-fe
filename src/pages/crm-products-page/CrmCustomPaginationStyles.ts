import { Box, Button, Select, Typography, styled } from '@mui/material'

export const StyledButton = styled(Button)({
  borderRadius: 10,
  border: '1px solid',
  marginRight: '15px',
  padding: '8px 25px'
})

export const StyledNumberOfPagesTypography = styled(Typography)({
  width: '100px',
  fontFamily: 'Open Sans',
  fontSize: 18,
  fontWeight: 400,
  letterSpacing: 0,
  textAlign: 'left',
  color: '#64748B'
})

export const StyledButtonTypography = styled(Typography)({
  fontFamily: 'Open Sans',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '21px',
  letterSpacing: '0em',
  textAlign: 'center'
})

export const StyledCustomNoRowsOverlay = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '100px 30px 50px 50px',
  backgroundColor: 'white'
})

export const StyledCustomNoRowsOverlayTypography = styled(Typography)({
  fontFamily: 'Open Sans',
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: '26px',
  letterSpacing: '0em',
  textAlign: 'left',
  color: '#64748B',
  marginTop: '40px'
})

export const CustomSelect = styled(Select)(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'paddingLeft': theme.spacing(2),
  'height': 50,
  '& .MuiSelect-select': {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0
  },
  '& .MuiSelect-icon': {
    right: theme.spacing(2),
    cursor: 'pointer'
  }
}))
