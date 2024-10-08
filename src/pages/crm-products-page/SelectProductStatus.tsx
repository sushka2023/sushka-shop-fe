import { FC, Fragment } from 'react'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import SortIcon from '../../icons/sort.svg?react'
import ExpandMoreIcon from '../../icons/ExpandMoreIcon.svg?react'
import styles from './crmProductsPage.module.scss'
import { OPTIONS } from './CrmProductsPage'
import { StyledSelector } from './CrmCustomPaginationStyles'

type SelectProductStatusProps = {
  status: string
  handleStatusChange: (event: SelectChangeEvent<string>) => void
}

const SelectProductStatus: FC<SelectProductStatusProps> = ({
  status,
  handleStatusChange
}) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    handleStatusChange(event as SelectChangeEvent<string>)
  }

  return (
    <Select
      value={status}
      onChange={handleChange}
      displayEmpty
      IconComponent={ExpandMoreIcon}
      sx={StyledSelector}
      renderValue={(selected) => (
        <Fragment>
          <SortIcon style={{ marginRight: '8px' }} />
          {OPTIONS.find((option) => option.value === selected)?.label ||
            'Усі статуси'}
        </Fragment>
      )}
      MenuProps={{ classes: { paper: styles.statusSelectorPopup } }}
    >
      <MenuItem value="">Усі статуси</MenuItem>
      <MenuItem value="new">Новий</MenuItem>
      <MenuItem value="activated">Активний</MenuItem>
      <MenuItem value="archived">Архівований</MenuItem>
    </Select>
  )
}

export default SelectProductStatus
