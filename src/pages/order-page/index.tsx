import { useState, useEffect, createContext, Fragment } from 'react'
import { Box, Grid } from '@mui/material'
import {
  ADDRESS_POST_TYPE,
  ORDER_FORM_DEFAULT_VALUES,
  STEPS,
  WAREHOUSE_POST_TYPE
} from './constants'
import { containerStyle } from './style'
import OrderStepper from '../../components/Order-stepper'
import StapperButtons from '../../components/Stapper-buttons'
import OrderContacts from '../../components/Order-contacts'
import OrderCard from '../../components/Order-card'
import {
  convertToKopecks,
  loadBasketItems,
  loadLocalStorageItems,
  sendOrder
} from './utils'
import { NovaPoshtaDataResponse, UserResponse } from '../../types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { OrderDelivery } from '../../components/Order-delivery'
import { useAuth } from '../../hooks/use-auth'
import { BasketItemsResponse } from '../../types'
import {
  Inputs,
  OrderDetailsType,
  OrderContextType,
  PaymentMethodTypes
} from './types'
import { OrderPayment } from '../../components/Order-payment/OrderPayment'
import { yupResolver } from '@hookform/resolvers/yup'
import { addressInfoSchema, userInfoSchema } from './validationSchemas'
import { calculateTotal } from '../../helpers/formatterTotalPrice'
import { ModalCustomFormRadius } from '../../components/Modal-custom-btn/ModalCustomFormRadius'
import { AddressAddSchema } from '../../components/auth/validation'
import { OrderNotification } from '../../components/Order-notification'
import axios from 'axios'

const ORDER_HISTORY_PATH = '/account?tab=3'

const OrderContext = createContext<OrderContextType>({} as OrderContextType)

const OrderPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [orderList, setOrderList] = useState<BasketItemsResponse[]>([])
  const [orderDetails, setOrderDetails] = useState({} as OrderDetailsType)
  const [otherRecipient, setOtherRecipient] = useState(false)
  const [isLoadingBasketItems, setIsLoadingBasketItems] = useState(false)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
  const [isError, setIsError] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isNotificationModal, setIsNotificationModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState<number | null>(null)
  const [address, setAddress] = useState<NovaPoshtaDataResponse | object>({})
  const [selectedValue, setSelectedValue] = useState('novaPoshtaBranches')

  const postType =
    selectedValue === 'novaPoshtaAddress'
      ? ADDRESS_POST_TYPE
      : WAREHOUSE_POST_TYPE

  const { user } = useAuth()
  const activeAddressSchema = !user
    ? AddressAddSchema(selectedValue)
    : addressInfoSchema
  const activeSchema: Record<number, any> = {
    0: userInfoSchema,
    1: activeAddressSchema
  }

  const {
    handleSubmit,
    register,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: ORDER_FORM_DEFAULT_VALUES,
    resolver:
      activeStep < STEPS.length - 1
        ? yupResolver(activeSchema[activeStep])
        : undefined
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
    errors,
    setError,
    clearErrors,
    isOpenModal,
    setIsOpenModal,
    address,
    setAddress,
    selectedValue,
    setSelectedValue
  }

  const STEP_CONTENT = [
    <OrderContacts key={0} />,
    <OrderDelivery key={1} />,
    <OrderPayment key={2} />
  ]

  const handlePayment = async () => {
    try {
      const sendOrderResponse = await sendOrder(
        orderDetails,
        setOrderNumber,
        setIsError,
        setIsLoadingOrder,
        setIsNotificationModal,
        user,
        orderList,
        postType
      )

      if (sendOrderResponse) {
        const API_URL = import.meta.env.VITE_API_URL
        const BASE_API_MONO = import.meta.env.VITE_URL_MONO
        const X_TOKEN = import.meta.env.VITE_X_TOKEN
        const ORDER_HISTORY_URL =
          import.meta.env.VITE_API_DOMAIN_NAME + ORDER_HISTORY_PATH

        const response = await axios.post(
          BASE_API_MONO,
          {
            amount: convertToKopecks(calculateTotal(orderList)),
            redirectUrl: ORDER_HISTORY_URL,
            webHookUrl: `${API_URL}/api/webhook/monobank`
          },
          {
            headers: {
              'X-Token': X_TOKEN,
              'Content-Type': 'application/json'
            }
          }
        )

        window.location.href = response.data.pageUrl
      }
    } catch (e) {
      setIsNotificationModal(true)
      setIsError(e.message)
    }
  }
  useEffect(() => {
    if (user) {
      overwriteFormValues(user)
      loadBasketItems(setOrderList, setIsError, setIsLoadingBasketItems)
      return
    }
    loadLocalStorageItems(setOrderList, setIsError, setIsLoadingBasketItems)
  }, [user])

  const onSubmitOrder: SubmitHandler<Inputs> = async (data) => {
    setOrderDetails(data)

    if (
      activeStep === STEPS.length - 1 &&
      data.paymentType === PaymentMethodTypes.wayforpay
    ) {
      return handlePayment()
    }

    if (activeStep === STEPS.length - 1) {
      return sendOrder(
        data,
        setOrderNumber,
        setIsError,
        setIsLoadingOrder,
        setIsNotificationModal,
        user,
        orderList,
        postType
      )
    }

    setActiveStep((prevStep) => prevStep + 1)
  }

  return (
    <Fragment>
      {user && (
        <ModalCustomFormRadius
          openModal={isOpenModal}
          setOpenModal={setIsOpenModal}
        />
      )}
      <OrderContext.Provider value={CONTEXT_DATA}>
        <OrderNotification
          isError={isError}
          setIsError={setIsError}
          isNotificationModal={isNotificationModal}
          orderNumber={orderNumber}
          user={user}
          setIsNotificationModal={setIsNotificationModal}
        />
        <Box sx={containerStyle} mt={5}>
          <Box
            pt="50px"
            sx={{ flexGrow: 1 }}
            component="form"
            onSubmit={handleSubmit(onSubmitOrder)}
            noValidate
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
        </Box>
      </OrderContext.Provider>
    </Fragment>
  )
}

export { OrderContext, OrderPage }
