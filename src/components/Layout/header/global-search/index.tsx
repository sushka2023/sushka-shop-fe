import { Fragment } from 'react/jsx-runtime'
import IconSearch from '../../../../icons/search.svg?react'
import { Box, IconButton, Popover } from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import { OutlinedInput } from '../../../UI/Field'
import { SearchResult } from './SearchResult'
import { ProductResponse } from '../../../../types'
import { inputStyle, popoverStyle, searchIconStyle } from './style'
import { getSearchValue } from '../../../../redux/products/operation'

const Search = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<ProductResponse[] | null>(
    null
  )
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearchValue('')
    setSearchResult(null)
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
      <IconButton onClick={handleClick} disableRipple sx={searchIconStyle}>
        <IconSearch style={{ fill: 'currentcolor', stroke: 'currentcolor' }} />
      </IconButton>
      <Popover
        sx={popoverStyle}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box padding={1}>
          <OutlinedInput
            fullWidth
            value={searchValue}
            onChange={(e) => handleChangeValue(e)}
            sx={inputStyle}
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
