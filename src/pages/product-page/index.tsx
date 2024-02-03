/* eslint-disable max-lines */
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './ProductPage.module.scss'
import IconMinus from '../../icons/minus.svg?react'
import IconPlus from '../../icons/plus.svg?react'
import IconHeart from '../../icons/favorite.svg?react'
import IconArrowleft from '../../icons/arrowleft.svg?react'
import IconArrowRight from '../../icons/arrowright.svg?react'
import axios from 'axios'
import { ModalProductLimits } from '../../components/modal-product-limits/ModalProductLimits'
import { ProductResponse } from '../../types'

const PRODUCT_ORDERS_LS_KEY = 'product-orders'

const getProductForId = async (productId: string) => {
  const { data } = await axios.get(`api/product/${productId}`)
  return data as ProductResponse
}

const ProductPage = () => {
  const [products, setProducts] = useState<ProductResponse | null>(null)
  const [selectedWeight, setSelectedWeight] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [quantity, setQuantity] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const handleClick = () => {
    return setShowModal(false)
  }

  const { productId } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductForId(productId!)
        setProducts(data)
        if (data.prices.length > 0) {
          setSelectedWeight(data.prices[0].weight)
          setSelectedPrice(data.prices[0].price)
          setQuantity(data.prices[0].quantity)
        }

        console.log(data)
      } catch (error) {
        console.error('Помилка запиту:', error)
      }
    }

    fetchProduct()
  }, [productId])

  //   Обробник події, який викликається при зміні ваги
  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedWeightValue = event.target.value

    // Знайти відповідну ціну та кількість для обраної ваги
    const selectedPriceData = products?.prices?.find((price) => {
      return price.weight === selectedWeightValue
    })

    setSelectedWeight(selectedWeightValue)
    setSelectedPrice(selectedPriceData?.price!)
    setQuantity(selectedPriceData?.quantity!)
    setSelectedQuantity(1)
  }

  const increaseQuantity = () => {
    if (selectedQuantity === 10) {
      setShowModal(true)
    }

    console.log(selectedQuantity)

    const selectedPriceData = products?.prices?.find((price) => {
      return price.weight === selectedWeight
    })
    setSelectedQuantity((prevQuantity) => {
      return prevQuantity + 1
    })
    setSelectedPrice((prevPrice) => {
      return prevPrice + (selectedPriceData?.price || 0)
    })
  }

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      const selectedPriceData = products?.prices?.find((price) => {
        return price.weight === selectedWeight
      })
      setSelectedQuantity((prevQuantity) => {
        return prevQuantity - 1
      })
      setSelectedPrice((prevPrice) => {
        return prevPrice - (selectedPriceData?.price || 0)
      })
    }
  }

  const handleBuyButtonClick = () => {
    const orderInfo = {
      productId: products?.id,
      productName: products?.name,
      quantity: selectedQuantity,
      price: selectedPrice,
      weight: selectedWeight,
      img: products?.images[selectedImage].image_url
    }

    const productOrders =
      JSON.parse(localStorage.getItem(PRODUCT_ORDERS_LS_KEY) || '{}') || []

    productOrders.push(orderInfo)

    localStorage.setItem(PRODUCT_ORDERS_LS_KEY, JSON.stringify(productOrders))

    console.log(orderInfo)
    alert('Товар додано в кошик!')
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
                    return (
                      <li
                        className={styles.imageListItem}
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

              <div className={styles.ordertWrapper}>
                <h2 className={styles.titleProduct}>
                  Структурна йогуртова пастила з малиною, бананом та вівсянкою
                </h2>
                {showModal && <ModalProductLimits onClick={handleClick} />}
                <p className={styles.orderWeight}>Оберіть вагу упаковки:</p>
                <form className={styles.orderForm}>
                  {products.prices.map((price) => {
                    return (
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
                          {price.weight}
                        </label>
                      </div>
                    )
                  })}
                </form>
                <div>
                  <p className={styles.orderWeight}>Оберіть кількість:</p>
                  <div className={styles.btnQuantityWrapper}>
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
                      disabled={
                        quantity === selectedQuantity ||
                        selectedQuantity === 100
                      }
                    >
                      <IconPlus className={styles.iconPlus} />
                    </button>
                  </div>
                </div>
                {selectedWeight && (
                  <div>
                    <p className={styles.selectPrice}>{selectedPrice} грн</p>
                  </div>
                )}
                <div className={styles.btnByWrapper}>
                  <button
                    type="button"
                    className={styles.btnBy}
                    onClick={handleBuyButtonClick}
                  >
                    Купити
                  </button>
                  <button type="button" className={styles.btnFavorite}>
                    <IconHeart className={styles.iconHeart} />
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
