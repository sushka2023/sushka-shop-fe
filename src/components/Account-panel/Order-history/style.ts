/* eslint-disable */
import { Theme } from '@mui/material'
import { COMFORTAA, NUNITO } from '../../../lib/mui/config/fonts/config'
import { SelectedOrder } from './Order/Orders'
import { CSSProperties } from 'react'

export const stP2 = { fontSize: 18, fontWeight: 400, mb: 1, color: '#9AAB8E' }

export const stP1 = { fontSize: 22, fontWeight: 600, mb: 3 }

export const stP1des = {
  fontSize: 18,
  fontWeight: 600,
  mb: 2,
  textAlign: 'end'
}
export const stSpan = {
  fontSize: 20,
  fontFamily: NUNITO
}

export const stP1address = {
  fontSize: 18,
  fontWeight: 600,
  mb: 2,
  textAlign: 'end',
  display: 'inline-block',
  maxWidth: '550px',
  whiteSpace: 'normal',
  wordWrap: 'break-word'
}

export const stAvatar = (theme: Theme) => {
  return {
    mr: 2,
    width: 126,
    height: 96,
    img: {
      objectFit: 'cover'
    },
    [theme.breakpoints.down('sm')]: {
      img: {
        width: '85%',
        height: '85%'
      },
      mr: 0
    }
  }
}

export const stContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  flexGrow: 1
}

export const stColumnBox = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
}

export const stName = (theme: Theme) => {
  return {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.1,
    fontFamily: NUNITO,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20
    }
  }
}

export const stGrams = {
  fontSize: 18,
  fontWeight: 600,
  color: '#9AAB8E'
}

export const stPrice = (theme: Theme) => {
  return {
    mt: 0.5,
    fontSize: 22,
    fontWeight: 600,
    fontFamily: NUNITO,
    [theme.breakpoints.down('sm')]: {
      fontSize: 17,
      position: 'absolute',
      bottom: 0,
      right: 0
    }
  }
}

export const stCurrency = (theme: Theme) => {
  return {
    fontFamily: COMFORTAA,
    fontWeight: 600,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  }
}

export const stBtnBack = {
  fontWeight: 600,
  p: '5px 10px'
}

export const stBoxHeader = (orderId: SelectedOrder | null, theme: Theme) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: orderId ? 'space-between' : 'flex-end',
      pt: 3
    }
  }
}

export const stBtnContact = {
  'padding': '10px 20px',
  'borderRadius': 6,
  'backgroundColor': 'background.default',
  'color': 'illustrations.darker',
  'border': 'secondary.darker',
  'fontSize': 14,
  'fontWeight': 700,
  '&:hover': {
    backgroundColor: 'illustrations.darker',
    color: 'background.default',
    border: 'background.default'
  }
}

export const stContainerFlex = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 350
}

export const stContantBox = (theme: Theme) => {
  return {
    mt: 7,
    gap: 3,
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    [theme.breakpoints.down('sm')]: {
      mt: 3,
      pb: 4
    }
  }
}

export const stProductBoxPaper = (theme: Theme) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    mb: 3,
    bgcolor: 'background.default',
    borderRadius: 2,
    maxHeight: 612,
    minHeight: 612,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 652,
      minHeight: 652
    }
  }
}

export const stProductBox = {
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
}

export const stProductContainer = (theme: Theme) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    p: 3,
    [theme.breakpoints.down('sm')]: {
      p: 0
    }
  }
}

export const stProductContainerHeader = (theme: Theme) => {
  return {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}

export const stBoxLeaveReviewLink = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  flexGrow: 1,
  p: '16px'
}

export const stLeaveReviewLinkDisable = {
  'p': '10px',
  '&:disabled': {
    bgcolor: 'background.default',
    color: 'grey.300',
    borderColor: 'grey.300'
  }
}

export const stProductDividerItems = (theme: Theme) => {
  return {
    border: '1px solid',
    borderColor: 'peach.darker',
    width: '96%',
    m: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '93%'
    }
  }
}

export const stLinkLeaveReview: CSSProperties | undefined = {
  fontFamily: 'Open Sans',
  fontSize: 18,
  position: 'relative'
}

export const stLinkSpan = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '1px',
  backgroundColor: 'currentColor'
}

export const stOrderPaper = (theme: Theme) => {
  return {
    backgroundColor: 'background.default',
    borderRadius: 2,
    gridColumn: { xs: 'span 12', md: 'span 4' },
    maxHeight: 453,
    minHeight: 453,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'pink.lighter'
    }
  }
}

export const stOrderDriverItems = {
  border: '1px solid',
  borderColor: 'peach.darker',
  width: '90%',
  margin: '0 auto'
}

export const stOrderBoxItens = (isSelected: boolean, theme: Theme) => {
  return {
    position: 'relative',
    height: 100,
    padding: '25px 20px',
    cursor: 'pointer',
    backgroundColor: 'background.default',
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        backgroundColor: !isSelected ? theme.palette.grey[50] : 'none'
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        width: 5,
        height: '70%',
        backgroundColor: 'primary.darker',
        borderRadius: 10,
        display: isSelected ? 'block' : 'none'
      }
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      backgroundColor: 'background.default',
      borderRadius: 3,
      m: '10px 3px',
      padding: '8px 0 8px 14px'
    }
  }
}

export const stStepBox = {
  width: '170px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  cursor: 'pointer',
  gap: 0.5
}

export const stStepContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: 1
}

export const stProductItemBox = (theme: Theme) => {
  return {
    m: 2,
    [theme.breakpoints.down('sm')]: {
      m: 1
    }
  }
}

export const stProductItemContainer = (theme: Theme) => {
  return {
    display: 'flex',
    justifyContent: 'flex-start',
    pb: 2,
    [theme.breakpoints.down('sm')]: {
      pb: 1
    }
  }
}

export const stDetailsBox = {
  mb: 3,
  bgcolor: 'background.default',
  borderRadius: 2,
  height: '100%',
  p: 3
}

export const stDetailsContainer = {
  borderBottom: '1.5px solid',
  borderColor: 'peach.darker',
  mb: 2,
  pb: 5
}

export const stDetailsPrice = { ...stP1, alignItems: 'end', display: 'flex' }

export const stOrderItemContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
}

/* eslint-enable */
