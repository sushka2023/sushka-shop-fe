import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroPic from '../../images/hero-pic.jpg'
import { RootState } from '../../redux/store'
import { Button } from '../UI/Button'
import { Box, Container, Typography, useTheme } from '@mui/material'
import {
  mainBlock,
  slogan,
  sloganImgLogo,
  sloganParagraph,
  sloganButton
} from './style'

const test = {
  width: 'clamp(18.438rem, 8.267rem + 27.12vw, 25.625rem)',
  height: 'auto'
}

const mainBlockTheme = {
  justifyContent: 'center',
  gap: 'clamp(0.625rem, -2.028rem + 7.08vw, 2.5rem)',
  border: '1px solid red'
}

const H1 = {
  md: {
    fontSize: 'clamp(1.625rem, 0.741rem + 2.36vw, 2.25rem)'
  },
  sm: { fontSize: '26px' }
}

const HeroSection = () => {
  const allCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )

  const theme = useTheme()

  const firstCategoryId = `/catalog/${allCategories && allCategories[0].id}`

  return (
    <Box component="section">
      <Container
        sx={{
          ...mainBlock,
          [theme.breakpoints.between('sm', 'lg')]: mainBlockTheme
        }}
      >
        <Box sx={slogan}>
          <Typography
            sx={{
              color: 'secondary.darker',
              [theme.breakpoints.between('sm', 'lg')]: H1.md
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
            // [theme.breakpoints.between('sm', 'md')]: sloganButton
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
              sx={{ [theme.breakpoints.between('sm', 'md')]: sloganButton }}
            >
              Переглянути каталог
            </Button>
          </Link>
        </Box>

        <Box
          component="img"
          src={HeroPic}
          alt="dried fruits in plastic bags"
          sx={{
            ...sloganImgLogo,
            [theme.breakpoints.between('sm', 'md')]: test
          }}
        />
      </Container>
    </Box>
  )
}

export default HeroSection
