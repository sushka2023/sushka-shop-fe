import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroPic from '../../images/hero-pic.jpg'
import { RootState } from '../../redux/store'
import { Button } from '../UI/Button'
import { Box, Container, Typography } from '@mui/material'
import {
  mainBlock,
  slogan,
  sloganButton,
  sloganImgLogo,
  sloganParagraph
} from './style'

// const test = {
//   width: '460px',
//   height: '441px'
// }

const HeroSection = () => {
  const allCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )

  // const theme = useTheme()

  const firstCategoryId = `/catalog/${allCategories && allCategories[0].id}`

  return (
    <Box component="section">
      <Container sx={mainBlock}>
        <Box sx={slogan}>
          <Typography
            sx={{ color: 'secondary.darker' }}
            component="h1"
            variant="h1"
          >
            Найсолодші ласощі <br />
            <Typography
              component="span"
              variant="h1"
              sx={{ fontStyle: 'italic' }}
            >
              від природи,
            </Typography>
            <br /> зроблені з любов`ю
          </Typography>
          <Typography component="p" variant="body1" sx={sloganParagraph}>
            Відкрийте для себе неперевершені смаки нашої <br /> повністю
            натуральної фруктової <br /> пастили та фріпсів
          </Typography>
          <Link
            style={{ width: '100%', maxWidth: '300px' }}
            to={firstCategoryId}
          >
            <Button fullWidth sx={sloganButton}>
              Переглянути каталог
            </Button>
          </Link>
        </Box>

        <Box
          component="img"
          src={HeroPic}
          alt="dried fruits in plastic bags"
          sx={{ ...sloganImgLogo }}
        />
      </Container>
    </Box>
  )
}

export default HeroSection
