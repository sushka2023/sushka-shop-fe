import { styled } from '@mui/material'
import { TabList } from '@mui/lab'
import Tab from '@mui/material/Tab'

export const StyledTab = styled(Tab)(({ theme }) => ({
  'whiteSpace': 'pre-line',
  'textTransform': 'none',
  'fontSize': theme.typography.pxToRem(15),
  'marginRight': theme.spacing(1),
  'color': '#567343',
  'borderRadius': '20px',
  'fontStyle': '26px',
  'fontWeight': 600,
  'height': '65px',
  'wordWrap': 'break-word',
  'padding': '21px 40px',

  '&.Mui-selected': {
    color: '#FFFFFF'
  }
}))

export const StyledTabs = styled(TabList)(() => ({
  '& .MuiTabs-indicator': {
    height: '100%',
    backgroundColor: '#FCC812',
    borderRadius: '20px',
    zIndex: -1
  }
}))

export const stWavePink = {
  backgroundImage: 'url("/src/icons/accountWave.svg")',
  width: '100%',
  height: '140px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  marginBottom: '180px'
}

export const stBoxNav = {
  maxWidth: '1440px',
  margin: '0 auto'
}

export const stTabsNav = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  border: '1px solid #FEEEE1',
  borderRadius: '30px',
  margin: '40px 50px'
}

export const stContainerTabPanel = {
  height: 500,
  backgroundColor: '#FEECEE',
  padding: '25px'
}
export const stBoxTabPanel = { color: '#567343', fontFamily: 'Comfortaa' }
