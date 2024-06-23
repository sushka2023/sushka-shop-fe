import styles from './sectionReviews.module.scss'
import Slider, { Settings } from 'react-slick'
import ArrowPrev from '../section-slider/arrowPrev'
import ArrowNext from '../section-slider/arrowNext'
import { Fragment, useState } from 'react'
import IconCherry from '../../icons/cherry.svg?react'
import IconBanana from '../../icons/banana.svg?react'
import FirstReview from '../../images/review1.png'
import SecondReview from '../../images/review2.png'
import ThirdReview from '../../images/review3.png'
import {
  Box,
  Container,
  List,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

const REVIEWS_CLIENTS = [
  FirstReview,
  SecondReview,
  ThirdReview,
  FirstReview,
  SecondReview
]

const SectionReviews = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    appendDots: (dots) => {
      return (
        <Box sx={{ bottom: '0px', left: '0px' }}>
          <List sx={{ margin: '0px' }}> {dots} </List>
        </Box>
      )
    },
    customPaging: (i) => {
      return (
        <Box
          // sx={{
          //   width: '17px',
          //   height: '17px',
          //   backgroundColor:
          //     activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)',
          //   borderRadius: '17px'
          // },[theme.breakpoints.down('sm')]: {width: '17px',
          //   height: '17px',}}
          sx={{
            width: '17px',
            height: '17px',
            backgroundColor:
              activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)',
            borderRadius: '17px',
            [theme.breakpoints.down('md')]: {
              width: '10px',
              height: '10px'
            }
          }}
        />
      )
    },
    beforeChange: (_, next) => {
      setActiveSlide(next)
    }
  }

  const CreateBorderStyle = (url: string, positionWave: 'top' | 'bottom') => ({
    position: 'relative',
    [positionWave]: '2px', // динамічний ключ (top або bottom)
    backgroundImage: `url(${url})`,
    width: '100%',
    height: 'clamp(1.25rem, -0.804rem + 10.27vw, 8.438rem)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%'
  })

  const borderTop = CreateBorderStyle(
    '/src/icons/bordersliderreview.svg',
    'top'
  )
  const borderBottom = CreateBorderStyle(
    '/src/icons/bordersecondsliderreview.svg',
    'bottom'
  )

  return (
    <Fragment>
      <Box
        sx={{ ...borderTop, mt: 'clamp(2.5rem, -0.357rem + 14.29vw, 12.5rem)' }}
      >
        <Box className={styles.iconWrapper}>
          <IconCherry />
        </Box>
      </Box>

      <Box
        component="section"
        sx={{ backgroundColor: 'primary.darker' }}
        id="review"
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              color: 'background.default',
              fontSize: 'clamp(1.063rem, -0.321rem + 3.69vw, 3rem)'
            }}
          >
            Відгуки
          </Typography>
          <Slider {...settings} className={styles.sliderContainer}>
            {REVIEWS_CLIENTS.map((review, index) => (
              <Box key={index} sx={{ mr: '20px' }}>
                <Box
                  sx={{
                    boxSizing: 'border-box'
                  }}
                >
                  <Box
                    component="img"
                    width="100%"
                    src={review}
                    alt="good product review"
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      <Box
        sx={{
          ...borderBottom,
          mb: 'clamp(2.5rem, -0.357rem + 14.29vw, 12.5rem)'
        }}
      >
        <Box className={styles.iconBwrapper}>
          <IconBanana />
        </Box>
      </Box>
    </Fragment>
  )
}

export default SectionReviews
