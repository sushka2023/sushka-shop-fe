import { Fragment } from 'react/jsx-runtime'
import IconSearch from '../../../../icons/search.svg?react'
import { Box, IconButton, Popover } from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import { OutlinedInput } from '../../../UI/Field'
import { SearchResult } from './SearchResult'
import axiosInstance from '../../../../axios/settings'
import { ProductResponse, ProductWithTotalResponse } from '../../../../types'
import axios from 'axios'

const Search = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<ProductResponse[] | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getSearchValue = async (value: string) => {
    try {
      const result = await axiosInstance.get<ProductWithTotalResponse>(
        `/api/product/search/?limit=10&offset=0&search_query=${value}`
      )
      return result.data.products
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data?.detail || e.message || 'Axios error')
      }
      throw new Error('Невідома помилка')
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeValue = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setSearchValue(value)
    setIsLoading(true)
    setSearchResult(null)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (value.length < 3) {
      setIsLoading(false)
      setSearchResult(null)
      setError(null)
      return
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await getSearchValue(value)
        setSearchResult(data)
        setError(null)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        }
      } finally {
        setIsLoading(false)
        timeoutRef.current = null
      }
    }, 1000)
  }

  return (
    <Fragment>
      <IconButton onClick={handleClick} sx={{ padding: 0 }} disableRipple>
        <IconSearch
          style={{ width: 30, height: 30, fill: 'green', stroke: 'green' }}
        />
      </IconButton>
      <Popover
        sx={{
          '.MuiPaper-rounded': {
            borderRadius: '8px'
          }
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box>
          <OutlinedInput
            fullWidth
            value={searchValue}
            onChange={(e) => handleChangeValue(e)}
            sx={{
              '& .MuiInputBase-input.MuiOutlinedInput-input': {
                backgroundColor: 'secondary.lighter',
                padding: 1
              }
            }}
          />
          <SearchResult
            data={searchResult}
            error={error}
            isLoading={isLoading}
          />
        </Box>
      </Popover>
    </Fragment>
  )
}

export { Search }
