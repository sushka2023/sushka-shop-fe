import Box from '@mui/material/Box'
import { useAuth } from '../../hooks/use-auth'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { SyntheticEvent, useEffect, useState } from 'react'
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

export default function AccountPage() {
  const [value, setValue] = useState('1')

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()

  useEffect(() => {
    if (user !== null) {
      setLoading(false)
    }
  }, [user])

  return (
    <Box sx={{}}>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <Box>
          <TabContext value={value}>
            <Box sx={stBoxNav}>
              <Box sx={stTabsNav}>
                <Box>
                  <StyledTabs
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <StyledTab label={`Контактна інформація`} value="1" />
                    <StyledTab label={`Ваші адреси доставки`} value="2" />
                    <StyledTab label={`Історія замовлень`} value="3" />
                    <StyledTab label={`Змінити пароль`} value="4" />
                  </StyledTabs>
                </Box>
                <BasicModal />
              </Box>
            </Box>
            <Box sx={stContainerTabPanel}>
              <Box sx={{ ...stBoxNav, ...stBoxTabPanel }}>
                <TabPanel value="1">
                  {user && <ContactInfo user={user} />}
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </Box>
            </Box>
          </TabContext>
          <Box sx={stWavePink}> </Box>
        </Box>
      )}
    </Box>
  )
}
