import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { CrmCategoriesBlockView } from './CrmCategoriesBlockView'
import { Box } from '@mui/material'
import { Checkbox } from '../UI/Checkbox'
import { Typography } from '../UI/Typography'
import CrmCategoriesBlock from './CrmCategoriesBlock'
import {
  body1Label,
  boxCheckbox,
  checkBox
} from '../../components/Crm-add-new-product-table/style'
import styles from './CrmCategoriesBlock.module.scss'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setPopularData } from '../../redux/crm-product/editSlice/editPrice'
import { ProductResponse } from '../../types'

type Props = {
  parsedIndex: number
  product: ProductResponse | undefined
  isPopular: boolean
  setIsPopular: Dispatch<SetStateAction<boolean>>
}

export const CrmCategoriesToggle: FC<Props> = ({
  parsedIndex,
  product,
  isPopular,
  setIsPopular
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    const prod = product?.is_popular
    const isChecked = event.target.checked
    setIsPopular(isChecked)
    if (isChecked === prod) {
      dispatch(setPopularData(false))
    } else {
      dispatch(setPopularData(true))
    }
  }

  return (
    <div className={styles.categoriesOptionWrapp}>
      {!isNaN(parsedIndex) && product ? (
        <Box>
          <CrmCategoriesBlockView product={product} />
          <Box component="label" sx={boxCheckbox}>
            <Checkbox
              name="checkbox"
              checked={isPopular}
              onChange={handleChecked}
              sx={checkBox}
            />
            <Typography variant="body1" component="span" sx={body1Label}>
              Обрати, як популярний товар
            </Typography>
          </Box>
        </Box>
      ) : (
        <CrmCategoriesBlock product={product} />
      )}
    </div>
  )
}
