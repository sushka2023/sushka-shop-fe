import { BasketItemsResponse, NovaPoshtaDataResponse } from '../../types'
import {
  UseFormRegister,
  Control,
  UseFormSetValue,
  FieldErrors,
  UseFormClearErrors,
  FieldValues,
  UseFormSetError
} from 'react-hook-form'

export enum PaymentMethodTypes {
  wayforpay = 'wayforpay',
  postpaid = 'cash_on_delivery_np',
  byDetails = 'requisite'
}

export type Inputs = {
  firstName: string
  lastName: string
  email: string
  phone: string
  otherRecipient?: boolean | undefined
  fullNameOtherRecipient?: string | undefined
  phoneOtherRecipient?: string | undefined
  address: object | string | null
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
  register: UseFormRegister<Inputs | FieldValues>
  control: Control<Inputs, any>
  orderDetails: OrderDetailsType
  setValue: UseFormSetValue<Inputs | FieldValues>
  otherRecipient: boolean
  setOtherRecipient: React.Dispatch<React.SetStateAction<boolean>>
  isLoadingBasketItems: boolean
  isLoadingOrder: boolean
  errors: FieldErrors<Inputs>
  setError: UseFormSetError<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  address: object | string | null
  setAddress: React.Dispatch<React.SetStateAction<NovaPoshtaDataResponse>>
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedValue: string
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>
}

export type RequestPayment = {
  merchantAccount: string
  merchantDomainName: string
  merchantTransactionSecureType: string
  orderReference: string
  orderDate: string
  amount: number
  currency: string
  productName: string[]
  productCount: number[]
  productPrice: number[]
  merchantSignature?: string
}
