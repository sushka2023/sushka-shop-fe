import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Container, Tab, Tabs } from '@mui/material'
import { OrderHistory } from '../../components/Account-panel/Order-history/Order-history'
import { useAuth } from '../../hooks/use-auth'
import { ContactInfo } from '../../components/Account-panel/Contact-info/Contact-info'
import { DeliveryAddress } from '../../components/Account-panel/Delivery-address/Delivery-address'
import { ChangePassword } from '../../components/Account-panel/Change-password/Change-password'
import { BasicModal } from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import { stContainerTabPanel, stTabsNav, stWavePink } from './style'

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

export const AccountPage = () => {
  const { user } = useAuth()
  const [value, setValue] = useState(0)

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
        <Container maxWidth="lg">
          {user ? (
            <React.Fragment>
              <CustomTabPanel value={value} index={0}>
                <ContactInfo user={user} />
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
            </React.Fragment>
          ) : (
            'loading...'
          )}
        </Container>
      </Box>
      <Box sx={stWavePink} />
    </React.Fragment>
  )
}
