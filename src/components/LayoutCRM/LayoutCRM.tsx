import { useSelector } from 'react-redux'
import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderCRM from './header/HeaderCRM'
import AsideCRM from './aside/AsideCRM'
import styles from './LayoutCRM.module.scss'
import { useDispatch } from 'react-redux'
import { Report } from 'notiflix/build/notiflix-report-aio'
import { AppDispatch, RootState } from '../../redux/store'
import { addData } from '../../redux/crm-product/createSlice/product'

const LayoutCRM = () => {
  const isLoading = useSelector(
    (state: RootState) => state.newProduct.isLoading
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (isLoading === 0) {
      Report.success('Товар успішно створено', '', 'Добре')
      dispatch(addData({ type: 'isLoading', value: null }))
    }
  }, [isLoading])

  return (
    <div className={styles.containerCrm}>
      <div className={styles.asideCrm}>
        <AsideCRM />
      </div>
      <div className={styles.containerHeader}>
        <HeaderCRM />
        <div className={styles.containerContent}>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default LayoutCRM
