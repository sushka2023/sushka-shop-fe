import styles from './sliderSection.module.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShopItem from '../../images/shop-item.jpg'
import { FC, HTMLProps } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Button } from '../UI/Button'

type Props = HTMLProps<HTMLDivElement> & { index: number }

const CustomSlider: FC<Props> = ({ index }) => {
  const theme = useTheme()

  return (
    <Box className={styles.sliderCard}>
      <Box data-index={index}>
        <Box
          className={styles.slideElement}
          sx={{
            backgroundColor: 'background.default',
            color: 'secondary.darker'
          }}
        >
          <Box className={styles.slideImage}>
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
              className={styles.cardFavorite}
              sx={{
                'color': theme.palette.error.dark,
                '&:hover': {
                  color: theme.palette.primary.darker
                }
              }}
            />
          </Box>
          <Box className={styles.slideInfo}>
            <Typography variant="h3" className={styles.cardBold}>
              Мандаринова пастила
            </Typography>
            <Typography variant="body2" className={styles.cardPararaph}>
              Мандаринова пастила Мандаринова пастила Мандаринова пастила
            </Typography>
            <Typography
              variant="caption"
              className={styles.cardBold}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  fontSize: 'clamp(0.938rem, 0.318rem + 1.65vw, 1.375rem)'
                }
              }}
            >
              200грн / 100гр.
            </Typography>
          </Box>
        </Box>
        <Button className={styles.sliderButton} variant="contained" fullWidth>
          Купити
        </Button>
      </Box>
    </Box>
  )
}

export default CustomSlider
