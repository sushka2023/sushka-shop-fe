import styles from './crmClientsPage.module.scss'

import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, useTheme } from '@mui/material'

const ArrowLeft = () => {
  return (
    <Box>
      <ArrowBackIcon /> Попередня
    </Box>
  )
}
const ArrowRight = () => {
  return (
    <Box>
      Наступна <ArrowForwardIcon />
    </Box>
  )
}

type PaginationCRMProps = {
  page: number
  pageQty: number
  setPage: (page: number) => void
}

export default function PaginationCRM(props: PaginationCRMProps) {
  const { page, pageQty, setPage } = props

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
        className={styles.pagination}
        count={pageQty}
        page={page}
        onChange={(_, num) => setPage(num)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowLeft, next: ArrowRight }}
            {...item}
          />
        )}
      />
    </Stack>
  )
}
