import styles from './sliderSection.module.scss'
import { Fragment, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import List from '@mui/material/List'

import ArrowPrev from './arrowPrev'
import ArrowNext from './arrowNext'

import { Button } from '../UI/Button'
import { ProductResponse } from '../../types'
import { ProductItem } from '../product-item/ProductItem'

type Props = {
  data: ProductResponse[]
}

const SlideSection = ({ data }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    centerMode: false,
    variableWidth: false,
    appendDots: (dots) => (
      <Box
        sx={{
          bottom: isSmallScreen ? '-25px' : '0px',
          left: 0,
          zIndex: 1
        }}
      >
        <List sx={{ m: 0 }}>{dots}</List>
      </Box>
    ),
    customPaging: (i) => (
      <Box
        sx={{
          width: 'clamp(0.625rem, 0.006rem + 1.65vw, 1.063rem)',
          height: 'clamp(0.625rem, 0.006rem + 1.65vw, 1.063rem)',
          borderRadius: '17px',
          background: activeSlide === i ? 'white' : 'rgba(255, 255, 255, 0.60)'
        }}
      />
    ),
    beforeChange: (_, next) => {
      setActiveSlide(next)
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const renderSlide = (item: ProductResponse, index: number) => {
    if (index === data.length - 1) {
      return (
        <Box
          className={styles.lastSlider}
          sx={{
            px: 1,
            boxSizing: 'border-box'
          }}
        >
          <Link style={{ width: '100%' }} to="catalog/11">
            <Button
              fullWidth
              variant="contained"
              sx={{
                'width': 'clamp(7.813rem, -2.188rem + 50vw, 16.563rem)',
                'fontSize': 'clamp(0.75rem, 0.654rem + 0.38vw, 1rem)',
                'padding':
                  'clamp(0.25rem, -0.24rem + 1.74vw, 0.875rem) clamp(0.5rem, -0.48rem + 3.48vw, 1.75rem)',
                'ml': 'clamp(0.313rem, -0.13rem + 1.18vw, 0.625rem)',
                'color': 'secondary.darker',
                'backgroundColor': 'background.default',
                'border': 'none',
                '&:hover': {
                  color: 'secondary.darker',
                  border: '2px solid',
                  borderColor: 'secondary.darker'
                },
                [theme.breakpoints.down('sm')]: {
                  ml: '5px'
                }
              }}
            >
              Переглянути каталог
            </Button>
          </Link>
        </Box>
      )
    } else {
      return (
        <Box
          sx={{
            px: 1,
            boxSizing: 'border-box'
          }}
        >
          <ProductItem item={item} height={655} />
        </Box>
      )
    }
  }

  return (
    <Fragment>
      <Box className={clsx(styles.borderCommon, styles.borderTop)}></Box>
      <Box
        component="section"
        sx={{
          backgroundColor: 'pink.darker'
        }}
        className={styles.sectionSlider}
      >
        <Container maxWidth="lg">
          <Typography sx={{ color: 'background.default' }} variant="h2">
            Популярні товари
          </Typography>
          {data.length > 0 && (
            <Slider {...settings} className={styles.sliderContainer}>
              {data.map((item, index) => (
                <Box key={item.id}>{renderSlide(item, index)}</Box>
              ))}
            </Slider>
          )}
        </Container>
      </Box>
      <Box className={clsx(styles.borderCommon, styles.borderBottom)}></Box>
    </Fragment>
  )
}

export default SlideSection
