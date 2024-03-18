import {
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import SortIcon from '../../icons/sort.svg?react'
import styles from './crmProductsPage.module.scss'
import ExpandMoreIcon from '../../icons/ExpandMoreIcon.svg?react'
import { ProductCategoryResponse } from '../../types'

type SelectProductCategoryProps = {
  category: string
  handleCategoryChange: (event: SelectChangeEvent) => void
  mainCategories: ProductCategoryResponse[] | null
}
const SelectProductCategory = ({
  category,
  handleCategoryChange,
  mainCategories
}: SelectProductCategoryProps) => {
  return (
    <Select
      startAdornment={
        <InputAdornment position="start">
          <SortIcon />
        </InputAdornment>
      }
      displayEmpty
      value={category}
      onChange={handleCategoryChange}
      className={styles.statusSelector}
      IconComponent={() => (
        <ExpandMoreIcon className={styles.statusSelectorIcon} />
      )}
      MenuProps={{ classes: { paper: styles.statusSelectorPopup } }}
      renderValue={(selected) =>
        mainCategories?.find((category) => `${category.id}` === `${selected}`)
          ?.name || 'Категорія'
      }
    >
      <MenuItem value="">Усі категорії</MenuItem>
      {mainCategories?.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectProductCategory
