/* eslint-disable max-lines */
import { Fragment, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import IconFavorite from '../../icons/favorite.svg?react'
import IconFavoriteIsActive from '../../icons/favoriteactive.svg?react'

import styles from './ProductPage.module.scss'
import IconMinus from '../../icons/minus.svg?react'
import IconPlus from '../../icons/plus.svg?react'
import IconArrowleft from '../../icons/arrowleft.svg?react'
import IconArrowRight from '../../icons/arrowright.svg?react'
import { ModalProductLimits } from '../../components/modal-product-limits/ModalProductLimits'
import { FavoriteItemsResponse, ProductResponse } from '../../types'
import axiosInstance from '../../axios/settings'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Notiflix, { Notify } from 'notiflix'
import { formatWeight } from '../../helpers/formatWeightToString'
import { fetchBasketItemsThunk } from '../../redux/basket-item-count/operations'
import { updateCount } from '../../redux/basket-item-count/slice'
import { getToken } from '../../utils/cookie/token'
import { addToFavorite, removeFavorite } from '../../redux/products/operation'
import Auth from '../../components/auth/Auth'
import ModalPortal from '../../components/modal-portal/ModalPortal'
import { useAuth } from '../../hooks/use-auth'

Notiflix.Notify.init({
  position: 'center-top'
})

const PRODUCT_ORDERS_LS_KEY = 'product-orders'

const getProductForId = async (productId: string) => {
  const { data } = await axiosInstance.get<ProductResponse>(
    `api/product/${productId}`
  )
  return data
}

const addProductToBasket = async (
  productId: string,
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

const ProductPage = () => {
  const [products, setProducts] = useState<ProductResponse | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedPriceId, setSelectedPriceId] = useState(0)
  const [selectedOldPrice, setselectedOldPrice] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const isAuth = useSelector((state: RootState) => state.auth.isLoggedIn)
  const btnQuantityWrapperRef = useRef(null)
  const { productId } = useParams() as { productId: string }
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    setOpen(!open)
  }

  const { user } = useAuth()

  const favorites = useSelector((state: RootState) => state.items.isFavorite)
  const isLoading = useSelector((state: RootState) => state.items.isLoading)

  const toggleFavorite = (favorite: FavoriteItemsResponse) =>
    favorite.product.id === products?.id

  useEffect(() => {
    setIsFavorite(favorites.some(toggleFavorite))
  }, [favorites])

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'instant'
    })
  }, [])

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductForId(productId)

        setProducts(data)

        if (data.prices.length > 0) {
          const minWeightItem = data.prices.reduce((prev, curr) => {
            const prevWeight = parseInt(prev.weight, 10)
            const currWeight = parseInt(curr.weight, 10)
            return prevWeight < currWeight ? prev : curr
          })

          setSelectedWeight(minWeightItem.weight)
          setSelectedPrice(minWeightItem.price)
          setSelectedPriceId(minWeightItem.id)
          setselectedOldPrice(minWeightItem.old_price || 0)
        }
      } catch (error) {
        console.error('Помилка запиту:', error)
      }
    }

    fetchProduct()
  }, [productId])

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedWeightValue = event.target.value

    // знайти ціну та кількість для обраної ваги
    const selectedPriceData = products?.prices?.find((price) => {
      return price.weight === selectedWeightValue
    })

    setSelectedWeight(selectedWeightValue)
    setSelectedPrice(selectedPriceData?.price || 0)
    setSelectedPriceId(selectedPriceData?.id || 0)
    setselectedOldPrice(selectedPriceData?.old_price || 0)
    setSelectedQuantity(1)
  }

  const increaseQuantity = () => {
    if (selectedQuantity === 10) {
      handleClick()
    }

    const selectedPriceData = products?.prices?.find(
      (price) => price.weight === selectedWeight
    )
    setSelectedQuantity((prevQuantity) => prevQuantity + 1)
    setSelectedPrice((prevPrice) => prevPrice + (selectedPriceData?.price || 0))
    setselectedOldPrice(
      (prevOldPrice) => prevOldPrice + (selectedPriceData?.old_price || 0)
    )
  }

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      const selectedPriceData = products?.prices?.find(
        (price) => price.weight === selectedWeight
      )
      setSelectedQuantity((prevQuantity) => prevQuantity - 1)
      setSelectedPrice(
        (prevPrice) => prevPrice - (selectedPriceData?.price || 0)
      )
      setselectedOldPrice(
        (prevOldPrice) => prevOldPrice - (selectedPriceData?.old_price || 0)
      )
    }
  }

  const handleBuyButtonClick = async () => {
    try {
      if (isAuth) {
        await addProductToBasket(productId, selectedQuantity, selectedPriceId)
        dispatch(fetchBasketItemsThunk())

        Notify.success('Товар додано в кошик!')
      } else {
        const orderInfo = {
          id: selectedPriceId,
          productId: products?.id,
          price_id_by_the_user: selectedPriceId,
          quantity: selectedQuantity
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

        Notify.success('Товар додано в кошик!')
      }
    } catch (error) {
      console.error('Помилка при додаванні товару до кошика:', error)
      throw error
    }
  }

  const showNextImage = () => {
    if (selectedImage < (products?.images.length || 0) - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  const showPreviousImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const isPromotional = products?.prices?.find(
    (price) => price.weight === selectedWeight
  )?.promotional
  return (
    <Fragment>
      <div className={styles.container}>
        {products ? (
          <div>
            <div className={styles.productWrapper}>
              <div>
                <div className={styles.imageWrapper}>
                  <img
                    className={styles.imageProduct}
                    src={products.images[selectedImage].image_url}
                    alt={products.images?.[0]?.description}
                  />

                  <button
                    className={`${styles.btnImageChange} ${styles.btnImageChangeLeft}`}
                    onClick={showPreviousImage}
                  >
                    <IconArrowleft className={styles.iconArrow} />
                  </button>
                  <button
                    className={`${styles.btnImageChange} ${styles.btnImageChangeRight}`}
                    type="button"
                    onClick={showNextImage}
                  >
                    <IconArrowRight className={styles.iconArrow} />
                  </button>
                </div>
                <ul className={styles.imageList}>
                  {products.images.map((image, index) => {
                    const isActive = index === selectedImage
                    const activeImg = isActive
                      ? `${styles.imageListItem} ${styles.activeImg}`
                      : styles.imageListItem
                    return (
                      <li
                        className={activeImg}
                        key={image.id}
                        onClick={() => {
                          setSelectedImage(index)
                        }}
                      >
                        <img
                          className={styles.imageProduct}
                          src={image.image_url}
                          alt={image.description}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
              <ModalPortal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              >
                <Auth setIsModalOpen={setIsModalOpen} />
              </ModalPortal>

              <div className={styles.ordertWrapper}>
                <h2 className={styles.titleProduct}>{products.name}</h2>

                <ul className={styles.sub_categories_list}>
                  {products.sub_categories?.map((sub_category) => (
                    <li
                      key={sub_category.id}
                      className={styles.sub_categories_item}
                    >
                      {sub_category.name}
                    </li>
                  ))}
                </ul>

                <p className={styles.orderWeight}>Оберіть розмір пакування</p>
                <form className={styles.orderForm}>
                  {products.prices
                    .sort(
                      (a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10)
                    )
                    .map((price) => (
                      <div key={price.id}>
                        <label
                          className={`${styles.labelWeight} ${
                            selectedWeight === price.weight
                              ? styles.checked
                              : ''
                          }`}
                        >
                          <input
                            className={styles.inputWeight}
                            type="radio"
                            name="weight"
                            value={price.weight}
                            checked={selectedWeight === price.weight}
                            onChange={handleWeightChange}
                          />
                          {formatWeight(price.weight)}
                        </label>
                      </div>
                    ))}
                </form>

                <div>
                  <p className={styles.orderWeight}>Кількість одиниць товару</p>

                  <div
                    ref={btnQuantityWrapperRef}
                    className={styles.btnQuantityWrapper}
                  >
                    <button
                      className={styles.btnQuantity}
                      onClick={decreaseQuantity}
                      disabled={selectedQuantity === 1}
                    >
                      <IconMinus className={styles.iconPlus} />
                    </button>
                    <span className={styles.selectQuantity}>
                      {selectedQuantity}
                    </span>
                    <button
                      className={styles.btnQuantity}
                      onClick={increaseQuantity}
                      disabled={selectedQuantity === 100}
                    >
                      <IconPlus className={styles.iconPlus} />
                    </button>

                    <ModalProductLimits
                      open={open}
                      anchorEl={btnQuantityWrapperRef.current}
                      onClick={handleClick}
                    />
                  </div>
                </div>

                <div className={styles.selectPriceWrapper}>
                  {isPromotional && (
                    <p className={styles.selectOldPrice}>{selectedPrice} ₴</p>
                  )}
                  <p
                    className={
                      isPromotional
                        ? styles.promotionalSelectPrice
                        : styles.selectPrice
                    }
                  >
                    {selectedOldPrice} ₴
                  </p>
                </div>

                <div className={styles.btnByWrapper}>
                  <button
                    type="button"
                    className={styles.btnBy}
                    onClick={handleBuyButtonClick}
                  >
                    Купити
                  </button>
                  <button type="button" className={styles.btnFavorite}>
                    {!isFavorite ? (
                      <IconFavorite
                        className={styles.cardFavorite}
                        onClick={(e) => handleClickFavorite(e, products.id)}
                      />
                    ) : (
                      <IconFavoriteIsActive
                        className={styles.cardFavorite}
                        onClick={(e) => handleClickFavorite(e, products.id)}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className={styles.descriptionTitle}>Опис товару</p>
              <p className={styles.descriptionProduct}>
                {products.description}
              </p>
            </div>
          </div>
        ) : (
          <p>Завантаження...</p>
        )}
      </div>
    </Fragment>
  )
}

export default ProductPage
