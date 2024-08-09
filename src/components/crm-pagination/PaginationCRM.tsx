import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import { ArrowLeft } from '../../pages/crm-clients-page/ArrowLeft'
import { ArrowRight } from '../../pages/crm-clients-page/ArrowRight'

type PaginationCRMProps = {
  page: number
  pageQty: number
  setPage: (page: number) => void
}

export default function PaginationCRM({
  page,
  pageQty,
  setPage
}: PaginationCRMProps) {
  const theme = useTheme()

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
        count={pageQty}
        page={page}
        onChange={(_, num) => setPage(num)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowLeft, next: ArrowRight }}
            {...item}
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
