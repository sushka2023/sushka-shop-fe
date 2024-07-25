import { FC, Fragment, ReactNode, SyntheticEvent, useState } from 'react'
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
import { Button } from '../../components/UI/Button'
import { btnEditAccount } from '../../components/Modal-custom-btn/style'

type TabPanelProps = {
  children?: ReactNode
  index: number
  value: number
}

type CustomAccordionProps = {
  index: number
  expanded: number | null
  onChange: (newIndex: number | null) => void
  summary: string
  children: ReactNode
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
      expandIcon={<KeyboardArrowDownIcon sx={{ color: 'secondary.darker' }} />}
      {...a11yProps(index)}
      sx={{
        '.MuiTypography-root': {
          fontFamily: 'Nunito',
          fontWeight: 700,
          fontSize: 17,
          color: 'secondary.darker'
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
  const [tabValue, setTabValue] = useState<number>(0)
  const [accordionValue, setAccordionValue] = useState<number | null>(0)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [openModal, setOpenModal] = useState(false)

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleAccordionChange = (newIndex: number | null) => {
    setAccordionValue(newIndex)
  }

  return (
    <Fragment>
      {!isSmallScreen && (
        <Fragment>
          <Container sx={{ p: '40px 0' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
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
              <Button onClick={() => setOpenModal(true)} sx={btnEditAccount}>
                Вийти
              </Button>
            </Tabs>
          </Container>

          <Box sx={{ ...stContainerTabPanel, p: '40px 0' }}>
            {user
              ? accordions.map((accordion, index) => (
                  <CustomTabPanel key={index} value={tabValue} index={index}>
                    {accordion.content}
                  </CustomTabPanel>
                ))
              : 'loading...'}
          </Box>
          <Box sx={{ ...stWavePink, mb: 2, bottom: 2, height: 150 }} />
        </Fragment>
      )}

      {isSmallScreen ? (
        user ? (
          <Container sx={{ p: 0, mt: 2 }}>
            {accordions.map((accordion, index) => (
              <CustomAccordion
                key={index}
                index={index}
                expanded={accordionValue}
                onChange={handleAccordionChange}
                summary={accordion.summary}
              >
                <Box sx={stContainerTabPanel}>{accordion.content}</Box>
                <Box sx={{ ...stWavePink, height: 35 }} />
              </CustomAccordion>
            ))}
            <Button
              onClick={() => setOpenModal(true)}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                fontFamily: 'Nunito',
                fontWeight: 700,
                fontSize: 17,
                color: 'secondary.darker',
                p: '9px 17px'
              }}
            >
              Вийти
            </Button>
          </Container>
        ) : (
          <Typography>Loading...</Typography>
        )
      ) : null}
      <BasicModal openModal={openModal} setOpenModal={setOpenModal} />
    </Fragment>
  )
}
