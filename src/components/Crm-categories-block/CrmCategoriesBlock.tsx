import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlusIcon from '../../icons/plus1.svg?react'
import styles from './CrmCategoriesBlock.module.scss'
import { AppDispatch, RootState } from '../../redux/store'
import {
  fetchMainCategories,
  fetchSubCategories
} from '../../redux/crm-add-new-product/operation'
import MuiSelect from '../Crm-categories/MuiSelect'
import { addData } from '../../redux/crm-add-new-product/slice/product'

const CrmCategoriesBlock = () => {
  const [subCategoriesList, setSubCategoriesList] = useState([1])

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

  const handleClickNewSubCategory = () => {
    setSubCategoriesList([...subCategoriesList, subCategoriesList.length + 1])
  }

  const handleClickRemoveSubCategory = (
    categoryValue: number,
    selectedCategory: number
  ) => {
    setSubCategoriesList(
      subCategoriesList.filter((category) => category !== categoryValue)
    )
    dispatch(addData({ type: 'remove', value: selectedCategory }))
  }

  return (
    <div className={styles.categoriesOptionWrapp}>
      <MuiSelect сategories={mainCategories} type="main_category" />
      <div className={styles.subCategoriesWrapp}>
        {subCategoriesList.map((categoryValue) => (
          <MuiSelect
            key={categoryValue}
            сategories={subCategories}
            type="sub_categories"
            categoryValue={categoryValue}
            handleClickRemoveSubCategory={handleClickRemoveSubCategory}
          />
        ))}
        <div className={`${styles.iconWrapp}`}>
          <PlusIcon
            className={`${styles.iconPlus}`}
            onClick={handleClickNewSubCategory}
          />
        </div>
      </div>
    </div>
  )
}

export default CrmCategoriesBlock
