import axios from 'axios'
import axiosInstance from '../../../../axios/settings'
import { Dispatch, SetStateAction } from 'react'

const LIMIT = 5

const handleResponse = (
  response: any,
  setProducts: Dispatch<SetStateAction<any[]>>,
  setHasMore: Dispatch<SetStateAction<boolean>>
) => {
  const fetchedProducts = response.data?.products || []
  setProducts((prev) => [...prev, ...fetchedProducts])

  const hasMore = fetchedProducts.length === LIMIT
  setHasMore(hasMore)

  return hasMore
}

const handleError = (
  error: any,
  setHasMore: Dispatch<SetStateAction<boolean>>
) => {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    setHasMore(false)
  }
}

export const getProducts = async (
  query: string,
  offset: number,
  setProducts: Dispatch<SetStateAction<any[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setHasMore: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get('/api/product/search/', {
      params: {
        limit: LIMIT,
        offset: offset,
        search_query: query
      }
    })

    const hasMore = handleResponse(response, setProducts, setHasMore)

    if (!hasMore) {
      setHasMore(false)
    }
  } catch (error) {
    handleError(error, setHasMore)
  } finally {
    setLoading(false)
  }
}
