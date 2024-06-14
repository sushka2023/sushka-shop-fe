import Box from '@mui/material/Box'
import { OrderHistory } from '../../components/Account-panel/Order-history/Order-history'
import { useAuth } from '../../hooks/use-auth'
import React, { useState } from 'react'
import { ContactInfo } from '../../components/Account-panel/Contact-info/Contact-info'
import { stContainerTabPanel, stTabsNav, stWavePink } from './style'
import { BasicModal } from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import { DeliveryAddress } from '../../components/Account-panel/Delivery-address/Delivery-address'
import { ChangePassword } from '../../components/Account-panel/Change-password/Change-password'
import { Container, Tab, Tabs } from '@mui/material'

type TabPanelProps = {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 5 }}>{children}</Box>}
    </Box>
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

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          aria-label="basic tabs example"
          sx={stTabsNav}
        >
          <Tab disableRipple label={`Контактна інформація`} {...a11yProps(0)} />
          <Tab disableRipple label={`Ваші адреси доставки`} {...a11yProps(1)} />
          <Tab disableRipple label={`Історія замовлень`} {...a11yProps(2)} />
          <Tab disableRipple label={`Змінити пароль`} {...a11yProps(3)} />
          <BasicModal />
        </Tabs>
      </Container>
      <Box sx={stContainerTabPanel}>
        <Container>
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
        </Container>
      </Box>
      <Box sx={stWavePink} />
    </React.Fragment>
  )
}
