import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { OrderHistory } from '../../components/Account-panel/Order-history/Order-history'
import { useAuth } from '../../hooks/use-auth'
import { ContactInfo } from '../../components/Account-panel/Contact-info/Contact-info'
import { ChangePassword } from '../../components/Account-panel/Change-password/Change-password'
import { BasicModal } from '../../components/Modal-custom-btn/ModalCustomBtnEdit'
import { stContainerTabPanel, stTabsNav, stWavePink } from './style'
import { DeliveryAddress } from '../../components/Account-panel/Delivery-address/DeliveryAddress'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type TabPanelProps = {
  children?: React.ReactNode
  index: number
  value: number | null
}
type CustomAccordionProps = {
  index: number
  expanded: number | null
  onChange: (newIndex: number | null) => void
  summary: string
  children: React.ReactNode
}

const CustomTabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

const a11yProps = (index: number) => ({
  'id': `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
})

const accordions = [
  {
    summary: 'Контактна інформація',
    content: <ContactInfo />
  },
  {
    summary: 'Ваші адреси доставки',
    content: <DeliveryAddress />
  },
  {
    summary: 'Історія замовлень',
    content: <OrderHistory />
  },
  {
    summary: 'Змінити пароль',
    content: <ChangePassword />
  }
]

const CustomAccordion: FC<CustomAccordionProps> = ({
  index,
  expanded,
  onChange,
  summary,
  children
}) => (
  <Accordion
    expanded={expanded === index}
    onChange={(_, isExpanded) => onChange(isExpanded ? index : null)}
    sx={{
      '&.MuiPaper-root.MuiAccordion-root': {
        'boxShadow': 'none',
        '&::before': {
          display: 'none'
        }
      }
    }}
  >
    <AccordionSummary
      expandIcon={<KeyboardArrowDownIcon sx={{ color: '#567343' }} />}
      {...a11yProps(index)}
      sx={{
        '.MuiTypography-root': {
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: 17,
          color: '#567343'
        }
      }}
    >
      <Typography>{summary}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
  </Accordion>
)

export const AccountPage = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const [value, setValue] = useState([0, null])
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (newIndex: number | null) => {
    setValue([newIndex, null])
  }

  return (
    <React.Fragment>
      {!isSmallScreen && (
        <React.Fragment>
          <Container sx={{ p: '40px 0' }}>
            <Tabs
              value={value[0]}
              onChange={(_, newValue) => setValue([newValue, null])}
              aria-label="basic tabs example"
              sx={stTabsNav}
            >
              {accordions.map((accordion, index) => (
                <Tab
                  key={index}
                  disableRipple
                  label={accordion.summary}
                  {...a11yProps(index)}
                />
              ))}
              <BasicModal />
            </Tabs>
          </Container>

          <Box sx={{ ...stContainerTabPanel, p: '40px 0' }}>
            {user
              ? accordions.map((accordion, index) => (
                  <CustomTabPanel key={index} value={value[0]} index={index}>
                    {accordion.content}
                  </CustomTabPanel>
                ))
              : 'loading...'}
          </Box>
          <Box sx={{ ...stWavePink, mb: 2, bottom: 2, height: 150 }} />
        </React.Fragment>
      )}

      {isSmallScreen && user ? (
        <Container sx={{ p: 0, mt: 2 }}>
          {accordions.map((accordion, index) => (
            <CustomAccordion
              key={index}
              index={index}
              expanded={value[0]}
              onChange={handleChange}
              summary={accordion.summary}
            >
              <Box sx={stContainerTabPanel}>{accordion.content}</Box>
              <Box sx={{ ...stWavePink, height: 35 }} />
            </CustomAccordion>
          ))}
        </Container>
      ) : (
        'loading...'
      )}
    </React.Fragment>
  )
}
