/* eslint-disable */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addData } from '../../redux/crm-product/createSlice/product'
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
  product?: any
}

const MuiSelect: React.FC<Props> = ({
  categoryValue,
  сategories,
  type,
  handleClickRemoveSubCategory,
  product
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | ''>(
    categoryValue || (сategories?.[0]?.id ?? '')
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (selectedCategory !== '') {
      dispatch(addData({ type, value: selectedCategory }))
    }
  }, [selectedCategory])

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedCategory(Number(e.target.value))
  }

  return (
    <FormControl>
      <InputLabel sx={labelStyle} variant="standard">
        {type === 'sub_categories'
          ? (categoryValue || product) && 'Саб-категорія товару'
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
          handleClickRemoveSubCategory && (
            <InputAdornment
              position="start"
              onClick={() =>
                handleClickRemoveSubCategory(
                  categoryValue!,
                  selectedCategory as number
                )
              }
            >
              <DeleteIcon className={styles.iconDel} />
            </InputAdornment>
          )
        }
      >
        {сategories?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        )) || <MenuItem value="">Немає категорій</MenuItem>}
      </Select>
    </FormControl>
  )
}

export default MuiSelect
/* eslint-enable */
