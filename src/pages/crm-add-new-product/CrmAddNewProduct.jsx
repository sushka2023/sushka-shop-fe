import { useState, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { newProductSchema } from '../../Halpers/validateNewProduct'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectProductId,
  selectFormErrors
} from '../../Redax/Crm-add-new-product/selectors/Selectors'
import {
  addData,
  setFormErrors
} from '../../Redax/Crm-add-new-product/slices/product-slice'
import CrmCategoriesBlock from '../../components/Crm-categories-block/CrmCategoriesBlock'
import CrmAddNewProductTable from '../../components/Crm-add-new-product-table/CrmAddNewProductTable'
import CrmAddNewProductButton from '../../components/Crm-add-new-product-button/CrmAddNewProductButton'
import StatusDropdown from './StatusDropdown'
import DescriptionProduct from './DescriptionProduct'
import styles from './crmAddNewProduct.module.scss'

const CrmAddNewProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('Новий')
  const containerRef = useRef(null)
  const nameInputRef = useRef(null)
  const descriptionRef = useRef(null)
  const dispatch = useDispatch()
  const productId = useSelector(selectProductId)
  const formErrors = useSelector(selectFormErrors)

  const validateField = async (name, value) => {
    try {
      await yup.reach(newProductSchema, name).validate(value)
      dispatch(setFormErrors({ ...formErrors, [name]: '' }))
    } catch (error) {
      dispatch(setFormErrors({ ...formErrors, [name]: error.message }))
    }
  }

  const handleChangeStatus = (type, newStatusValue, newStatusName) => {
    setCurrentStatus(newStatusName)
    dispatch(addData({ type, value: newStatusValue }))
  }

  const handleChangeFormData = (e) => {
    const { value, name } = e.target
    validateField(name, value)
    dispatch(addData({ type: name, value }))
  }

  const applyDropDown = (e) => {
    if (e.target.nodeName === 'BUTTON') {
      return
    }
    e.stopPropagation()
  }

  const handleDocumentClick = (e) => {
    setIsOpen((prevIsOpen) => {
      const shouldCloseDropdown =
        containerRef.current && !containerRef.current.contains(e.target)
      return shouldCloseDropdown ? false : !prevIsOpen
    })
  }

  useEffect(() => {
    if (productId) {
      if (nameInputRef.current) nameInputRef.current.value = ''
      if (descriptionRef.current) descriptionRef.current.value = ''
    }
  }, [productId])

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const statusClasses = {
    Новий: styles.statusNew,
    Активний: styles.statusActive,
    Архівований: styles.statusArchive
  }

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.formWrapp}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              <span
                className={`${styles.status} ${statusClasses[currentStatus]}`}
              >
                {currentStatus}
              </span>
            </div>
            <div className={styles.editSaveBtnsBlock}>
              <StatusDropdown
                isOpen={isOpen}
                containerRef={containerRef}
                applyDropDown={applyDropDown}
                handleChangeFormData={handleChangeFormData}
                handleChangeStatus={handleChangeStatus}
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
              />
              <CrmAddNewProductButton />
            </div>
          </div>
          <DescriptionProduct
            formErrors={formErrors}
            nameInputRef={nameInputRef}
            descriptionRef={descriptionRef}
            handleChangeFormData={handleChangeFormData}
          />
          <div className={styles.categoriesOptionWrapp}>
            <CrmCategoriesBlock />
          </div>
        </div>
        <CrmAddNewProductTable />
      </form>
    </section>
  )
}

export default CrmAddNewProduct
