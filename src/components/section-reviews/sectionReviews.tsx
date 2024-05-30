import Slider, { Settings } from 'react-slick'
import ArrowPrev from '../section-slider/arrowPrev'
import ArrowNext from '../section-slider/arrowNext'
import { useState } from 'react'
import IconCherry from '../../icons/cherry.svg?react'
import IconBanana from '../../icons/banana.svg?react'
import FirstReview from '../../images/review1.png'
import SecondReview from '../../images/review2.png'
import ThirdReview from '../../images/review3.png'
import { Box, Container, List, Typography } from '@mui/material'
import {
  border,
  borderSecond,
  iconBwrapper,
  iconWrapper,
  sectionBg,
  sliderContainer
} from './style'

const reviewsClients = [
  FirstReview,
  SecondReview,
  ThirdReview,
  FirstReview,
  SecondReview
]

const SectionReviews = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    appendDots: (dots) => {
      return (
        <Box sx={{ bottom: '0px', left: '0px' }}>
          <List style={{ margin: '0px' }}> {dots} </List>
        </Box>
      )
    },
    customPaging: (i) => {
      return (
        <Box
          sx={{
            width: '17px',
            height: '17px',
            backgroundColor:
              activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)',
            borderRadius: '17px'
          }}
        />
      )
    },
    beforeChange: (_, next) => {
      setActiveSlide(next)
    }
  }

  return (
    <Box component="section" sx={sectionBg} id="review">
      <Box sx={border}>
        <Box sx={iconWrapper}>
          <IconCherry />
        </Box>
      </Box>
      <Container sx={{ ...sliderContainer, position: 'relative' }}>
        <Typography
          component="h2"
          variant="h2"
          sx={{ color: 'background.default' }}
        >
          Відгуки
        </Typography>
        <Slider {...settings}>
          {reviewsClients.map((review, index) => (
            <Box key={index} sx={{ mr: '20px' }}>
              <Box sx={{ maxWidth: '400px', boxSizing: 'border-box' }}>
                <Box component="img" src={review} alt="good product review" />
              </Box>
            </Box>
          ))}
        </Slider>
      </Container>
      <Box sx={borderSecond}>
        <Box sx={iconBwrapper}>
          <IconBanana />
        </Box>
      </Box>
    </Box>
  )
}

export default SectionReviews
