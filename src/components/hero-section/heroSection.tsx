import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroPic from '../../images/hero-pic.jpg'
import { RootState } from '../../redux/store'
import styles from './HeroSection.module.scss'
import { Button } from '../UI/Button'
import { useTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

// import { Image } from '@mui/icons-material'

const HeroSection = () => {
  const allCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )
  const theme = useTheme()

  return (
    <Box component="section" className={styles.mainContainer}>
      <Box className={styles.mainBlock}>
        <Box className={styles.slogan}>
          <h1 className={styles.sloganHeader}>
            Найсолодші ласощі <br />
            <span className={styles.sloganHeaderItalic}> від природи, </span>
            <br /> зроблені з любов`ю
          </h1>
          <Typography className={styles.sloganParagraph} component="p">
            Відкрийте для себе неперевершені смаки нашої <br /> повністю
            натуральної фруктової <br /> пастили та фріпсів
          </Typography>
          <Link
            style={{ width: '100%', maxWidth: '300px' }}
            to={`/catalog/${allCategories && allCategories[0].id}`}
          >
            <Button
              fullWidth
              sx={{
                borderRadius: '20px',
                backgroundColor: theme.palette.primary.darker,
                color: '#fff',
                height: '60px'
              }}
            >
              Переглянути каталог
            </Button>
          </Link>
        </Box>

        <Box
          component="img"
          src={HeroPic}
          alt="dried fruits in plastic bags"
          width={760}
          height={730}
        />
      </Box>
    </Box>
  )
}

export default HeroSection
