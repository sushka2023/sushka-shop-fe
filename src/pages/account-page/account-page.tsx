import React from 'react'
import Box from '@mui/material/Box'
import { useAuth } from '../../hooks/use-auth'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { SyntheticEvent, useState } from 'react'
import { ContactInfo } from '../../components/Account-panel/Contact-info/Contact-info'
import { BasicModal } from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import {
  StyledTab,
  StyledTabs,
  stBoxNav,
  stContainerTabPanel,
  stTabsNav,
  stWavePink,
  stBoxTabPanel
} from './style'

const AccountPage = () => {
  const { isLoading, user } = useAuth()
  const [value, setValue] = useState('1')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <TabContext value={value}>
        <Box sx={stBoxNav}>
          <Box sx={stTabsNav}>
            <Box>
              <StyledTabs
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <StyledTab
                  disableRipple
                  label={`Контактна інформація`}
                  value="1"
                />
                <StyledTab
                  disableRipple
                  label={`Ваші адреси доставки`}
                  value="2"
                />
                <StyledTab
                  disableRipple
                  label={`Історія замовлень`}
                  value="3"
                />
                <StyledTab disableRipple label={`Змінити пароль`} value="4" />
              </StyledTabs>
            </Box>
            <BasicModal />
          </Box>
        </Box>
        <Box sx={stContainerTabPanel}>
          <Box sx={{ ...stBoxNav, ...stBoxTabPanel }}>
            {isLoading ? (
              'loading...'
            ) : (
              <React.Fragment>
                <TabPanel value="1">
                  {user && <ContactInfo user={user} />}
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Three</TabPanel>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </TabContext>
      <Box sx={stWavePink}> </Box>
    </React.Fragment>
  )
}

export default AccountPage
