import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { seacrhClient } from './style'
import { useEffect, useState } from 'react'

const CLEAR_TIMER_SEARCH = 2000

type CrmGlobalSearchProps = {
  search: string
  setSearch: (value: string) => void
  placeholder?: string
}

const CrmGlobalSearch: React.FC<CrmGlobalSearchProps> = ({
  placeholder,
  search,
  setSearch
}) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length > 1) {
        setSearch(debouncedSearchTerm)
      }
    }, CLEAR_TIMER_SEARCH)

    return () => {
      clearTimeout(handler)
    }
  }, [debouncedSearchTerm])

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="large" htmlColor="illustrations.darker" />
          </InputAdornment>
        )
      }}
      sx={seacrhClient}
      placeholder={placeholder}
      value={debouncedSearchTerm}
      onChange={(event) => setDebouncedSearchTerm(event.target.value)}
    />
  )
}

export default CrmGlobalSearch
