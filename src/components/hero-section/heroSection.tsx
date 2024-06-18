// import styles from './HeroSection.module.scss'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroPic from '../../images/hero-pic.jpg'
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
import {
  mainBlock,
  slogan,
  sloganImgLogo,
  sloganParagraph,
  sloganButton,
  sloganTitle
} from './style'

const HeroSection = () => {
  const allCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const firstCategoryId = `/catalog/${allCategories && allCategories[0].id}`

  return (
    <Box component="section">
      <Container
        sx={{
          ...mainBlock,
          [theme.breakpoints.between('sm', 'lg')]: mainBlock.lg,
          [theme.breakpoints.down('sm')]: mainBlock.sm
        }}
      >
        <Box sx={slogan}>
          <Typography
            sx={{
              color: 'secondary.darker',
              [theme.breakpoints.between('sm', 'lg')]: sloganTitle.md,
              [theme.breakpoints.down('sm')]: sloganTitle.sm
            }}
            component="h1"
            variant="h1"
          >
            Найсолодші ласощі <br />
            <em>від природи,</em>
            <br /> зроблені з любов`ю
          </Typography>
          <Typography
            component="p"
            variant="body1"
            sx={{
              ...sloganParagraph
            }}
          >
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
              sx={{ [theme.breakpoints.down('md')]: sloganButton }}
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
          {isSmallScreen ? (
            <Box
              component="img"
              src={HeroMobilePic}
              alt="dried fruits in plastic bags"
              sx={{
                ...sloganImgLogo.sm
              }}
            />
          ) : (
            <Box
              height={205}
              component="img"
              src={HeroPic}
              alt="dried fruits in plastic bags"
              sx={{
                ...sloganImgLogo.lg,
                [theme.breakpoints.between('sm', 'md')]: sloganImgLogo.md
              }}
            />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
