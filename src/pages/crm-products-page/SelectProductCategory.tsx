import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import SortIcon from '../../icons/sort.svg?react'
import styles from './crmProductsPage.module.scss'
import ExpandMoreIcon from '../../icons/ExpandMoreIcon.svg?react'
import { ProductCategoryResponse } from '../../types'
import { Fragment } from 'react/jsx-runtime'
import { StyledSelector } from './CrmCustomPaginationStyles'

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
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    handleCategoryChange(event as SelectChangeEvent<string>)
  }

  return (
    <Select
      value={category}
      onChange={handleChange}
      displayEmpty
      sx={StyledSelector}
      className={styles.statusSelector}
      IconComponent={ExpandMoreIcon}
      renderValue={(selected) => (
        <Fragment>
          <SortIcon style={{ marginRight: '8px' }} />
          {mainCategories?.find(
            (category) => `${category.id}` === `${selected}`
          )?.name || 'Категорія'}
        </Fragment>
      )}
      MenuProps={{ classes: { paper: styles.statusSelectorPopup } }}
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
