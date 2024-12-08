import styles from '../../Header.module.scss'

import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DropdownList from '../DropdownList'

import { fetchAllCategories } from '../../../../../redux/products/operation'
import { AppDispatch, RootState } from '../../../../../redux/store'

export const CatalogLink = () => {
  const dispatch = useDispatch<AppDispatch>()

  const allCategories = useSelector(
    (state: RootState) => state.items.allCategories
  )

  useEffect(() => {
    if (!allCategories) {
      dispatch(fetchAllCategories({ operationType: 'fetchAllCategories' }))
    }
  }, [])

  if (!allCategories) return null

  return (
    <Fragment>
      <Link
        to={`${allCategories?.length ? `catalog/${allCategories[0].id}` : '#'}`}
        className={styles.listNavLink}
      >
        Каталог
      </Link>
      <DropdownList allCategories={allCategories} />
    </Fragment>
  )
}
