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
  }, [selectedCategory, dispatch, type])

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedCategory(Number(e.target.value))
  }

  const renderInputAdornment = () => {
    if (!handleClickRemoveSubCategory) return null

    return (
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

  const renderMenuItems = () => {
    if (!сategories?.length) {
      return <MenuItem value="">Немає категорій</MenuItem>
    }

    return сategories.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    ))
  }

  const getLabelText = () => {
    if (type === 'sub_categories') {
      return categoryValue || product ? 'Саб-категорія товару' : ''
    }
    return 'Категорія товару'
  }

  return (
    <FormControl>
      <InputLabel sx={labelStyle} variant="standard">
        {getLabelText()}
      </InputLabel>

      <Select
        sx={selectStyle}
        onChange={handleChange}
        displayEmpty
        value={String(selectedCategory)}
        MenuProps={{ classes: { paper: styles.statusSelectorPopup } }}
        IconComponent={() => <ArowIcon className={styles.iconArrow} />}
        startAdornment={renderInputAdornment()}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  )
}

export default MuiSelect
