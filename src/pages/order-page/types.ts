import { BasketItemsResponse } from '../../types'
import { UseFormRegister, Control, UseFormSetValue } from 'react-hook-form'

export enum PaymentMethodTypes {
  wayforpay = 'liqpay',
  postpaid = 'cash_on_delivery_np',
  byDetails = 'by_details'
}

export type Inputs = {
  firstName: string
  lastName: string
  email: string
  phone: string
  otherRecipient: boolean
  fullNameOtherRecipient: string
  phoneOtherRecipient: string
  paymentType: PaymentMethodTypes
  comment: string
  call: boolean
}

export type OrderDetailsType = Inputs

export type OrderContextType = {
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  orderList: BasketItemsResponse[]
  setOrderList: React.Dispatch<React.SetStateAction<BasketItemsResponse[]>>
  register: UseFormRegister<Inputs>
  control: Control<Inputs, any>
  orderDetails: OrderDetailsType
  setValue: UseFormSetValue<Inputs>
  otherRecipient: boolean
  setOtherRecipient: React.Dispatch<React.SetStateAction<boolean>>
  isLoadingBasketItems: boolean
  isLoadingOrder: boolean
}
