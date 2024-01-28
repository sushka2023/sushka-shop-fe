import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './Categories.module.scss'
import { RootState } from '../../redux/store'

const CategoriesButtons = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const allCategories = useSelector(
    (state: RootState) => state.items.allCategories
  )

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      setActiveButton(allCategories[0].name)
    }
  }, [allCategories])

  const handleClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setActiveButton((e.target as HTMLElement).innerHTML)
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
