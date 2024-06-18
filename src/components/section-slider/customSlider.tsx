// import styles from './sliderSection.module.scss'
// import IconFavorite from '../../icons/favorite.svg?react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShopItem from '../../images/shop-item.jpg'
import { FC, HTMLProps } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  cardPararaph,
  cardBold,
  slideElement,
  slideImage,
  cardFavorite,
  sliderButton,
  slideInfo
} from './style'
import { Button } from '../UI/Button'

type Props = HTMLProps<HTMLDivElement> & { index: number }

const CustomSlider: FC<Props> = (props) => {
  const { index } = props
  const theme = useTheme()

  return (
    <Box>
      <Box data-index={index}>
        <Box
          sx={{
            ...slideElement,
            [theme.breakpoints.down('sm')]: slideElement.sm
          }}
        >
          <Box sx={slideImage}>
            <Box
              sx={{
                maxWidth: '100%',
                height: '100%',
                borderRadius: '10px'
              }}
              component="img"
              src={ShopItem}
              alt="mandarin pastille"
            />
            <FavoriteBorderIcon
              sx={{
                ...cardFavorite.lg,
                [theme.breakpoints.down('sm')]: cardFavorite.sm
              }}
            />
          </Box>
          <Box
            sx={{ ...slideInfo, [theme.breakpoints.down('md')]: slideInfo.md }}
          >
            <Typography
              variant="h3"
              sx={{
                ...cardBold,
                [theme.breakpoints.down('sm')]: cardBold.sm
              }}
            >
              Мандаринова пастила
            </Typography>
            <Typography
              component="p"
              variant="body2"
              sx={{
                ...cardPararaph,
                [theme.breakpoints.down('sm')]: cardPararaph.sm
              }}
            >
              Мандаринова пастила Мандаринова пастила Мандаринова пастила
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{
                ...cardBold,
                [theme.breakpoints.down('sm')]: {
                  fontSize: 'clamp(0.938rem, 0.318rem + 1.65vw, 1.375rem)'
                }
              }}
            >
              200грн / 100гр.
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{ [theme.breakpoints.down('sm')]: sliderButton }}
          variant="contained"
          fullWidth
        >
          Купити
        </Button>
      </Box>
    </Box>
  )
}

export default CustomSlider
