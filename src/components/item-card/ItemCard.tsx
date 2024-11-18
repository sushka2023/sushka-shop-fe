import styles from './itemCard.module.scss'
import IconFavorite from '../../icons/favorite.svg?react'
import IconFavoriteIsActive from '../../icons/favoriteactive.svg?react'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FavoriteItemsResponse,
  PriceResponse,
  ProductResponse
} from '../../types'
import { gramsToKilograms } from '../../utils/format-weight/formatWeight'
import { getToken } from '../../utils/cookie/token'
import ModalPortal from '../modal-portal/ModalPortal'
import Auth from '../auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, removeFavorite } from '../../redux/products/operation'
import { AppDispatch, RootState } from '../../redux/store'
import { useAuth } from '../../hooks/use-auth'
import axiosInstance from '../../axios/settings'
import { fetchBasketItemsThunk } from '../../redux/basket-item-count/operations'
import { Notify } from 'notiflix'
import { updateCount } from '../../redux/basket-item-count/slice'
import { formatter } from '../../helpers/formatterTotalPrice'

const PRODUCT_QUANTITY = 1
const PRODUCT_ORDERS_LS_KEY = 'product-orders'

type Props = {
  item: ProductResponse
}

const ItemCard: FC<Props> = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState(item.prices[0].weight)
  const [selectedOldPrice, setSelectedOldPrice] = useState(
    item.prices[0].old_price as number
  )
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0].price)
  const [selectedPriceId, setSelectedPriceId] = useState(item.prices[0].id)

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

    const accessToken = getToken()
    setIsModalOpen(!accessToken)

    if (isLoading || !user?.id) return

    dispatch(
      !isFavorite
        ? addToFavorite({ product_id })
        : removeFavorite({ product_id })
    )
    setIsFavorite(!isFavorite)
  }

  const handleWeightClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: PriceResponse
  ) => {
    e.preventDefault()
    setSelectedWeight(price.weight)
    setSelectedPrice(price.price)
    setSelectedOldPrice(price.old_price as number)
    setSelectedPriceId(price.id)
  }

  const addProductToBasket = async (
    productId: number,
    selectedQuantity: number,
    selectedPriceId: number
  ) => {
    const response = await axiosInstance.post(
      `api/basket_items/add`,

      {
        product_id: productId,
        quantity: selectedQuantity,
        price_id_by_the_user: selectedPriceId
      }
    )
    return response
  }

  const handleBuyClick = async (productId: number) => {
    try {
      if (user) {
        await addProductToBasket(productId, PRODUCT_QUANTITY, selectedPriceId)
        dispatch(fetchBasketItemsThunk())

        Notify.success('Товар додано в кошик!')
      } else {
        const orderInfo = {
          id: selectedPrice,
          productId: productId,
          price_id_by_the_user: selectedPriceId,
          quantity: 1
        }

        const productOrders = JSON.parse(
          localStorage.getItem(PRODUCT_ORDERS_LS_KEY) ?? '[]'
        )

        const existingProduct = productOrders.findIndex(
          (order: {
            productId: number
            price_id_by_the_user: number
            quantity: number
          }) =>
            order.productId === orderInfo.productId &&
            order.price_id_by_the_user === orderInfo.price_id_by_the_user
        )

        if (existingProduct !== -1) {
          productOrders[existingProduct].quantity += orderInfo.quantity
        } else {
          productOrders.push(orderInfo)
        }

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        )

        dispatch(updateCount(productOrders))

        Notify.success('Товар добавлено в кошик!')
      }
    } catch (error) {
      console.error('Помилка при додаванні товару до кошика:', error)
      throw error
    }
  }

  return (
    <li>
      <div className={styles.slideElement}>
        <div className={styles.cardContent}>
          <Link to={`/catalog/${item.product_category_id}/${item.id}/details`}>
            <div className={styles.slideImage}>
              <img src={item?.images[0]?.image_url} alt="mandarin pastille" />
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
                          handleWeightClick(e, price)
                        }}
                      >
                        {gramsToKilograms(price.weight)}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div className={styles.priceContainer}>
                <span
                  className={`${selectedOldPrice > 0 ? styles.newPrice : styles.cardPrice}`}
                >
                  {formatter.format(selectedPrice)}
                </span>
                {selectedOldPrice > 0 && (
                  <span className={styles.oldPrice}>
                    {formatter.format(selectedOldPrice)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
        <button
          className={styles.cardButtom}
          onClick={() => handleBuyClick(item.id)}
        >
          Купити
        </button>
      </div>
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </li>
  )
}

export default ItemCard
