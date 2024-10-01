import { Theme } from '@mui/material'

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
  color: 'secondary.darker',
  fontFamily: 'Comfortaa'
}
