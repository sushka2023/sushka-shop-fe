import { Theme } from '@mui/material'
import { COMFORTAA, NUNITO } from '../../../lib/mui/config/fonts/config'
import { SelectedOrder } from './Order/Orders'

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
