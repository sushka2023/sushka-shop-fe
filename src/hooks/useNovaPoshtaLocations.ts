import { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../axios/settings'

const fetchNovaPoshtaWarehouse = async (
  cityRef: string,
  searchTerm: string
) => {
  const response = await axiosInstance.get(
    '/api/nova_poshta/warehouses/branches/',
    {
      params: {
        settle_ref: cityRef,
        search_term: searchTerm
      }
    }
  )

  if (!response.data.length) {
    throw new Error('Не знайдено')
  }

  return response.data
}

type WarehousesTypes = {
  address_warehouse: string
  id: number
}
const TIMER = 1000
export const useNovaPoshtaLocations = () => {
  const [valInputWarehouse, setValInputWarehouse] = useState<string>('')
  const [warehouses, setWarehouses] = useState<WarehousesTypes[]>([])
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [newRequest, setNewRequest] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [messageOptionLoc, setMessageOptionLoc] = useState<string>('')

  const fetchWarehouses = useCallback(
    async (searchTerm: string) => {
      if (!settleRef) return
      setLoading(true)

      try {
        const data = await fetchNovaPoshtaWarehouse(settleRef, searchTerm)
        setWarehouses(data)
      } catch (error) {
        console.error('Error fetching warehouses:', error)
        setMessageOptionLoc('Не знайдено')
      } finally {
        setLoading(false)
      }
    },
    [settleRef, setMessageOptionLoc]
  )

  useEffect(() => {
    if (!valInputWarehouse) {
      setWarehouses([])
      setNewRequest(true)
      setMessageOptionLoc('Почніть водити текст...')
    }
  }, [valInputWarehouse, setMessageOptionLoc])

  useEffect(() => {
    if (newRequest && valInputWarehouse) {
      const timer = setTimeout(() => {
        setMessageOptionLoc('Почніть водити текст...')
        fetchWarehouses(valInputWarehouse)
      }, TIMER)

      return () => clearTimeout(timer)
    }
  }, [valInputWarehouse, newRequest, fetchWarehouses, setMessageOptionLoc])

  return {
    valInputWarehouse,
    setValInputWarehouse,
    warehouses,
    setWarehouses,
    setSettleRef,
    setNewRequest,
    loading,
    messageOptionLoc
  }
}
