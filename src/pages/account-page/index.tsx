import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { logout } from '../../redux/authentication/operation'
import { styled } from '@mui/material'
import styles from './AccountPage.module.scss'
import { useAuth } from '../../hooks/use-auth'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTabs-indicator': {
    height: '100%',
    backgroundColor: '#FCC812',
    borderRadius: '20px',
    zIndex: -1
  }
}))

interface StyledTabProps {
  label: string
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  'whiteSpace': 'pre-line',
  'textTransform': 'none',
  'fontSize': theme.typography.pxToRem(15),
  'marginRight': theme.spacing(1),
  'color': '#567343',
  'borderRadius': '20px',
  'height': '60px',
  'fontStyle': '26px',
  'fontWeight': 600,
  'wordWrap': 'break-word',
  'padding': '21px 40px',
  '&.Mui-selected': {
    color: '#FFFFFF'
  },
  '&.Mui-focusVisible': {}
}))

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={styles.customTabPanel}
      style={{ backgroundColor: '#FEECEE' }} // Стиль фонового кольору червоний
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BasicTabs() {
  const token = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()
  console.log('✌️user --->', user)

  const handleClickLogout = () => {
    return dispatch(logout({ accessToken: token! }))
  }
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box className={styles.customTabsContainer}>
      <div className={styles.customTabsBox}>
        <Box className={styles.customTabsNav}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label={`Контактна інформація`} {...a11yProps(0)} />
            <StyledTab label={`Ваші адреси доставки`} {...a11yProps(1)} />
            <StyledTab label={`Історія замовлень`} {...a11yProps(2)} />
            <StyledTab label={`Змінити пароль`} {...a11yProps(3)} />
          </StyledTabs>
          <button className={styles.btnEdit} onClick={handleClickLogout}>
            Вийти
          </button>
        </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item
      </CustomTabPanel>
      <div className={styles.wave}> </div>
    </Box>
  )
}
