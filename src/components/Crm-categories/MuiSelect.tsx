import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addData } from '../../redux/crm-add-new-product/slice/product'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { AppDispatch } from '../../redux/store'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './crmCategories.module.scss'
import { selectStyle } from './style'

type Props = {
  mainCategories: any[]
}

const MuiSelect: React.FC<Props> = ({ mainCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    mainCategories && mainCategories[0].id
  )
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value)
    dispatch(addData({ type: 'main_category', value: e.target.value }))
  }

  return (
    <Select
      sx={selectStyle}
      onChange={handleChange}
      displayEmpty
      value={selectedCategory}
      MenuProps={{ classes: { paper: styles.statusSelectorPopup } }}
      IconComponent={() => <ArowIcon className={styles.iconArrow} />}
    >
      {mainCategories.map((category) => (
        <MenuItem key={category.name} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export default MuiSelect
