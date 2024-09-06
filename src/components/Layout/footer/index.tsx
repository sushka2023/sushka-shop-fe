import { Link as ScrollLink } from 'react-scroll'
import { Fragment } from 'react'

import IconLogoFooter from '../../../icons/logofooter.svg?react'
import IconMastercard from '../../../icons/mastercard.svg?react'
import IconVisa from '../../../icons/visa.svg?react'
import IconLiqpay from '../../../icons/liqpay.svg?react'
import Strawberry from '../../../icons/strawberry.svg?react'
import FooterNavList from './footer-nav-list/footerNavList'
import FooterLegalList from './footer-legal-list/footerLegalList'
import FooterContactList from './footer-contact-list/footerContactList'
import { Box, Container, List, ListItem, Typography } from '@mui/material'
import {
  borderTopStyle,
  footerBorderStyle,
  footerLegalBlockStyle,
  footerWrapperStyle
} from './style'

const paymentIcons = [IconMastercard, IconVisa, IconLiqpay]

const Footer = () => {
  return (
    <Fragment>
      <Box sx={borderTopStyle}>
        <Strawberry />
      </Box>
      <Box component="footer" sx={{ backgroundColor: 'peach.darker' }}>
        <Container>
          <Box sx={footerWrapperStyle}>
            {/* 1 блок */}
            <Box sx={{ gridArea: 'block1' }}>
              <ScrollLink
                to="nav"
                smooth={true}
                duration={500}
                style={{ height: '60px', cursor: 'pointer' }}
              >
                <IconLogoFooter />
              </ScrollLink>
            </Box>

            <Box sx={{ gridArea: 'block2' }}>
              <FooterNavList />
            </Box>

            {/* 3 блок */}
            <Box sx={{ gridArea: 'block3' }}>
              <FooterLegalList />
            </Box>

            {/* 4 блок */}
            <Box sx={{ gridArea: 'block4' }}>
              <FooterContactList />
            </Box>
          </Box>
        </Container>
        <Box sx={footerBorderStyle}></Box>
        <Container sx={footerLegalBlockStyle}>
          <Box sx={{ minWidth: '50%' }}>
            <Typography variant="subtitle2">&copy; 2023, Sushka</Typography>
            <Typography variant="subtitle2">Усі права захищені</Typography>
          </Box>
          <List sx={{ display: 'flex', gap: '5px' }}>
            {paymentIcons.map((IconComponent, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <IconComponent />
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    </Fragment>
  )
}

export default Footer
