import { useEffect, useState } from 'react'
import axiosInstance from '../axios/settings'

export const useNovaPoshtaLocations = () => {
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [valInputWarehouse, setValInputWarehouse] = useState<string | null>('')
  const [settleRef, setSettleRef] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [newRequest, setNewRequest] = useState<boolean>(true)
  console.log('✌️newRequest --->', newRequest)

  useEffect(() => {
    if (newRequest && valInputWarehouse) {
      const timer = setTimeout(() => {
        fetchWarehouses(valInputWarehouse)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [valInputWarehouse])

  const fetchWarehouses = async (val: string) => {
    setLoading(true)
    try {
      if (settleRef) {
        const response = await axiosInstance.get(
          '/api/nova_poshta/warehouses/branches/',
          {
            params: {
              settle_ref: settleRef,
              search_term: val
            }
          }
        )
        console.log('✌️response --->', response)
        setWarehouses(response.data)
      }
    } catch (error) {
      console.log('✌️error --->', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    valInputWarehouse,
    setValInputWarehouse,
    warehouses,
    setWarehouses,
    setSettleRef,
    loading,
    setNewRequest,
    newRequest
  }
}
