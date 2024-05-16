import { useState, Fragment, useEffect, createContext } from 'react'
import { Box, Grid } from '@mui/material'
import { ORDER_FORM_DEFAULT_VALUES, STEPS } from './constants'
import { containerStyle } from './style'
import OrderStepper from '../../components/Order-stepper'
import StapperButtons from '../../components/Stapper-buttons'
import OrderContacts from '../../components/Order-contacts'
import OrderCard from '../../components/Order-card'
import { getBasketItems } from './operation'
import { BasketItemsResponse, UserResponse } from '../../types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { OrderDelivery } from '../../components/Order-delivery'
import { useAuth } from '../../hooks/use-auth'
import { Inputs, OrderDetailsType, OrderContextType } from './types'

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

  useEffect(() => {
    if (user) {
      overwriteFormValues(user)
    }
  }, [user, setValue])

  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const products = await getBasketItems()
        setOrderList(products)
      } catch (error) {
        console.error('Помилка під час завандаження замовлення:', error)
      }
    }

    if (!orderList.length) {
      fetchBasketItems()
    }
  }, [orderList])

  const getStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <OrderContacts />
      case 1:
        return <OrderDelivery />
      case 2:
        return <div style={{ marginBottom: '500px' }}>Оплата</div>
      default:
        break
    }
  }

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
                {getStepContent(activeStep)}
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
