import { useEffect, useState } from 'react'
import { ProductResponse } from '../types/models/ProductResponse'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { addToFavorite, removeFavorite } from '../redux/products/operation'

export const useToggleFavorite = (item: ProductResponse) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const favorites = useSelector((state: RootState) => state.items.isFavorite)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.product.id === item.id))
  }, [favorites])

  const toggleFavorite = () => {
    dispatch(
      !isFavorite
        ? addToFavorite({ product_id: item.id })
        : removeFavorite({ product_id: item.id })
    )
    setIsFavorite(!isFavorite)
  }

  return { isFavorite, toggleFavorite }
}
