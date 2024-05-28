import styles from './sliderSection.module.scss'
// import IconFavorite from '../../icons/favorite.svg?react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShopItem from '../../images/shop-item.jpg'
import { FC, HTMLProps } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { cardHeader, slideElement, slideImage } from './style'
import { Button } from '../UI/Button'

type Props = HTMLProps<HTMLDivElement> & { index: number }

const CustomSlider: FC<Props> = (props) => {
  const { index } = props
  const theme = useTheme()

  return (
    <Box sx={{ mr: 2 }}>
      <Box sx={slideElement} data-index={index}>
        <Box
          sx={{
            borderRadius: '10px',
            background: theme.palette.background.default,
            mb: '20px'
          }}
        >
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
            <Typography component="h3" sx={cardHeader}>
              Мандаринова пастила
            </Typography>
            <Typography
              component="p"
              variant="caption"
              sx={{ color: theme.palette.secondary.darker }}
            >
              Мандаринова пастила Мандаринова пастила Мандаринова пастила
            </Typography>
            <span className={styles.cardPrice}>200 грн / 100 гр.</span>
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
