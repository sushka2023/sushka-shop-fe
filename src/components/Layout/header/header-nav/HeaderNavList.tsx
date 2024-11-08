import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import styles from '../Header.module.scss'
import DropdownList from './DropdownList'
import CrmLink from './CrmLink'
import { Fragment, useEffect } from 'react'
import { fetchAllCategories } from '../../../../redux/products/operation'
import { AppDispatch, RootState } from '../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'

// type Props = {
//   allCategories: any[]
//   toggleOpen: any
// }
// //
// const HeaderNavList: FC<Props> = ({ allCategories, toggleOpen }) => {
//   console.log('allCategories:', allCategories)
//   console.log('nav list')

//   const location = useLocation()
//   const isHomePath = location.pathname === '/'

//   if (!allCategories) return null @

//   return (
//     // <ul className={styles.listNav}>
//     <Fragment>
//       <li className={`${styles.listNavLine} ${styles.dropdown}`}>
//         <Link
//           to={`${allCategories.length ? `catalog/${allCategories[0]?.id}` : '#'}`}
//           className={styles.listNavLink}
//         >
//           Каталог
//         </Link>
//         <DropdownList allCategories={allCategories} />
//       </li>
//       <li className={styles.listNavLine}>
//         <Link to="/review" className={styles.listNavLink}>
//           Відгуки
//         </Link>
//       </li>
//       <li className={styles.listNavLine}>
//         {isHomePath ? (
//           <ScrollLink
//             to="aboutUs"
//             className={styles.listNavLink}
//             smooth={true}
//             duration={500}
//             spy={true}
//             hashSpy={true}
//             onClick={() => toggleOpen()}
//           >
//             Про нас
//           </ScrollLink>
//         ) : (
//           <Link to="/#aboutUs" className={styles.listNavLink}>
//             Про нас
//           </Link>
//         )}
//       </li>
//       <li className={styles.listNavLine}>
//         <Link to="cooperation" className={styles.listNavLink}>
//           Співпраця
//         </Link>
//       </li>
//       <CrmLine />
//     </Fragment>
//     // </ul>
//   )
// }

// export default HeaderNavList

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

export const ReviewLink = () => (
  <Link to="/review" className={styles.listNavLink}>
    Відгуки
  </Link>
)

interface AboutUsLinkProps {
  toggleOpen: () => void
}

export const AboutUsLink = ({ toggleOpen }: AboutUsLinkProps) => {
  const location = useLocation()
  const isHomePath = location.pathname === '/'

  return (
    <Fragment>
      {isHomePath ? (
        <ScrollLink
          to="aboutUs"
          className={styles.listNavLink}
          smooth={true}
          duration={500}
          spy={true}
          hashSpy={true}
          onClick={toggleOpen}
        >
          Про нас
        </ScrollLink>
      ) : (
        <Link to="/#aboutUs" className={styles.listNavLink}>
          Про нас
        </Link>
      )}
    </Fragment>
  )
}

export const CooperationLink = () => (
  <Link to="/cooperation" className={styles.listNavLink}>
    Співпраця
  </Link>
)

type HeaderNavListProps = {
  // allCategories: { id: string; name: string }[]
  toggleOpen: () => void
}

const HeaderNavList = ({ toggleOpen }: HeaderNavListProps) => {
  return (
    <ul className={styles.listNav}>
      <li className={`${styles.listNavLine} ${styles.dropdown}`}>
        <CatalogLink />
      </li>
      <li className={styles.listNavLine}>
        <ReviewLink />
      </li>
      <li className={styles.listNavLine}>
        <AboutUsLink toggleOpen={toggleOpen} />
      </li>
      <li className={styles.listNavLine}>
        <CooperationLink />
      </li>
      <li className={styles.listNavLine}>
        <CrmLink />
      </li>
    </ul>
  )
}

export default HeaderNavList
