import styles from './itemCard.module.scss'
import IconFavorite from '../../icons/favorite.svg?react'
import IconFavoriteIsActive from '../../icons/favoriteactive.svg?react'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FavoriteItemsResponse, ProductResponse } from '../../types'
import { gramsToKilograms } from '../../utils/format-weight/formatWeight'
import { getToken } from '../../utils/cookie/token'
import ModalPortal from '../modal-portal/ModalPortal'
import Auth from '../auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, removeFavorite } from '../../redux/products/operation'
import { AppDispatch, RootState } from '../../redux/store'
import { useAuth } from '../../hooks/use-auth'

type Props = {
  item: ProductResponse
}

const ItemCard: FC<Props> = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState(item.prices[0].weight)
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0].price)

  const favorites = useSelector((state: RootState) => state.items.isFavorite)
  const isLoading = useSelector((state: RootState) => state.items.isLoading)

  const dispatch = useDispatch<AppDispatch>()

  const { user } = useAuth()

  const toggleFavorite = (favorite: FavoriteItemsResponse) =>
    favorite.product.id === item.id

  useEffect(() => {
    setIsFavorite(favorites.some(toggleFavorite))
  }, [favorites])

  const handleClickFavorite = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    product_id: number
  ) => {
    e.preventDefault()

    if (isLoading) {
      return
    }

    const accessToken = getToken()
    setIsModalOpen(!accessToken)
    user &&
      dispatch(
        !isFavorite
          ? addToFavorite({ product_id })
          : removeFavorite({ product_id })
      )
    user && setIsFavorite(!isFavorite)
  }

  const handleWeightClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    weight: string,
    price: number
  ) => {
    e.preventDefault()
    setSelectedWeight(weight)
    setSelectedPrice(price)
  }

  return (
    <li>
      <div className={styles.slideElement}>
        <div className={styles.cardContent}>
          <Link to={`/catalog/${item.product_category_id}/${item.id}/details`}>
            <div className={styles.slideImage}>
              <img src={item.images[0].image_url} alt="mandarin pastille" />
              {!isFavorite ? (
                <IconFavorite
                  className={styles.cardFavorite}
                  onClick={(e) => handleClickFavorite(e, item.id)}
                />
              ) : (
                <IconFavoriteIsActive
                  className={styles.cardFavorite}
                  onClick={(e) => handleClickFavorite(e, item.id)}
                />
              )}
            </div>
            <div className={styles.cardTitle}>
              <div className={styles.cardTypography}>
                <h3 className={styles.cardHeader}>{item.name}</h3>
                <p className={styles.cardPararaph}>{item.description}</p>
              </div>
              <ul className={styles.listWeight}>
                {item.prices.map((price) => {
                  return (
                    <li className={styles.weightElement} key={price.id}>
                      <button
                        className={`${styles.weightElementButton} ${selectedWeight === price.weight ? styles.activeWeightElementButton : ''}`}
                        onClick={(e) => {
                          handleWeightClick(e, price.weight, price.price)
                        }}
                      >
                        {gramsToKilograms(price.weight)}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <span className={styles.cardPrice}>{selectedPrice} грн</span>
            </div>
          </Link>
        </div>
        <button className={styles.cardButtom}>Купити</button>
      </div>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </li>
  )
}

export default ItemCard
