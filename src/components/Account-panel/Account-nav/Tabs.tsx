import { Dispatch, FC, Fragment, SetStateAction, useEffect } from 'react'
import {
  Box,
  Container,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useAuth } from '../../../hooks/use-auth'
import { Button } from '../../UI/Button'

import { btnEditAccount } from '../../Modal-custom-btn/style'
import { SetURLSearchParams } from 'react-router-dom'
import { a11yProps } from '../../../utils/a11y-tabs/a11yTabs'
import { ACCORDIONS } from '../../../constants/account/accordions'
import { CustomTabPanel } from '../../../utils/tab-panel/tab-panel'
import {
  stTab,
  stTabsNav,
  stContainerTabPanel,
  stTabsBottomBox,
  stWavePink
} from '../style'

type Props = {
  activeIndex: number
  setSearchParams: SetURLSearchParams
  setActiveIndex: (index: number) => void
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const TabsBigScreen: FC<Props> = ({
  activeIndex,
  setActiveIndex,
  setOpenModal,
  setSearchParams
}) => {
  const theme = useTheme()
  const { user } = useAuth()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    setSearchParams({ tab: (activeIndex + 1).toString() })
  }, [activeIndex])

  const handleChange = (index: number) => {
    setActiveIndex(index)
  }

  return (
    !isSmallScreen && (
      <Fragment>
        <Container sx={{ p: '40px 0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={activeIndex}
              onChange={(_, index) => handleChange(index)}
              aria-label="basic tabs example"
              sx={stTabsNav}
            >
              {ACCORDIONS.map((accordion, index) => (
                <Tab
                  sx={stTab(theme)}
                  key={index}
                  disableRipple
                  label={accordion.summary}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
            <Box sx={stTabsBottomBox}>
              <Button onClick={() => setOpenModal(true)} sx={btnEditAccount}>
                Вийти
              </Button>
            </Box>
          </Box>
        </Container>

        <Box sx={{ ...stContainerTabPanel, p: '40px 0' }}>
          {user
            ? ACCORDIONS.map((accordion, index) => (
                <CustomTabPanel key={index} value={activeIndex} index={index}>
                  {accordion.content}
                </CustomTabPanel>
              ))
            : 'loading...'}
        </Box>
        <Box sx={{ ...stWavePink, mb: 2, bottom: 2, height: 150 }} />
      </Fragment>
    )
  )
}
