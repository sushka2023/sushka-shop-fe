import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addData } from '../../redux/crm-add-new-product/slice/product'
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  InputAdornment
} from '@mui/material'
import { AppDispatch } from '../../redux/store'
import ArowIcon from '../../icons/arrow.svg?react'
import DeleteIcon from '../../icons/delete.svg?react'
import styles from './crmCategories.module.scss'
import { labelStyle, selectStyle } from './style'
import { ProductCategoryModel } from '../../types'

type Props = {
  сategories: ProductCategoryModel[] | null
  type: 'main_category' | 'sub_categories'
  categoryValue?: number
  handleClickRemoveSubCategory?: (
    categoryValue: number,
    selectedCategory: number
  ) => void
}

const MuiSelect: React.FC<Props> = ({
  categoryValue,
  сategories,
  type,
  handleClickRemoveSubCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    сategories && сategories[0].id
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(addData({ type, value: selectedCategory }))
  }, [selectedCategory])

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedCategory(Number(e.target.value))
  }

  return (
    <FormControl>
      <InputLabel sx={labelStyle} variant="standard">
        {type === 'sub_categories'
          ? categoryValue === 1 && 'Саб-категорія товару'
          : 'Категорія товару'}
      </InputLabel>
      <Select
        sx={selectStyle}
        onChange={handleChange}
        displayEmpty
        value={String(selectedCategory)}
        MenuProps={{ classes: { paper: styles.statusSelectorPopup } }}
        IconComponent={() => <ArowIcon className={styles.iconArrow} />}
        startAdornment={
          type === 'sub_categories' && (
            <InputAdornment
              position="start"
              onClick={() =>
                handleClickRemoveSubCategory &&
                handleClickRemoveSubCategory(categoryValue!, selectedCategory!)
              }
            >
              <DeleteIcon className={styles.iconDel} />
            </InputAdornment>
          )
        }
      >
        {сategories?.map((category) => (
          <MenuItem key={category.name} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MuiSelect
