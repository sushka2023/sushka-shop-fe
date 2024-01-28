import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import PlusIcon from '../../icons/plus1.svg?react'
import styles from './CrmAddNewProduct.module.scss'
import { AppDispatch } from '../../redux/store'
import { ProductState } from '../../redux/crm-add-new-product/slice/product'
import { addData } from '../../redux/crm-add-new-product/slice/product'
import { Price } from '../../redux/crm-add-new-product/operation'
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

export type ProductItem = {
  id: string
} & Price

const CrmAddNewProductTable = () => {
  const [openRows, setOpenRows] = useState<
    Record<string, string | number | boolean>
  >({})
  const [data, setData] = useState<ProductItem[]>([
    {
      id: uuidv4(),
      active: false,
      weight: ARRAY_OPTION_WEIGHT[0],
      availability: 0,
      price: 0,
      sale: false,
      priceSale: 0
    }
  ])
  const dispatch = useDispatch<AppDispatch>()
  const productId = useSelector(
    (state: ProductState) => state.newProduct.productId
  )
  const validationErrors = useSelector(
    (state: ProductState) => state.newProduct.formErrors
  )

  const hasError = (rowIndex: number, columnName: string) => {
    const errorKey = `[${rowIndex}].${columnName}`
    return validationErrors && validationErrors[errorKey]
  }

  const handleInputChange = (
    id: string,
    columnId: string,
    value: string | number | boolean
  ) => {
    let formattedValue = value

    if (
      columnId === 'price' ||
      columnId === 'priceSale' ||
      columnId === 'availability'
    ) {
      formattedValue = value === '' ? '' : parseFloat(value as string)
    }

    setData((currentData) => {
      return currentData.map((row) => {
        return row.id === id ? { ...row, [columnId]: formattedValue } : row
      })
    })
  }

  useEffect(() => {
    setData([
      {
        id: uuidv4(),
        active: false,
        weight: ARRAY_OPTION_WEIGHT[0],
        availability: 0,
        price: 0,
        sale: false,
        priceSale: 0
      }
    ])
  }, [productId])

  useEffect(() => {
    dispatch(addData({ type: 'price', value: data }))
  }, [data, dispatch])

  const addNewRow = () => {
    const newRow = {
      id: uuidv4(),
      active: false,
      weight: ARRAY_OPTION_WEIGHT[0],
      availability: 0,
      price: 0,
      sale: false,
      priceSale: 0
    }
    setData((currentData) => {
      return [...currentData, newRow]
    })
  }

  const toggleWeightList = (id: string) => {
    setOpenRows((prevOpenRows) => {
      return {
        ...prevOpenRows,
        [id]: !prevOpenRows[id]
      }
    })
  }

  const handleDeleteRow = (id: string) => {
    return (
      data.length > 1 &&
      setData(
        data.filter((row) => {
          return row.id !== id
        })
      )
    )
  }

  const handleWeightChange = (id: string, newWeight: string) => {
    setData((currentData) => {
      return currentData.map((row) => {
        return row.id === id ? { ...row, weight: newWeight } : row
      })
    })
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
            Наявність (шт)*
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
        {data.map((row, index) => {
          return (
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
          )
        })}
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
