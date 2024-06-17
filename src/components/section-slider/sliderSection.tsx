import styles from './sliderSection.module.scss'
import { Fragment, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { Link } from 'react-router-dom'
import ArrowPrev from './arrowPrev'
import ArrowNext from './arrowNext'
import CustomSlider from './customSlider'
// import borderTop from '/src/icons/borderslider.svg'
// import borderBottom from '/src/icons/bordersecondslider.svg'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import List from '@mui/material/List'

import {
  border,
  borderSecond,
  customButton,
  lastSlider,
  // sectionBg,
  // sliderContainer,
  sliderTitle
} from './style'
import { Button } from '../UI/Button'

const SlideSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: isSmallScreen ? 2 : 3,
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
            borderRadius: '17px',
            background:
              activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)'
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
            style={{ width: '100%', maxWidth: '300px' }}
            to="catalog/11"
            // className={`${styles.customButton} ${styles.customLink}`}
          >
            <Button fullWidth variant="contained" sx={customButton}>
              Переглянути каталог
            </Button>
            {/* <ArrowBtn className={styles.arrowBtn} width={10} height={17} /> */}
          </Link>
        </Box>
      )
    } else {
      return <CustomSlider index={index + 1} width={400} />
    }
  }

  return (
    <Fragment>
      <Box sx={border}></Box>
      <Box
        component="section"
        sx={{
          backgroundColor: 'pink.darker'
          // border: '1px solid',
          // borderColor: 'pink.darker'
        }}
      >
        {/* <Box
        component="img"
        src={borderTop}
        sx={{ ...border, [theme.breakpoints.up('lg')]: border.lg }}
      ></Box> */}
        <Container maxWidth="lg">
          <Typography
            sx={{
              ...sliderTitle,
              [theme.breakpoints.between('sm', 'lg')]: sliderTitle.md,
              [theme.breakpoints.down('sm')]: sliderTitle.sm
            }}
            variant="h2"
            component="h2"
          >
            Популярні товари
          </Typography>

          <Slider {...settings} className={styles.sliderContainer}>
            {Array.from({ length: 5 }, (_, index) => {
              return <Box key={index}>{renderSlide(index)}</Box>
            })}
          </Slider>
        </Container>
        {/* <Box component="img" src={borderBottom} sx={borderSecond}></Box> */}
      </Box>
      <Box sx={borderSecond}></Box>
    </Fragment>
  )
}

export default SlideSection
