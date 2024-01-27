import WeightList from './WeightList'
import TableCheckbox from './TableCheckbox'
import WeightColumn from './WeightColumn'
import NumberInput from './NumberInput'
import CheckboxColumn from './CheckboxColumn'
import DeleteIcon from '../../icons/delete.svg?react'
import styles from './CrmAddNewProduct.module.scss'
import { ProductItem } from './CrmAddNewProductTable'
import { FC } from 'react'

type Props = {
  row: ProductItem
  index: number
  openRows: any
  hasError: (rowIndex: number, columnName: string) => string
  handleInputChange: (
    id: string,
    columnId: string,
    value: boolean | string | number
  ) => void
  toggleWeightList: (id: string) => void
  ARRAY_OPTION_WEIGHT: string[]
  handleWeightChange: (id: string, weight: string) => void
  handleDeleteRow: (id: string) => void
}

const TableRow: FC<Props> = ({
  row,
  index,
  openRows,
  hasError,
  handleInputChange,
  toggleWeightList,
  handleDeleteRow,
  handleWeightChange,
  ARRAY_OPTION_WEIGHT
}) => {
  return (
    <tr className={styles.tableContentRow}>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextActive}`}
      >
        <TableCheckbox
          id={row.id}
          checked={row.active}
          onChange={(value) => {
            handleInputChange(row.id, 'active', value)
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
        {openRows[row.id] && (
          <WeightList
            WeightList={ARRAY_OPTION_WEIGHT}
            currentWeight={row.weight}
            onWeightChange={(newWeight) => {
              handleWeightChange(row.id, newWeight)
            }}
          />
        )}
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextAvailability} ${hasError(index, 'availability') ? styles.errorBorder : ''}`}
      >
        <NumberInput
          value={row.availability}
          onChange={(value) => {
            handleInputChange(row.id, 'availability', value)
          }}
        />
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextPrice} ${hasError(index, 'price') ? styles.errorBorder : ''}`}
      >
        <NumberInput
          value={row.price}
          onChange={(value) => {
            handleInputChange(row.id, 'price', value)
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
            handleInputChange(row.id, 'sale', value)
          }}
        />
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextPriceSale} ${hasError(index, 'priceSale') ? styles.errorBorder : ''}`}
      >
        <NumberInput
          value={row.priceSale}
          onChange={(value) => {
            handleInputChange(row.id, 'priceSale', value)
          }}
        />
      </td>
      <td
        className={`${styles.tableColumnInput} ${styles.tableHeaderTextDellete}`}
      >
        <DeleteIcon
          className={styles.iconDel}
          onClick={() => {
            handleDeleteRow(row.id)
          }}
        />
      </td>
    </tr>
  )
}

export default TableRow
