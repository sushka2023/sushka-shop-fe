import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink, scroller } from 'react-scroll'
import { fetchAllCategories } from '../../../../redux/products/operation'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../Header.module.scss'

const HeaderNav = () => {
  const location = useLocation()
  const homePath = location.pathname === '/'

  const allCategories = useSelector((state) => state.items.allCategories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllCategories({ operationType: 'fetchAllCategories' }))
  }, [dispatch])

  useEffect(() => {
    if (homePath) {
      scroller.scrollTo(location.hash.slice(1), {
        smooth: true,
        duration: 500
      })
    }
  }, [homePath, location])

  return (
    <nav className={styles.navWrapper}>
      <ul className={styles.listNav}>
        <li className={`${styles.listNavLine} ${styles.dropdown}`}>
          <Link
            to={`catalog/${allCategories && allCategories[0].id}/0`}
            className={styles.listNavLink}
          >
            Каталог
          </Link>
          <ul className={styles.dropdownList}>
            {allCategories &&
              allCategories.map((category) => {
                return (
                  <li className={styles.dropdownListLine} key={category.id}>
                    <Link to={`/catalog/${category.name}/0`}>
                      {category.name}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </li>
        <li className={styles.listNavLine}>
          <Link to={'/review'} className={styles.listNavLink}>
            Відгуки
          </Link>
        </li>
        <li className={styles.listNavLine}>
          {homePath ? (
            <ScrollLink
              to="aboutUs"
              className={styles.listNavLink}
              smooth={true}
              duration={500}
            >
              Про нас
            </ScrollLink>
          ) : (
            <Link to="/#aboutUs" className={styles.listNavLink}>
              Про нас
            </Link>
          )}
        </li>
        <li className={styles.listNavLine}>
          <Link to="cooperation" className={styles.listNavLink}>
            Співпраця
          </Link>
        </li>
        <li className={styles.listNavLine}>
          <Link className={`${styles.navLinkCrm} ${styles.linkCrm}`} to="crm">
            CRM
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNav
