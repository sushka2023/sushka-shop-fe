import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import {
  CURRENCY,
  ORDER_FORM_DEFAULT_VALUES,
  STEPS,
  TRANSACTION_SECURE_TYPE
} from './constants'
import { containerStyle } from './style'
import OrderStepper from '../../components/Order-stepper'
import StapperButtons from '../../components/Stapper-buttons'
import OrderContacts from '../../components/Order-contacts'
import OrderCard from '../../components/Order-card'
import {
  generateSignature,
  loadBasketItems,
  loadLocalStorageItems,
  sendOrder
} from './utils'
import { UserResponse } from '../../types'
import { useForm, SubmitHandler, Resolver } from 'react-hook-form'
import { OrderDelivery } from '../../components/Order-delivery'
import { useAuth } from '../../hooks/use-auth'
import { BasketItemsResponse } from '../../types'
import {
  Inputs,
  OrderDetailsType,
  OrderContextType,
  PaymentMethodTypes,
  RequestPayment
} from './types'
import { OrderPayment } from '../../components/Order-payment/OrderPayment'
import { yupResolver } from '@hookform/resolvers/yup'
import { userInfoSchema } from './validationSchemas'
import { calculateTotal } from '../../helpers/formatterTotalPrice'

const OrderContext = createContext<OrderContextType>({} as OrderContextType)

const OrderPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [orderList, setOrderList] = useState<BasketItemsResponse[]>([])
  const [orderDetails, setOrderDetails] = useState({} as OrderDetailsType)
  const [otherRecipient, setOtherRecipient] = useState(false)
  const [isLoadingBasketItems, setIsLoadingBasketItems] = useState(false)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
  const [error, setError] = useState('')
  const [orderNumber, setOrderNumber] = useState<number | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: ORDER_FORM_DEFAULT_VALUES,
    resolver: yupResolver(userInfoSchema) as Resolver<Inputs>
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
    setOtherRecipient,
    isLoadingBasketItems,
    isLoadingOrder,
    errors
  }

  const STEP_CONTENT = [
    <OrderContacts key={0} />,
    <OrderDelivery key={1} />,
    <OrderPayment key={2} />
  ]

  const generateOrderReference = () => {
    return `ORDER-${new Date().getTime()}`
  }

  const handlePayment = async () => {
    const merchantAccount = import.meta.env.VITE_API_MERCHANT_ACCOUNT
    const merchantDomainName = import.meta.env.VITE_API_DOMAIN_NAME
    const orderReference = generateOrderReference()
    const productName = orderList.map((item) => item.product.name)
    const productCount = orderList.map((item) => item.quantity)
    const productPrice = orderList.map((item) => item.product.prices[0].price)
    const orderDate = Math.floor(Date.now() / 1000).toString()
    const amount = calculateTotal(orderList)

    const requestData: RequestPayment = {
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      productName,
      productCount,
      productPrice,
      merchantTransactionSecureType: TRANSACTION_SECURE_TYPE,
      currency: CURRENCY
    }

    requestData.merchantSignature = generateSignature(requestData)

    const wayforpay = new Wayforpay()

    wayforpay.run(requestData, function onApproved() {
      sendOrder(orderDetails, setOrderNumber, setError, setIsLoadingOrder)

      user ? navigate('/account') : navigate('/')
    })
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://secure.wayforpay.com/server/pay-widget.js'
    script.id = 'widget-wfp-script'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (user) {
      overwriteFormValues(user)
      loadBasketItems(setOrderList, setError, setIsLoadingBasketItems)
      return
    }
    loadLocalStorageItems(setOrderList, setError, setIsLoadingBasketItems)
  }, [user])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setOrderDetails(data)

    if (
      activeStep === STEPS.length - 1 &&
      data.paymentType === PaymentMethodTypes.wayforpay
    ) {
      return handlePayment()
    }

    if (activeStep === STEPS.length - 1) {
      return sendOrder(data, setOrderNumber, setError, setIsLoadingOrder)
    }

    setActiveStep((prevStep) => prevStep + 1)
  }

  return (
    <OrderContext.Provider value={CONTEXT_DATA}>
      {orderNumber || (error && <div>{orderNumber || error}</div>)}
      <Box sx={containerStyle} mt={5}>
        <Box
          pt="50px"
          sx={{ flexGrow: 1 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Box>{}</Box>
          <Grid container width="88%" spacing={0} alignItems="flex-start">
            <Grid item xs={9}>
              <OrderStepper />
              {STEP_CONTENT[activeStep]}
              <StapperButtons />
            </Grid>
            <OrderCard />
          </Grid>
        </Box>
      </Box>
    </OrderContext.Provider>
  )
}

export { OrderContext, OrderPage }
