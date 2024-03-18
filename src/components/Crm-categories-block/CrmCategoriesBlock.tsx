import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CrmCategories from '../Crm-categories/CrmCategories'
import styles from './CrmCategoriesBlock.module.scss'
import { AppDispatch, RootState } from '../../redux/store'
import {
  fetchMainCategories,
  fetchSubCategories
} from '../../redux/crm-add-new-product/operation'
import MuiSelect from '../Crm-categories/MuiSelect'

const CrmCategoriesBlock = () => {
  const mainCategories = useSelector(
    (state: RootState) => state.allCategories.mainCategories
  )
  const subCategories = useSelector(
    (state: RootState) => state.allCategories.subCategories
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchMainCategories({ operationType: 'fetch-main-categories' }))
    dispatch(fetchSubCategories({ operationType: 'fetch-sub-categories' }))
  }, [])

  return (
    <div className={styles.categoriesOptionWrapp}>
      <MuiSelect mainCategories={mainCategories} />
      {/* <CrmCategories categories={mainCategories} type="main_category" /> */}
      <CrmCategories categories={subCategories} type="sub_categories" />
    </div>
  )
}

export default CrmCategoriesBlock
