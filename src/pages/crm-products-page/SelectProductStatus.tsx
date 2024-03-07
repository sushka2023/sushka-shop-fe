import {
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import SortIcon from '../../icons/sort.svg?react'
import styles from './crmProductsPage.module.scss'
import ExpandMoreIcon from '../../icons/ExpandMoreIcon.svg?react'
import { OPTIONS } from './CrmProductsPage'

type SelectProductStatusProps = {
  status: string
  handleStatusChange: (event: SelectChangeEvent) => void
}
const SelectProductStatus = ({
  status,
  handleStatusChange
}: SelectProductStatusProps) => {
  return (
    <Select
      startAdornment={
        <InputAdornment position="start">
          <SortIcon />
        </InputAdornment>
      }
      displayEmpty
      value={status}
      onChange={handleStatusChange}
      className={styles.statusSelector}
      IconComponent={() => (
        <ExpandMoreIcon className={styles.statusSelectorIcon} />
      )}
      MenuProps={{ classes: { paper: styles.statusSelectorPopup } }}
      renderValue={(selected) =>
        OPTIONS.find((option) => option.value === selected)?.label
      }
    >
      <MenuItem value="">Усі статуси</MenuItem>
      <MenuItem value="new">Новий</MenuItem>
      <MenuItem value="activated">Активний</MenuItem>
      <MenuItem value="archived">Архівований</MenuItem>
    </Select>
  )
}

export default SelectProductStatus
