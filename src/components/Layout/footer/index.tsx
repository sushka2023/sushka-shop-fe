import styles from '../footer/Footer.module.scss'
import { Link as ScrollLink } from 'react-scroll'

import IconLogoFooter from '../../../icons/logofooter.svg?react'
import IconMastercard from '../../../icons/mastercard.svg?react'
import IconVisa from '../../../icons/visa.svg?react'
import IconLiqpay from '../../../icons/liqpay.svg?react'
import Strawberry from '../../../icons/strawberry.svg?react'
import FooterNavList from './footer-nav-list/footerNavList'
import FooterLegalList from './footer-legal-list/footerLegalList'
import FooterContactList from './footer-contact-list/footerContactList'
import { Box, Container, List, ListItem, Typography } from '@mui/material'

const paymentIcons = [IconMastercard, IconVisa, IconLiqpay]

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Box className={styles.border}>
        <Strawberry className={styles.iconStrawberry} />
      </Box>
      <Container className={styles.footerContainer}>
        <Box className={styles.footerWrapper}>
          <ScrollLink
            to="nav"
            smooth={true}
            duration={500}
            className={styles.footerLogo}
          >
            <IconLogoFooter />
          </ScrollLink>
          <FooterNavList />
          <FooterLegalList />
          <FooterContactList />
        </Box>
      </Container>
      <Box className={styles.footerBorder}></Box>
      <Box className={styles.footerLegalBlock}>
        <Box>
          <Typography variant="subtitle2">&copy; 2023, Sushka</Typography>
          <Typography variant="subtitle2">Усі права захищені</Typography>
        </Box>
        <List sx={{ display: 'flex', gap: '10px' }}>
          {paymentIcons.map((IconComponent, index) => (
            <ListItem key={index} sx={{ padding: 0 }}>
              <IconComponent />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Footer
