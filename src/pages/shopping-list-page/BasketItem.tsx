import styles from './ShoppingListPage.module.scss'
import IconMinus from '../../icons/minus.svg?react'
import IconPlus from '../../icons/plus.svg?react'
import IconArrowClose from '../../icons/closemodal.svg?react'
import { FC, useEffect, useState } from 'react'
import { ModalProductLimits } from '../../components/modal-product-limits/ModalProductLimits'
import customStyles from '../../components/modal-product-limits/CustomStylesBasket.module.scss'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import axiosInstance from '../../axios/settings'
import { PriceResponse, ProductResponse } from '../../types'

const PRODUCT_ORDERS_LS_KEY = 'product-orders'

const editProductQuantity = async (id: number, quantity: number) => {
  const data = await axiosInstance.patch(`api/basket_items/quantity`, {
    id,
    quantity
  })

  return data
}

type Props = {
  product: ProductResponse
  userPrise: number
  quantity: number
  idData: number
  removeItem: (id: number) => void
  updateTotalValue: (idData: number, total: number) => void
}

type OrderType = {
  id: number
  quantity: number
  price_id_by_the_user: number
  productId: string
}

const BasketItem: FC<Props> = ({
  product,
  userPrise,
  quantity,
  idData,
  removeItem,
  updateTotalValue
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => setShowModal(false)
  const isAuth = useSelector((state: RootState) => state.auth.isLoggedIn)

  const handlePriceChange = (total: number) => {
    //  зворотний виклик для передачі змін ціни батьківському компоненту
    updateTotalValue(idData, total)
  }

  const calculateTotalPrice = () => {
    const foundPrice = product.prices.find(
      (price: PriceResponse) => price.id === userPrise
    )

    if (foundPrice) {
      const price = foundPrice.price
      const total = price * selectedQuantity

      setTotalPrice(total)
      handlePriceChange(total)
    } else {
      console.error('Ціна не знайдена для вказаного id.')
    }
  }

  useEffect(() => {
    setSelectedQuantity(quantity)
  }, [quantity])

  useEffect(() => {
    calculateTotalPrice()
  }, [selectedQuantity, userPrise, product])

  // eslint-disable-next-line complexity
  const increaseQuantity = async () => {
    if (selectedQuantity === 10) {
      setShowModal(true)
    }

    try {
      setSelectedQuantity((prevQuantity) => prevQuantity + 1)
      calculateTotalPrice()
      if (isAuth) {
        await editProductQuantity(idData, selectedQuantity + 1)
      } else {
        const productOrders = JSON.parse(
          localStorage.getItem(PRODUCT_ORDERS_LS_KEY) ?? '[]'
        )
        const productForId = (productOrders as OrderType[]).find(
          (item) => item.id === idData
        )

        if (productForId) {
          productForId.quantity = selectedQuantity + 1
        } else {
          console.error('Елемент не знайдено для id:', idData)
        }

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const decreaseQuantity = async () => {
    try {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1)
      calculateTotalPrice()
      if (isAuth) {
        await editProductQuantity(idData, selectedQuantity - 1)
      } else {
        const productOrders = JSON.parse(
          localStorage.getItem(PRODUCT_ORDERS_LS_KEY) ?? '[]'
        )
        const productForId = (productOrders as OrderType[]).find(
          (item) => item.id === idData
        )

        if (productForId) {
          productForId.quantity = selectedQuantity - 1
        } else {
          console.error('Елемент не знайдено для id:', idData)
        }

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <li className={styles.basketItem}>
      <div className={styles.basketItem_imgWrapper}>
        <img
          src={
            product?.images?.find((image) => image.main_image === true)
              ?.image_url ?? product.images[0].image_url
          }
          alt="Product image"
          className={styles.basketItem_img}
        />
      </div>

      <div className={styles.basketItem_infoWrapper}>
        <p className={styles.basketItem_infoName}>{product.name}</p>
        <p className={styles.basketItem_infoPrice}>
          {
            product.prices.find(
              (price: PriceResponse) => price.id === userPrise
            )?.weight
          }{' '}
          г
        </p>
      </div>

      <div>
        <div className={styles.btnQuantityWrapper}>
          <button
            className={styles.btnQuantity}
            onClick={decreaseQuantity}
            disabled={selectedQuantity === 1}
          >
            <IconMinus className={styles.iconPlus} />
          </button>
          <span className={styles.selectQuantity}>{selectedQuantity}</span>
          <button
            className={styles.btnQuantity}
            onClick={increaseQuantity}
            disabled={selectedQuantity === 100}
          >
            <IconPlus className={styles.iconPlus} />
          </button>

          {showModal && (
            <ModalProductLimits
              onClick={handleClick}
              customStyles={customStyles.position}
            />
          )}
        </div>
      </div>

      <p className={styles.basketItem_infoName}>
        {totalPrice.toLocaleString()}{' '}
        <span className={styles.basketItem_infoSymbol}>&#x20B4;</span>
      </p>

      <button
        onClick={() => removeItem(idData)}
        type="button"
        className={styles.btnCloseModal}
      >
        <IconArrowClose className={styles.iconDeleteItem} />
      </button>
    </li>
  )
}

export default BasketItem
