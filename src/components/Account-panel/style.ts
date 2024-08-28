import { Theme } from '@mui/material'
import { COMFORTAA, NUNITO } from '../../lib/mui/config/fonts/config'

export const stInput = {
  '& input': {
    color: 'secondary.darker',
    backgroundColor: 'background.default'
  }
}

export const stAccordionBtn = {
  width: '100%',
  justifyContent: 'flex-start',
  fontFamily: 'Nunito',
  fontWeight: 700,
  fontSize: 17,
  color: 'secondary.darker',
  p: '9px 17px'
}

export const stTab = (theme: Theme) => {
  return {
    width: '20%',
    p: 0.7,
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      width: '25%'
    }
  }
}

export const stWavePink = {
  backgroundImage: 'url("/src/icons/accountWave.svg")',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  position: 'relative',
  bottom: 1
}

export const stTabsNav = {
  width: '100%',
  padding: '10px',
  borderLeft: '1px solid',
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderColor: 'peach.darker',
  borderRadius: '30px 0 0 30px'
}
export const stTabsBottomBox = {
  padding: '10px',
  borderRight: '1px solid',
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderColor: 'peach.darker',
  borderRadius: ' 0  30px 30px 0'
}

export const stContainerTabPanel = {
  backgroundColor: 'pink.lighter',
  color: 'secondary.darker'
}

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
