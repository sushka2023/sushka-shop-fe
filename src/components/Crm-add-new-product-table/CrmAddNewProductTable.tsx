import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import PlusIcon from '../../icons/plus1.svg?react'
import styles from './CrmAddNewProduct.module.scss'
import { AppDispatch, RootState } from '../../redux/store'
import { addData } from '../../redux/crm-product/createSlice/product'
import { Price } from '../../redux/crm-product/operation'
import TableRow from './TableRow'

const ARRAY_OPTION_WEIGHT = [
  '50',
  '100',
  '150',
  '200',
  '300',
  '400',
  '500',
  '1000'
]

const DEFAULT_DATA = {
  id: uuidv4(),
  active: false,
  weight: ARRAY_OPTION_WEIGHT[0],
  availability: null,
  price: null,
  sale: false,
  priceSale: null
}

export type ProductItem = {
  id: string
} & Price

const CrmAddNewProductTable = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({})
  const [data, setData] = useState<ProductItem[]>([DEFAULT_DATA])
  const dispatch = useDispatch<AppDispatch>()
  const productId = useSelector(
    (state: RootState) => state.newProduct.productId
  )
  const validationErrors = useSelector(
    (state: RootState) => state.newProduct.formErrors
  )

  const hasError = (rowIndex: number, columnName: string): string => {
    const errorKey = `[${rowIndex}].${columnName}`
    return validationErrors[errorKey] || ''
  }

  const handleInputChange = (
    id: string,
    columnId: string,
    value: string | boolean
  ) => {
    setData((currentData) =>
      currentData.map((row) =>
        row.id === id ? { ...row, [columnId]: value } : row
      )
    )
  }

  useEffect(() => {
    setData([DEFAULT_DATA])
  }, [productId])

  useEffect(() => {
    dispatch(addData({ type: 'price', value: data }))
  }, [data, dispatch])

  const addNewRow = () => {
    setData((currentData) => [...currentData, DEFAULT_DATA])
  }

  const toggleWeightList = (id: string) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id]
    }))
  }

  const handleDeleteRow = (id: string) => {
    if (data.length > 1) {
      setData((currentData) => currentData.filter((row) => row.id !== id))
    }
  }

  const handleWeightChange = (id: string, newWeight: string) => {
    setData((currentData) =>
      currentData.map((row) =>
        row.id === id ? { ...row, weight: newWeight } : row
      )
    )
  }

  return (
    <table className={`${styles.tableWrapp} ${styles.formWrapp}`}>
      <thead className={styles.tableHeader}>
        <tr className={styles.tableHeaderRow}>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextActive}`}
          >
            Активна
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextWeight}`}
          >
            Вага (г)*
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextAvailability}`}
          >
            Наявність (шт)
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextPrice}`}
          >
            Ціна (грн)*
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextSale}`}
          >
            Акція
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextPriceSale}`}
          >
            Ціна (акційна)
          </th>
          <th
            className={`${styles.tableHeaderText} ${styles.tableHeaderTextDellete}`}
          ></th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data.map((row, index) => (
          <TableRow
            key={row.id}
            row={row}
            index={index}
            openRows={openRows}
            ARRAY_OPTION_WEIGHT={ARRAY_OPTION_WEIGHT}
            hasError={hasError}
            handleInputChange={handleInputChange}
            toggleWeightList={toggleWeightList}
            handleDeleteRow={handleDeleteRow}
            handleWeightChange={handleWeightChange}
          />
        ))}
        <tr>
          <td colSpan={6} className={styles.containerPlus}>
            <div
              className={`${styles.iconWrapp} ${
                ARRAY_OPTION_WEIGHT.length === data.length
                  ? styles.iconWrappDisabled
                  : ''
              }`}
            >
              <PlusIcon
                className={`${styles.iconPlus} ${
                  ARRAY_OPTION_WEIGHT.length === data.length
                    ? styles.iconPlusDisabled
                    : ''
                }`}
                onClick={addNewRow}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CrmAddNewProductTable
