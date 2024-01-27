import IconAddNewItem from '../../icons/add.svg?react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './favoritePage.module.scss'
import ItemCard from '../../components/item-card/ItemCard'
import { RootState } from '../../redux/store'

const FavoritePage = () => {
  const allItem = useSelector((state: RootState) => state.items.items)
  const favoriteItems = allItem.filter((item) => {
    return item.is_favorite
  })

  return (
    <section className={styles.favoriteBg}>
      <div className={styles.favoriteBorder}></div>
      <div className={styles.container}>
        <h2 className={styles.title}>Улюблене</h2>
        <ul className={styles.list}>
          {favoriteItems.map((item, index) => {
            return (
              <ItemCard item={item} key={index} isFavorite={item.is_favorite} />
            )
          })}
          <li className={styles.addNewItem}>
            <Link className={styles.link} to="/catalog">
              <IconAddNewItem className={styles.addNewItemIcon} />
              <p className={styles.addNewItemText}>
                Додати товар до улюбленого
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default FavoritePage
