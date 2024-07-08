import CustomIcons from './PaginationCRM'
import StickyHeadTable from './StickyHeadTable'
import { Box } from '@mui/material'

// import styles from './crmClientsPage.module.scss'

const CrmClientsPage = () => {
  return (
    <Box>
      <h2>Client page</h2>
      <StickyHeadTable />
      <CustomIcons />
    </Box>
  )
}

export default CrmClientsPage
