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
  cardFavorite
} from './style'
import { Button } from '../UI/Button'

type Props = HTMLProps<HTMLDivElement> & { index: number }

const CustomSlider: FC<Props> = (props) => {
  const { index } = props
  const theme = useTheme()

  return (
    <Box>
      <Box sx={{ m: '10px' }} data-index={index}>
        <Box
          sx={{
            ...slideElement,
            [theme.breakpoints.down('sm')]: slideElement.sm
          }}
        >
          <Box sx={slideImage}>
            <Box
              sx={{ maxWidth: '100%', height: 'auto' }}
              component="img"
              src={ShopItem}
              alt="mandarin pastille"
            />
            <FavoriteBorderIcon sx={cardFavorite} />
          </Box>
          <Box sx={{ padding: '0px 40px 30px' }}>
            <Typography component="h3" variant="h3" sx={cardBold}>
              Мандаринова пастила
            </Typography>
            <Typography component="p" variant="body2" sx={cardPararaph}>
              Мандаринова пастила Мандаринова пастила Мандаринова пастила
            </Typography>
            <Typography component="span" variant="caption" sx={cardBold}>
              200 грн / 100 гр.
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" fullWidth>
          Додати в кошик
        </Button>
      </Box>
    </Box>
  )
}

export default CustomSlider
