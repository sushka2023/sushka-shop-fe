import { useState, Fragment, useEffect, createContext } from 'react'
import { Box, Grid } from '@mui/material'
import { ORDER_FORM_DEFAULT_VALUES, STEPS } from './constants'
import { containerStyle } from './style'
import OrderStepper from '../../components/Order-stepper'
import StapperButtons from '../../components/Stapper-buttons'
import OrderContacts from '../../components/Order-contacts'
import OrderCard from '../../components/Order-card'
import { getBasketItems, getProductForId } from './operation'
import { ProductResponse, UserResponse } from '../../types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { OrderDelivery } from '../../components/Order-delivery'
import { useAuth } from '../../hooks/use-auth'
import { BasketItemsResponse } from '../../types'
import { Inputs, OrderDetailsType, OrderContextType } from './types'
import { OrderPayment } from '../../components/Order-payment/OrderPayment'
import { getLocalStorageData } from '../../utils/local-storage'

type OrderType = {
  id: number
  quantity: number
  price_id_by_the_user: number
  productId: string
}

const OrderContext = createContext<OrderContextType>(null)

const OrderPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [orderList, setOrderList] = useState<BasketItemsResponse[]>([])
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType>(null)
  const [otherRecipient, setOtherRecipient] = useState(false)
  const { user } = useAuth()

  const { handleSubmit, register, control, setValue } = useForm<Inputs>({
    defaultValues: ORDER_FORM_DEFAULT_VALUES
  })

  const overwriteFormValues = (user: UserResponse) => {
    setValue('firstName', user.first_name || '')
    setValue('lastName', user.last_name || '')
    setValue('email', user.email || '')
    setValue('phone', user.phone_number || '')
  }

  const CONTEXT_DATA = {
    activeStep,
    setActiveStep,
    orderList,
    setOrderList,
    register,
    control,
    orderDetails,
    setValue,
    otherRecipient,
    setOtherRecipient
  }

  const STEP_CONTENT = [
    <OrderContacts key={0} />,
    <OrderDelivery key={1} />,
    <OrderPayment key={2} />
  ]

  const fetchBasketItems = async () => {
    try {
      const products = await getBasketItems()
      setOrderList(products)
    } catch (error) {
      console.error('Помилка під час завандаження замовлення:', error)
    }
  }

  const pricing = (priceArray: BasketItemsResponse[]) => {
    return priceArray.map((item) => {
      const price_id = item.price_id_by_the_user
      const prices = item.product.prices

      const index = prices.findIndex((price) => price.id === price_id)

      if (index !== -1) {
        const [matchedPrice] = prices.splice(index, 1)
        prices.unshift(matchedPrice)
      }
      return item
    })
  }

  const fetchLocalStorageOrder = async () => {
    try {
      const localStorageData = getLocalStorageData('product-orders')
      const promises = (localStorageData as OrderType[]).map(async (order) => {
        const product = await getProductForId(order.productId)
        return {
          id: order.id,
          price_id_by_the_user: order.price_id_by_the_user,
          quantity: order.quantity,
          product: product as unknown as ProductResponse
        }
      })
      const updatedProductOrders: BasketItemsResponse[] =
        await Promise.all(promises)

      setOrderList(pricing(updatedProductOrders))
    } catch (error) {
      console.error('Помилка під час завандаження замовлення:', error)
    }
  }

  useEffect(() => {
    if (user) {
      overwriteFormValues(user)
      fetchBasketItems()
      return
    }
    fetchLocalStorageOrder()
  }, [user])

  const onSubmit: SubmitHandler<Inputs> = (data) => setOrderDetails(data)

  return (
    <OrderContext.Provider value={CONTEXT_DATA}>
      <Box sx={containerStyle} mt={5}>
        {activeStep === STEPS.length ? (
          <Fragment>{/* notification */}</Fragment>
        ) : (
          <Box
            pt="50px"
            sx={{ flexGrow: 1 }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container width="88%" spacing={0} alignItems="flex-start">
              <Grid item xs={9}>
                <OrderStepper />
                {STEP_CONTENT[activeStep]}
                <StapperButtons />
              </Grid>
              <OrderCard />
            </Grid>
          </Box>
        )}
      </Box>
    </OrderContext.Provider>
  )
}

export { OrderContext, OrderPage }
