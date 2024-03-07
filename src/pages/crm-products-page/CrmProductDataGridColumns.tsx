import { GridColDef } from '@mui/x-data-grid'
import {
  ChipCell,
  StyledCategoryTextCell,
  StyledProductNumberCell
} from './CrmProductsPageStyledComponents'
import {
  ProductCategoryResponse,
  ProductSubCategoryResponse
} from '../../types'
import { Box, IconButton } from '@mui/material'
import DeleteIcon from '../../icons/delete.svg?react'
import EditIcon from '../../icons/edit-icon.svg?react'
import styles from './crmProductsPage.module.scss'
import { OPTIONS } from './CrmProductsPage'

export const columns = (
  mainCategories: ProductCategoryResponse[] | null
): GridColDef[] => [
  {
    field: 'id',
    headerName: 'Номер',
    sortable: false,
    maxWidth: 150,
    renderCell: (params) => (
      <StyledProductNumberCell>#{params.value}</StyledProductNumberCell>
    )
  },
  {
    field: 'name',
    headerName: 'Назва товару',
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <StyledCategoryTextCell>{params.value}</StyledCategoryTextCell>
    )
  },
  {
    field: 'product_category_id',
    headerName: 'Категорія',
    flex: 1,
    sortable: false,
    valueGetter: (params) => {
      const category = mainCategories?.find(
        (mainCategory) => mainCategory.id === params.value
      )
      if (!category) {
        return params.value
      }

      return category.name
    },
    renderCell: (params) => (
      <StyledCategoryTextCell>{params.value}</StyledCategoryTextCell>
    )
  },
  {
    field: 'sub_categories',
    headerName: 'Саб-категорія',
    flex: 1,
    sortable: false,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value
      }

      const subCategories = params.value as ProductSubCategoryResponse[]
      return subCategories.map((category) => category.name).join(', ')
    },
    renderCell: (params) => (
      <StyledCategoryTextCell>{params.value}</StyledCategoryTextCell>
    )
  },
  {
    field: 'product_status',
    headerName: 'Статус товару',
    flex: 1,
    sortable: false,
    valueGetter: (params) => {
      const option = OPTIONS.find((option) => option.value === params.value)

      if (!option) {
        return params.value
      }

      return option.label
    },
    renderCell: (params) => (
      <ChipCell value={params.value} status={params.row.product_status} />
    )
  },
  {
    field: 'edit',
    headerName: 'Змінити',
    sortable: false,
    renderCell: () => {
      return (
        <Box>
          <IconButton
            sx={{
              width: '24px',
              height: '24px',
              padding: 0,
              marginRight: '26px'
            }}
          >
            <DeleteIcon className={styles.deleteIcon} />
          </IconButton>
          <IconButton
            sx={{
              width: '24px',
              height: '24px',
              padding: 0
            }}
          >
            <EditIcon className={styles.editIcon} />
          </IconButton>
        </Box>
      )
    }
  }
]
