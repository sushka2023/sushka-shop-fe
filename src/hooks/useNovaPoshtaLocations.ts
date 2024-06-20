import { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../axios/settings'

type WarehousesTypes = {
  address_warehouse: string
  id: number
}

const TIMER = 1000

export const useNovaPoshtaLocations = ({
  url,
  numSearch,
  valInputWarehouse,
  setValInputWarehouse
}: {
  url: string
  numSearch: number
  valInputWarehouse: string
  setValInputWarehouse: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [warehouses, setWarehouses] = useState<WarehousesTypes[]>([])
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [newRequest, setNewRequest] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [messageOptionLoc, setMessageOptionLoc] = useState<string>('')

  const fetchNovaPoshtaWarehouse = useCallback(
    async (cityRef: string, searchTerm: string) => {
      try {
        const response = await axiosInstance.get(url, {
          params: {
            settle_ref: cityRef,
            search_term: searchTerm
          }
        })

        if (!response.data.length) {
          throw new Error('Не знайдено')
        }

        return response.data
      } catch (error) {
        console.error('Error fetching warehouses:', error)
        throw error
      }
    },
    []
  )

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
    [settleRef, fetchNovaPoshtaWarehouse]
  )

  useEffect(() => {
    if (!valInputWarehouse) {
      setWarehouses([])
      setNewRequest(true)
      setMessageOptionLoc('Почніть водити текст...')
    }
  }, [valInputWarehouse, setMessageOptionLoc])

  useEffect(() => {
    if (newRequest && valInputWarehouse.length >= numSearch) {
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
