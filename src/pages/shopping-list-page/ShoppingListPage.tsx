/* eslint-disable max-lines */
import styles from './ShoppingListPage.module.scss'
import { useEffect, useState } from 'react'
import BasketItem from './BasketItem'
import BasketEmpty from './BasketEmpty'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../axios/settings'
import { BasketItemsResponse, ProductResponse } from '../../types'
import * as React from 'react'

import { updateCount } from '../../redux/basket-item-count/slice'

type OrderType = {
  id: number
  quantity: number
  price_id_by_the_user: number
  productId: string
}

const PRODUCT_ORDERS_LS_KEY = 'product-orders'

const getProductForId = async (productId: string) => {
  const { data } = await axiosInstance.get<ProductResponse>(
    `api/product/${productId}`
  )
  return data
}

const getBasketItems = async () => {
  const { data } =
    await axiosInstance.get<BasketItemsResponse[]>(`api/basket_items/`)

  return data
}

const removeProduct = async (id: number) => {
  const data = await axiosInstance.delete(`api/basket_items/remove`, {
    data: {
      id
    }
  })

  return data
}

type Prices = {
  [key: number]: number
}

const ShoppingListPage = () => {
  const [basketList, setBasketList] = useState<BasketItemsResponse[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [prices, setPrices] = useState<Prices>({})

  const isAuth = useSelector((state: RootState) => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth) {
      const fetchBasket = async () => {
        try {
          setIsLoading(true)
          const data = await getBasketItems()
          setBasketList(data)
        } catch (error) {
          setIsLoading(false)
          console.error('Помилка запиту:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchBasket()
    } else {
      const fetchData = async () => {
        try {
          setIsLoading(true)
          const productOrders = JSON.parse(
            localStorage.getItem(PRODUCT_ORDERS_LS_KEY) ?? '[]'
          )

          const promises = (productOrders as OrderType[]).map(async (order) => {
            const product = await getProductForId(order.productId)
            return {
              id: order.id,
              price_id_by_the_user: order.price_id_by_the_user,
              quantity: order.quantity,
              product
            }
          })

          const updatedProductOrders = await Promise.all(promises)
          const filteredOrders = updatedProductOrders.filter((order) =>
            order.product.prices.some(
              (price) =>
                order.price_id_by_the_user === price.id && !price.is_deleted
            )
          )
          setBasketList(filteredOrders)
        } catch (error) {
          setIsLoading(false)
          console.error('Error fetching data:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [])

  useEffect(() => {
    if (!isAuth) calculateTotalAmount()
  }, [basketList])

  const handlePriceChange = (id: number, newPrice: number) => {
    setPrices((prevPrices) => {
      const updatedPrices = {
        ...prevPrices,
        [id]: newPrice
      }

      const allPricesValues = Object.values(updatedPrices)

      // Сумуємо значення
      const total = allPricesValues.reduce((acc, price) => acc + price, 0)

      setTotalAmount(total)

      return updatedPrices
    })
  }
  const removeProductFromBacket = async (id: number) => {
    try {
      if (isAuth) {
        await removeProduct(id)
        const updatedBasket = await getBasketItems()
        setBasketList(updatedBasket)

        dispatch(updateCount(updatedBasket))
      } else {
        const productOrders = JSON.parse(
          localStorage.getItem(PRODUCT_ORDERS_LS_KEY) ?? '[]'
        )

        const productIndex = (productOrders as OrderType[]).findIndex(
          (item) => item.id === id
        )
        productOrders.splice(productIndex, 1)

        localStorage.setItem(
          PRODUCT_ORDERS_LS_KEY,
          JSON.stringify(productOrders)
        )

        dispatch(updateCount(productOrders))

        const updatedBasketList = basketList.filter((item) => item.id !== id)

        setBasketList(updatedBasketList)
      }

      setPrices((prevPrices) => {
        const updatedPrices = { ...prevPrices }
        delete updatedPrices[id]
        return updatedPrices
      })
    } catch (error) {
      console.error(error)
    }
  }

  const calculateTotalAmount = () => {
    const pricesValue = Object.values(prices)
    const total = pricesValue.reduce((acc, price) => acc + price, 0)
    setTotalAmount(total)
  }

  return (
    <React.Fragment>
      {!isLoading ? (
        basketList.length > 0 ? (
          <div className={styles.container}>
            <div className={styles.shopWrapper}>
              <div className={styles.shopTitleWrapper}>
                <h2 className={styles.shopTitle}>Ваше замовлення</h2>
                <button
                  type="button"
                  onClick={() => navigate('/catalog/all')}
                  className={styles.btnBackCatalog}
                >
                  Продовжити покупки
                </button>
              </div>

              <ul className={styles.shopList_descriptions}>
                <li className={styles.shopList_description}>Продукт</li>
                <li className={styles.shopList_description}>Кількість</li>
                <li className={styles.shopList_description}>Ціна</li>
              </ul>

              <ul className={styles.basketList}>
                {basketList?.map(
                  ({ id, product, price_id_by_the_user, quantity }) => (
                    <BasketItem
                      key={id}
                      product={product}
                      userPrise={price_id_by_the_user}
                      quantity={quantity}
                      idData={id}
                      removeItem={removeProductFromBacket}
                      updateTotalValue={handlePriceChange}
                    />
                  )
                )}
              </ul>
            </div>

            <div className={styles.informationWrapper}>
              <h3 className={styles.informationTitle}>Інформація</h3>
              <div>
                <p className={styles.informationTotal}>Сума</p>
                <p className={styles.informationNumber}>
                  {totalAmount.toLocaleString()}{' '}
                  <span className={styles.informationSymbol}>&#x20B4;</span>
                </p>
              </div>

              <button className={styles.informationBtn} type="button">
                Оформити замовлення
              </button>
            </div>
          </div>
        ) : (
          <BasketEmpty />
        )
      ) : (
        <p>Завантаження...</p>
      )}
    </React.Fragment>
  )
}

export default ShoppingListPage
