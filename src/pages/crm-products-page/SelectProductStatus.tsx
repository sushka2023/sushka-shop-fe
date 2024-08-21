import { FC, Fragment } from 'react'
import { InputBase, MenuItem, SelectChangeEvent } from '@mui/material'
import SortIcon from '../../icons/sort.svg?react'
import ExpandMoreIcon from '../../icons/ExpandMoreIcon.svg?react'
import styles from './crmProductsPage.module.scss'
import { OPTIONS } from './CrmProductsPage'
import { CustomSelect } from './CrmCustomPaginationStyles'

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
    <CustomSelect
      value={status}
      onChange={handleChange}
      displayEmpty
      input={<InputBase />}
      className={styles.statusSelector}
      IconComponent={ExpandMoreIcon}
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
    </CustomSelect>
  )
}

export default SelectProductStatus
