import styles from './sectionReviews.module.scss'
import Slider, { Settings } from 'react-slick'
import { Fragment, useState } from 'react'
import clsx from 'clsx'
import {
  Box,
  Container,
  List,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

import ArrowPrev from '../section-slider/arrowPrev'
import ArrowNext from '../section-slider/arrowNext'
import IconCherry from '../../icons/cherry.svg?react'
import IconBanana from '../../icons/banana.svg?react'
import FirstReview from '../../images/review1.png'
import SecondReview from '../../images/review2.png'
import ThirdReview from '../../images/review3.png'

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
          sx={{
            width: 'clamp(0.625rem, 0.006rem + 1.65vw, 1.063rem)',
            height: 'clamp(0.625rem, 0.006rem + 1.65vw, 1.063rem)',
            borderRadius: '17px',
            backgroundColor:
              activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)'
          }}
        />
      )
    },
    beforeChange: (_, next) => {
      setActiveSlide(next)
    }
  }

  return (
    <Fragment>
      <Box className={clsx(styles.borderCommon, styles.borderTop)}>
        <Box className={styles.iconCherry}>
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
              fontSize: 'clamp(1.063rem, -0.321rem + 3.69vw, 3rem)',
              fontWeight: 700
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

      <Box className={clsx(styles.borderCommon, styles.borderBottom)}>
        <Box className={styles.iconBanana}>
          <IconBanana />
        </Box>
      </Box>
    </Fragment>
  )
}

export default SectionReviews
