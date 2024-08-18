import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import { ArrowLeft } from './ArrowLeft'
import { Link, useLocation } from 'react-router-dom'
import { paginationBlock, paginationItems } from './style'
import { ArrowRight } from './ArrowRight'

type PaginationCRMProps = {
  page: number | undefined
  pageQty: number
  setPage: (page: number) => void
  isLoading: boolean
}

export default function PaginationCRM({
  page,
  pageQty,
  setPage,
  isLoading
}: PaginationCRMProps) {
  const theme = useTheme()
  const location = useLocation()

  return (
    <Stack
      spacing={2}
      sx={{ ...paginationBlock, background: theme.palette.grey[50] }}
    >
      <Pagination
        count={pageQty}
        page={page}
        onChange={(_, num) => setPage(num)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowLeft, next: ArrowRight }}
            component={Link}
            to={`?page=${item.page}`}
            {...item}
            state={{ from: location.pathname + location.search }}
          />
        )}
        disabled={isLoading}
        sx={paginationItems}
      />
    </Stack>
  )
}
