import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import { scroller } from 'react-scroll'
import { AppDispatch, RootState } from '../../../../redux/store/index'
import { fetchAllCategories } from '../../../../redux/products/operation'
import styles from '../Header.module.scss'
import HeaderNavList from './HeaderNavList'

const HeaderNav = ({ closeVisible }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  const allCategories = useSelector(
    (state: RootState) => state.items.allCategories
  )
  // const location = useLocation()
  // const isHomePath = location.pathname === '/'

  // useEffect(() => {
  //   if (isHomePath) {
  //     scroller.scrollTo(location.hash.slice(1), {
  //       smooth: true,
  //       duration: 500
  //     })
  //   }
  //   console.log('isHomePath')
  // }, [isHomePath, location])

  useEffect(() => {
    if (!allCategories) {
      dispatch(fetchAllCategories({ operationType: 'fetchAllCategories' }))
    }
  }, [])

  return (
    <nav className={styles.navWrapper}>
      <HeaderNavList
        allCategories={allCategories}
        closeVisible={closeVisible}
      />
    </nav>
  )
}

export default HeaderNav
