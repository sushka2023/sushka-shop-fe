import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Header.module.scss'

type Props = {
  allCategories: any[]
}

const DropdownList: FC<Props> = ({ allCategories }) => {
  return (
    <ul className={styles.dropdownList}>
      {allCategories?.map((category) => {
        return (
          <li className={styles.dropdownListLine} key={category.id}>
            <Link to={`/catalog/${category.id}`}>{category.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default DropdownList
