import styles from './crmClientsPage.module.scss'

import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import { ArrowLeft } from './ArrowLeft'
import { ArrowRight } from './ArrowRight'
import { Link, useLocation } from 'react-router-dom'

type PaginationCRMProps = {
  page: number | undefined
  pageQty: number
  setPage: (page: number) => void
}

export default function PaginationCRM({
  page,
  pageQty,
  setPage
}: PaginationCRMProps) {
  const theme = useTheme()
  const location = useLocation()
  console.log('location:', location.pathname + location.search)

  return (
    <Stack
      spacing={2}
      sx={{
        background: theme.palette.grey[50],
        alignItems: 'center',
        p: '20px'
      }}
    >
      <Pagination
        className={styles.pagination}
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
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'accent.darker'
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'accent.darker',
            color: 'background.default'
          }
        }}
      />
    </Stack>
  )
}
