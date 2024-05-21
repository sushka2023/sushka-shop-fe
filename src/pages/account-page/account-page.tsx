import Box from '@mui/material/Box'
import { OrderHistory } from '../../components/Account-panel/Order-history/Order-history'
import { useAuth } from '../../hooks/use-auth'
import { Fragment, SyntheticEvent, useState } from 'react'
import { ContactInfo } from '../../components/Account-panel/Contact-info/Contact-info'
import {
  stBoxNav,
  stContainerTabPanel,
  stTabsNav,
  stWavePink,
  stBoxTabPanel,
  StyledTabs,
  StyledTab
} from './style'
import { BasicModal } from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import { DeliveryAddress } from '../../components/Account-panel/Delivery-address/Delivery-address'
import { ChangePassword } from '../../components/Account-panel/Change-password/Change-password'

type TabPanelProps = {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ backgroundColor: '#FEECEE' }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
  const { user } = useAuth()

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    console.log('✌️newValue --->', newValue)
    setValue(newValue)
  }

  return (
    <Box>
      <Fragment>
        <Box sx={stBoxNav}>
          <Box sx={stTabsNav}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <StyledTab
                disableRipple
                label={`Контактна інформація`}
                {...a11yProps(0)}
              />
              <StyledTab
                disableRipple
                label={`Ваші адреси доставки`}
                {...a11yProps(1)}
              />
              <StyledTab
                disableRipple
                label={`Історія замовлень`}
                {...a11yProps(2)}
              />
              <StyledTab
                disableRipple
                label={`Змінити пароль`}
                {...a11yProps(3)}
              />
            </StyledTabs>
            <BasicModal />
          </Box>
        </Box>
        <Box sx={stContainerTabPanel}>
          <Box sx={{ ...stBoxNav, ...stBoxTabPanel }}>
            <Fragment>
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
            </Fragment>
          </Box>
        </Box>
      </Fragment>
      <Box sx={stWavePink}> </Box>
    </Box>
  )
}
