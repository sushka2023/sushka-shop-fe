import styles from './heroSection.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroPic from '../../images/hero-pic.png'
import HeroMobilePic from '../../images/HeroMobile-pic.png'
import { RootState } from '../../redux/store'
import { Button } from '../UI/Button'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

const HeroSection = () => {
  const allCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(601))

  const firstCategoryId = `/catalog/${allCategories && allCategories[0].id}`

  return (
    <Box component="section">
      <Container
        sx={{
          color: 'secondary.darker'
        }}
        className={styles.mainBlock}
      >
        <Box className={styles.slogan}>
          <Typography className={styles.sloganTitle} variant="h1">
            Найсолодші ласощі <br />
            <em>від природи,</em>
            <br /> зроблені з любов`ю
          </Typography>
          <Typography variant="body1" className={styles.sloganParagraph}>
            Відкрийте для себе неперевершені смаки нашої <br /> повністю
            натуральної фруктової <br /> пастили та фріпсів
          </Typography>
          <Link
            style={{ width: '100%', maxWidth: '300px' }}
            to={firstCategoryId}
          >
            <Button
              fullWidth
              variant="contained"
              className={styles.sloganButton}
            >
              Переглянути каталог
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            [theme.breakpoints.down('sm')]: {
              height: 'clamp(14.375rem, 4.375rem + 50vw, 23.125rem)'
            }
          }}
        >
          <Box
            height={isSmallScreen ? undefined : 205}
            component="img"
            src={isSmallScreen ? HeroMobilePic : HeroPic}
            alt="dried fruits in plastic bags"
            className={
              isSmallScreen ? styles.sloganImgLogoSM : styles.sloganImgLogo
            }
          />
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
