import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FC, useState, useEffect } from 'react'
import { Checkbox } from '@mui/material'
import { cell, checkBox, input, table } from './style'
import { OutlinedInput } from '../UI/Field'
import { useDispatch } from 'react-redux'
import {
  clearProductData,
  setProductStatus,
  updateProductData
} from '../../redux/crm-product/editSlice/editPrice'
import { useLocation } from 'react-router-dom'
import { label } from '../../helpers/labelCheckbox'
import { PriceResponse } from '../../types'

type Props = {
  prices: PriceResponse[]
}

export const CrmViewProductTable: FC<Props> = ({ prices }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [checkedState, setCheckedState] = useState(
    prices.map((item) => item.is_active)
  )
  const [quantities, setQuantities] = useState(
    prices.map((item) => item.quantity)
  )

  const sortedPrices = [...prices].sort(
    (a, b) => (b.is_active ? 1 : 0) - (a.is_active ? 1 : 0)
  )

  const handleCheckboxChange = (index: number) => {
    const newCheckedState = [...checkedState]
    newCheckedState[index] = !newCheckedState[index]
    setCheckedState(newCheckedState)
    sendUpdatedInfo(index, newCheckedState[index], quantities[index])
  }

  const handleQuantityChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantities = [...quantities]
      newQuantities[index] = parseInt(event.target.value, 10) || 0
      setQuantities(newQuantities)
      sendUpdatedInfo(index, checkedState[index], newQuantities[index])
    }

  const sendUpdatedInfo = (
    index: number,
    isActive: boolean,
    quantity: number
  ) => {
    const updatedInfo = {
      id: prices[index].id,
      is_active: isActive,
      quantity: quantity,
      product_id: prices[index].product_id
    }
    dispatch(updateProductData(updatedInfo))
  }

  useEffect(() => {
    return () => {
      dispatch(clearProductData())
      dispatch(setProductStatus(''))
    }
  }, [location.pathname, dispatch])

  return (
    <TableContainer component={Paper} sx={{ mt: 5, boxShadow: 'none' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ ...table }}>
          <TableRow>
            {[
              'Активна',
              'Вага (г)*',
              'Наявність (шт)',
              'Ціна (грн)*',
              'Акція',
              'Ціна (акційна)'
            ].map((text, index) => (
              <TableCell key={index} sx={cell} align={'center'}>
                {text}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPrices.map((elem, index) => (
            <TableRow key={index} sx={{ ...table }}>
              <TableCell sx={cell} align="center">
                <Checkbox
                  name="checkbox"
                  sx={checkBox}
                  {...label}
                  checked={checkedState[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </TableCell>
              <TableCell sx={cell} align="center">
                {elem.weight}
              </TableCell>
              <TableCell sx={cell} align="center">
                <OutlinedInput
                  name="quantity"
                  sx={input}
                  value={quantities[index]}
                  onChange={handleQuantityChange(index)}
                />
              </TableCell>

              <TableCell sx={{ ...cell }} align="center">
                {elem.price}
              </TableCell>
              <TableCell sx={cell} align="center">
                <Checkbox sx={checkBox} disabled checked={elem.promotional} />
              </TableCell>
              <TableCell sx={cell} align="center">
                {elem.old_price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
