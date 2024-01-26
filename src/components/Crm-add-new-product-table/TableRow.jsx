import WeightList from './WeightList'
import TableCheckbox from './TableCheckbox'
import WeightColumn from './WeightColumn'
import NumberInput from './NumberInput'
import CheckboxColumn from './CheckboxColumn'
import DeleteIcon from '../../icons/delete.svg?react'
import styles from './CrmAddNewProduct.module.scss'

const TableRow = ({
  row,
  index,
  openRows,
  hasError,
  handleInputChange,
  toggleWeightList,
  handleDeleteRow,
  handleWeightChange,
  handleCloseWeightList,
  ARRAY_OPTION_WEIGHT
}) => {
  const weightListProps = {
    WeightList: ARRAY_OPTION_WEIGHT,
    currentWeight: row.weight,
    onWeightChange: (newWeight) => {
      return handleWeightChange(row.id, newWeight)
    },
    onClose: handleCloseWeightList
  }

  return (
    <tr className={styles.tableContentRow}>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextActive}`}
      >
        <TableCheckbox
          id={row.id}
          checked={row.active}
          onChange={(value) => {
            return handleInputChange(row.id, 'active', value)
          }}
        />
      </td>
      <td
        className={`${styles.weightColumnWrapp} ${styles.tableColumnInput} ${styles.tableHeaderTextWeight}`}
      >
        <WeightColumn
          id={row.id}
          weight={row.weight}
          openRows={openRows}
          toggleWeightList={toggleWeightList}
        />
        {openRows[row.id] && <WeightList {...weightListProps} />}
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextAvailability} ${hasError(index, 'availability') ? styles.errorBorder : ''}`}
      >
        <NumberInput
          value={row.availability}
          onChange={(value) => {
            return handleInputChange(row.id, 'availability', value)
          }}
        />
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextPrice} ${hasError(index, 'price') ? styles.errorBorder : ''}`}
      >
        <NumberInput
          value={row.price}
          onChange={(value) => {
            return handleInputChange(row.id, 'price', value)
          }}
        />
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextSale}`}
      >
        <CheckboxColumn
          id={row.id}
          checked={row.sale}
          onChange={(value) => {
            return handleInputChange(row.id, 'sale', value)
          }}
        />
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextPriceSale} ${hasError(index, 'priceSale') ? styles.errorBorder : ''}`}
      >
        <NumberInput
          value={row.priceSale}
          onChange={(value) => {
            return handleInputChange(row.id, 'priceSale', value)
          }}
        />
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextDellete}`}
      >
        <DeleteIcon
          className={styles.iconDel}
          onClick={() => {
            return handleDeleteRow(row.id)
          }}
        />
      </td>
    </tr>
  )
}

export default TableRow
