import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useToggleFavorite } from '../../../hooks/useToggleFavorite'
import { ProductResponse } from '../../../types'
import { getToken } from '../../../utils/cookie/token'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Fragment, useState } from 'react'
import { useAuth } from '../../../hooks/use-auth'
import ModalPortal from '../../modal-portal/ModalPortal'
import Auth from '../../auth/Auth'
import { Box } from '@mui/material'
import { favoriteIconStyle } from './style'

type Props = {
  item: ProductResponse
}

const FavoriteButton = ({ item }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isFavorite, toggleFavorite } = useToggleFavorite(item)
  const { user } = useAuth()

  const isLoading = useSelector((state: RootState) => state.items.isLoading)

  const handleClickFavorite = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault()

    const accessToken = getToken()
    setIsModalOpen(!accessToken)

    if (isLoading || !user?.id) return

    toggleFavorite()
  }

  return (
    <Fragment>
      <Box>
        {!isFavorite ? (
          <FavoriteBorderIcon
            sx={favoriteIconStyle}
            onClick={(e) => handleClickFavorite(e)}
          />
        ) : (
          <FavoriteIcon
            sx={favoriteIconStyle}
            onClick={(e) => handleClickFavorite(e)}
          />
        )}
      </Box>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth toggleOpen={setIsModalOpen} setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </Fragment>
  )
}

export default FavoriteButton
