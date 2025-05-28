import { FC, HTMLProps, useState } from 'react'
import { Box } from '@mui/material'
import { ProductResponse } from '../../types'
import { Link } from 'react-router-dom'
import ModalPortal from '../modal-portal/ModalPortal'
import Auth from '../auth/Auth'
import FavoriteButton from '../buttons/favorite-button'
import { BuyButton } from '../buttons/buy-button'
import { ProductItemFooter } from './ProductItemFooter'
import { styles } from './style'

type Props = HTMLProps<HTMLDivElement> & {
  item: ProductResponse
}

const ProductItem: FC<Props> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0].price)
  const [selectedPriceId, setSelectedPriceId] = useState(item.prices[0].id)

  return (
    <Box sx={styles.root}>
      <Box>
        <Box
          sx={{
            ...styles.cardWrapper,
            backgroundColor: 'background.default',
            color: 'secondary.darker'
          }}
        >
          <Link to={`/catalog/${item.product_category_id}/${item.id}/details`}>
            <Box sx={styles.imageContainer}>
              <Box
                sx={styles.buttonContainer}
                component="img"
                src={item.images[0]?.image_url}
                alt="mandarin pastille"
              />
              <FavoriteButton item={item} />
            </Box>
            <ProductItemFooter
              item={item}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              setSelectedPriceId={setSelectedPriceId}
            />
          </Link>
        </Box>
        <BuyButton
          item={item}
          selectedPrice={selectedPrice}
          selectedPriceId={selectedPriceId}
        />
      </Box>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth toggleOpen={setIsModalOpen} setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </Box>
  )
}

export { ProductItem }
