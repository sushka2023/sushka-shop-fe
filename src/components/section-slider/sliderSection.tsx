import { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { Link } from 'react-router-dom'
import ArrowPrev from './arrowPrev'
import ArrowNext from './arrowNext'
import CustomSlider from './customSlider'
import styles from './sliderSection.module.scss'
import ArrowBtn from '../../icons/arrow.svg?react'
import { Box, Container, Typography, useTheme } from '@mui/material'
import { sectionBg } from './style'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const SlideSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const testTheme = useTheme()

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
        <Box style={{ bottom: '0px', left: '0px' }}>
          <ul style={{ margin: '0px' }}> {dots} </ul>
        </Box>
      )
    },
    customPaging: (i) => {
      return (
        <Box
          style={{
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
        <Box className={styles.lastSlider}>
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
      <Box className={styles.border}></Box>
      <Container maxWidth="lg">
        <Typography
          color={testTheme.palette.error.darker}
          variant="h2"
          component="h2"
          // sx={sectionHeader}
        >
          Популярні товари
        </Typography>

        <List>
          <ListItem>Тест</ListItem>
          <ListItem>
            <ListItemText primary="Пункт 2" />
          </ListItem>
        </List>

        <Slider {...settings} className={styles.sliderContainer}>
          {Array.from({ length: 5 }, (_, index) => {
            return <Box key={index}>{renderSlide(index)}</Box>
          })}
        </Slider>
      </Container>
      <Box className={styles.borderSecond}></Box>
    </Box>
  )
}

export default SlideSection
