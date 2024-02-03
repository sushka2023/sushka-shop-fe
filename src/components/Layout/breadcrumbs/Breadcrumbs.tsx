/* eslint-disable complexity */
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import IconArrow from '../../../icons/arrow.svg?react'
import styles from './breadcrumbs.module.scss'
import { RootState } from '../../../redux/store'

const ukrainianNames = {
  catalog: 'Каталог',
  review: 'Відгуки',
  favorite: 'Улюблене',
  cart: 'Кошик',
  cooperation: 'Співпраця',
  conditions: 'Умови та Положення',
  policy: 'Політика конфіденційності',
  account: 'Особистий кабінет'
}

const getUkrainianName = (name: string) => {
  return ukrainianNames[name as keyof typeof ukrainianNames] || name
}

const Breadcrumbs = () => {
  const location = useLocation()

  const allCategories = useSelector(
    (state: RootState) => state.items.allCategories
  )
  const allProducts = useSelector((state: RootState) => state.items.items)

  const getCategoryName = (id: string) => {
    if (allCategories) {
      const category = allCategories.find((category) => {
        return category.id === parseInt(id, 10)
      })
      return category ? category.name : id
    }
  }
  const getProductName = (id: string) => {
    if (allProducts?.length) {
      const product = allProducts.find((product) => {
        return product.id === parseInt(id, 10)
      })
      return product ? product.name : id
    }
  }

  const replaceIdsWithNames = (pathArray: string[]) => {
    return pathArray.map((segment, index) => {
      if (index === 2 && !isNaN(+segment)) {
        return getCategoryName(segment)
      } else if (index === 3 && !isNaN(+segment)) {
        return getProductName(segment)
      }
      return segment
    })
  }

  const pathnames = () => {
    const pathArray = location.pathname.split('/')
    const updatedPathArray = replaceIdsWithNames(pathArray)

    return updatedPathArray.filter((segment, index) => {
      if (updatedPathArray[updatedPathArray.length - 1] === 'details') {
        return segment !== '' && segment !== 'details'
      }
      return (
        segment && getUkrainianName(segment) && segment !== '' && index <= 1
      )
    })
  }

  return (
    <div className={styles.breadBlock}>
      <ul className={styles.breadList}>
        <li className={styles.breadLine}>
          <Link className={styles.breadLink} to={'/'}>
            Головна
          </Link>
          <IconArrow className={styles.IconArrow} />
        </li>
        {pathnames().map((item, index) => {
          return (
            <li className={styles.breadLine} key={item}>
              <Link
                className={`${styles.breadLink} ${
                  index === pathnames().length - 1 && styles.currentPath
                }`}
                to={`/${item}`}
              >
                {getUkrainianName(item!)}
              </Link>
              <IconArrow className={styles.IconArrow} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs
