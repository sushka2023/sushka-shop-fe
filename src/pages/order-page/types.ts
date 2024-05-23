import { BasketItemsResponse } from '../../types'
import { UseFormRegister, Control, UseFormSetValue } from 'react-hook-form'

export type Inputs = {
  firstName: string
  lastName: string
  email: string
  phone: string
  otherRecipient: boolean
  fullNameOtherRecipient: string
  phoneOtherRecipient: string
}

export type OrderDetailsType = Inputs | null

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
} | null
