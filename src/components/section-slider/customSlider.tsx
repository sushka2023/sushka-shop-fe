import styles from './sliderSection.module.scss'
// import IconFavorite from '../../icons/favorite.svg?react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShopItem from '../../images/shop-item.jpg'
import { FC, HTMLProps } from 'react'
import { Box, Typography } from '@mui/material'
import { cardPararaph, cardBold, slideElement, slideImage } from './style'
import { Button } from '../UI/Button'

type Props = HTMLProps<HTMLDivElement> & { index: number }

const CustomSlider: FC<Props> = (props) => {
  const { index } = props

  return (
    <Box>
      <Box sx={{ m: '10px' }} data-index={index}>
        <Box sx={slideElement}>
          <Box sx={slideImage}>
            <Box
              sx={{ maxWidth: '100%', height: 'auto' }}
              component="img"
              src={ShopItem}
              alt="mandarin pastille"
            />
            <FavoriteBorderIcon className={styles.cardFavorite} />
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
