import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroPic from '../../images/hero-pic.jpg'
import { RootState } from '../../redux/store'
import styles from './HeroSection.module.scss'
import { Button } from '../UI/Button'
import { THEME } from '../../lib/mui/config/theme'

const HeroSection = () => {
  const allCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )

  return (
    <section className={styles.mainContainer}>
      <div className={styles.mainBlock}>
        <div className={styles.slogan}>
          <h1 className={styles.sloganHeader}>
            Найсолодші ласощі <br />
            <span className={styles.sloganHeaderItalic}> від природи, </span>
            <br /> зроблені з любов`ю
          </h1>
          <p className={styles.sloganParagraph}>
            Відкрийте для себе неперевершені смаки нашої <br /> повністю
            натуральної фруктової <br /> пастили та фріпсів
          </p>
          <Link
            style={{ width: '100%', maxWidth: '300px' }}
            to={`/catalog/${allCategories && allCategories[0].id}`}
          >
            <Button
              fullWidth
              sx={{
                borderRadius: '20px',
                backgroundColor: THEME.palette.primary.darker,
                color: '#fff',
                height: '60px'
              }}
            >
              Переглянути каталог
            </Button>
          </Link>
        </div>
        <img
          src={HeroPic}
          alt="dried fruits in plastic bags"
          width={760}
          height={730}
        />
      </div>
    </section>
  )
}

export default HeroSection
