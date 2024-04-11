import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'
import styles from './AccountPage.module.scss'
import { OrderHistory } from '../../components/Account-panel/Order-history/Order-history'
import { ChangePassword } from '../../components/Account-panel/Change-password/Change-password'
import { DeliveryAddress } from '../../components/Account-panel/Delivery-address/Delivery-address'
import ModalCustomBtn from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import { useAuth } from '../../hooks/use-auth'
import { Fragment, SyntheticEvent, useEffect, useState } from 'react'
import { ContactInfo } from '../../components/Account-panel/Contact-info/Contact-info'

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
  'fontStyle': '26px',
  'fontWeight': 600,
  'height': '65px',
  'wordWrap': 'break-word',
  'padding': '21px 40px',

  '&.Mui-selected': {
    color: '#FFFFFF'
  }
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
      style={{ backgroundColor: '#FEECEE' }}
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

export default function AccountPage() {
  const [value, setValue] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const { user } = useAuth()
  console.log('✌️user --->', user)

  useEffect(() => {
    if (user !== null) {
      setLoading(false)
    }
  }, [user])

  return (
    <Box className={styles.customTabsContainer}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
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
              <ModalCustomBtn />
            </Box>
          </div>
          <CustomTabPanel value={value} index={0}>
            {user && <ContactInfo user={user} />}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DeliveryAddress />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <OrderHistory />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <ChangePassword />
          </CustomTabPanel>
          <div className={styles.wave}> </div>
        </Fragment>
      )}
    </Box>
  )
}
