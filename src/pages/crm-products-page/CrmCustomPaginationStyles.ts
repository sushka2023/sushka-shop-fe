import { Button, Typography, styled } from '@mui/material'

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
