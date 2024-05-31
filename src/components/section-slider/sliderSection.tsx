import { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { Link } from 'react-router-dom'
import ArrowPrev from './arrowPrev'
import ArrowNext from './arrowNext'
import CustomSlider from './customSlider'
import styles from './sliderSection.module.scss'
import ArrowBtn from '../../icons/arrow.svg?react'
import { Box, Container, Typography } from '@mui/material'
import List from '@mui/material/List'

import {
  border,
  borderSecond,
  lastSlider,
  sectionBg,
  sliderContainer
} from './style'

const SlideSection = () => {
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
          <List sx={{ margin: '0px' }}> {dots} </List>
        </Box>
      )
    },
    customPaging: (i) => {
      return (
        <Box
          sx={{
            width: '17px',
            height: '17px',
            background:
              activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)',
            borderRadius: '17px'
          }}
        ></Box>
      )
    },
    beforeChange: (_, next) => {
      setActiveSlide(next)
    }
  }

  const renderSlide = (index: number) => {
    if (index === 4) {
      return (
        <Box sx={lastSlider}>
          <Link
            to="catalog/11"
            className={`${styles.customButton} ${styles.customLink}`}
          >
            переглянути каталог
            <ArrowBtn className={styles.arrowBtn} width={10} height={17} />
          </Link>
        </Box>
      )
    } else {
      return <CustomSlider index={index + 1} width={400} />
    }
  }

  return (
    <Box component="section" sx={sectionBg}>
      <Box sx={border}></Box>
      <Container maxWidth="lg" sx={sliderContainer}>
        <Typography color={'background.default'} variant="h2" component="h2">
          Популярні товари
        </Typography>

        <Slider {...settings}>
          {Array.from({ length: 5 }, (_, index) => {
            return <Box key={index}>{renderSlide(index)}</Box>
          })}
        </Slider>
      </Container>
      <Box sx={borderSecond}></Box>
    </Box>
  )
}

export default SlideSection
