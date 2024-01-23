import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../../Redax/Products/selectors/Selectors'

import styles from './Categories.module.scss'

const CategoriesButtons = () => {
  const [activeButton, setActiveButton] = useState(null)
  const allCategories = useSelector(selectAllCategories)

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      setActiveButton(allCategories[0].name)
    }
  }, [allCategories])

  const handleClickButton = (e) => {
    setActiveButton(e.target.innerHTML)
  }

  return (
    <ul className={`${styles.list}`}>
      {allCategories &&
        allCategories.map((category) => {
          return (
            <li key={category.name}>
              <button
                type="button"
                className={`${styles.listButton} ${activeButton === category.name ? styles.active : ''}`}
                onClick={handleClickButton}
              >
                {category.name}
              </button>
            </li>
          )
        })}
      <li>
        <button
          type="button"
          className={`${styles.listButton} ${activeButton === 'Все' ? styles.active : ''}`}
          onClick={handleClickButton}
        >
          Все
        </button>
      </li>
    </ul>
  )
}

export default CategoriesButtons
