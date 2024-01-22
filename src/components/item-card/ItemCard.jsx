import styles from './itemCard.module.scss'
import { ReactComponent as IconFavorite } from '../../icons/favorite.svg'
import { ReactComponent as IconFavoriteIsActive } from '../../icons/favoriteactive.svg'
import ShopItem from '../../images/shop-item.jpg'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toggleFavorite } from '../../Redax/Products/slices/items-slice'

const ItemCard = ({ item, isFavorite }) => {
  const [selectedWeight, setSelectedWeight] = useState(item.prices[0].weight)
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0].price)

  const dispatch = useDispatch()

  const handleClickFavorite = (e) => {
    e.preventDefault()
    dispatch(toggleFavorite(item))
  }

  const handleWeightClick = (e, weight, price) => {
    e.preventDefault()
    setSelectedWeight(weight)
    setSelectedPrice(price)
  }

  return (
    <li>
      <div className={styles.slideElement}>
        <div className={styles.cardContent}>
          <Link to={`/catalog/${item.product_category_id}/${item.id}/details`}>
            <div className={styles.slideImage}>
              <img src={ShopItem} alt="mandarin pastille" />
              {!isFavorite ? (
                <IconFavorite
                  className={styles.cardFavorite}
                  onClick={handleClickFavorite}
                />
              ) : (
                <IconFavoriteIsActive
                  className={styles.cardFavorite}
                  onClick={handleClickFavorite}
                />
              )}
            </div>
            <div className={styles.cardTitle}>
              <h3 className={styles.cardHeader}>{item.name}</h3>
              <p className={styles.cardPararaph}>{item.description}</p>
              <ul className={styles.listWeight}>
                {item.prices.map((price) => {
                  return (
                    <li className={styles.weightElement} key={price.id}>
                      <button
                        className={`${styles.weightElementButton} ${selectedWeight === price.weight ? styles.activeWeightElementButton : ''}`}
                        onClick={(e) => {
                          return handleWeightClick(e, price.weight, price.price)
                        }}
                      >
                        {price.weight}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <span className={styles.cardPrice}>{selectedPrice} грн</span>
            </div>
          </Link>
        </div>
        <button className={styles.cardButtom}>Купити</button>
      </div>
    </li>
  )
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired
}

export default ItemCard
