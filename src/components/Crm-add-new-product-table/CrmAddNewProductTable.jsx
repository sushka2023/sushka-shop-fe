import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectProductId,
  selectFormErrors
} from '../../Redax/Crm-add-new-product/selectors/Selectors'
import { addData } from '../../Redax/Crm-add-new-product/slices/product-slice'
import { v4 as uuidv4 } from 'uuid'
import PlusIcon from '../../icons/plus1.svg?react'
import TableRow from './TableRow'
import styles from './CrmAddNewProduct.module.scss'

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

const CrmAddNewProductTable = () => {
  const [isOpen] = useState(null)
  const [openRows, setOpenRows] = useState({})
  const [currentWeight] = useState(ARRAY_OPTION_WEIGHT[0])
  const [data, setData] = useState([
    {
      id: uuidv4(),
      active: false,
      weight: ARRAY_OPTION_WEIGHT[0],
      availability: '',
      price: '',
      sale: false,
      priceSale: ''
    }
  ])
  const dispatch = useDispatch()
  const productId = useSelector(selectProductId)
  const validationErrors = useSelector(selectFormErrors)

  const hasError = (rowIndex, columnName) => {
    const errorKey = `[${rowIndex}].${columnName}`
    return validationErrors && validationErrors[errorKey]
  }

  const handleInputChange = (id, columnId, value) => {
    let formattedValue = value

    if (
      columnId === 'price' ||
      columnId === 'priceSale' ||
      columnId === 'availability'
    ) {
      formattedValue = value === '' ? '' : parseFloat(value)
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
        availability: null,
        price: null,
        sale: false,
        priceSale: null
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
      availability: null,
      price: null,
      sale: false,
      priceSale: null
    }
    setData((currentData) => {
      return [...currentData, newRow]
    })
  }

  useEffect(() => {
    if (isOpen) {
      setData(
        data.map((row) => {
          return row.id === isOpen.id ? { ...row, weight: currentWeight } : row
        })
      )
    }
  }, [currentWeight, data, isOpen])

  const toggleWeightList = (id) => {
    setOpenRows((prevOpenRows) => {
      return {
        ...prevOpenRows,
        [id]: !prevOpenRows[id]
      }
    })
  }

  const handleDeleteRow = (id) => {
    return (
      data.length > 1 &&
      setData(
        data.filter((row) => {
          return row.id !== id
        })
      )
    )
  }

  const handleWeightChange = (id, newWeight) => {
    setData((currentData) => {
      return currentData.map((row) => {
        return row.id === id ? { ...row, weight: newWeight } : row
      })
    })
  }

  const handleCloseWeightList = () => {
    return setOpenRows({})
  }

  return (
    <table className={`${styles.tableWrapp} ${styles.formWrapp}`} name="price">
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
              handleCloseWeightList={handleCloseWeightList}
            />
          )
        })}
        <tr>
          <td colSpan="6" className={styles.containerPlus}>
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
