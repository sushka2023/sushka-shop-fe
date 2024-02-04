import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import styles from '../Header.module.scss'
import DropdownList from './DropdownList'
import { CategoriesModel } from '../../../../types/models/CategtoriesModel'
import CrmLine from './CrmLink'

type Props = {
  allCategories: CategoriesModel[]
}

const HeaderNavList: FC<Props> = ({ allCategories }) => {
  const location = useLocation()
  const isHomePath = location.pathname === '/'

  return (
    <ul className={styles.listNav}>
      <li className={`${styles.listNavLine} ${styles.dropdown}`}>
        <Link
          to={`catalog/${allCategories && allCategories[0].id}`}
          className={styles.listNavLink}
        >
          Каталог
        </Link>
        <DropdownList allCategories={allCategories} />
      </li>
      <li className={styles.listNavLine}>
        <Link to="/review" className={styles.listNavLink}>
          Відгуки
        </Link>
      </li>
      <li className={styles.listNavLine}>
        {isHomePath ? (
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
      <CrmLine />
    </ul>
  )
}

export default HeaderNavList
