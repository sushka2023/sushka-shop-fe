import styles from './itemCard.module.scss'
import IconFavorite from '../../icons/favorite.svg?react'
import IconFavoriteIsActive from '../../icons/favoriteactive.svg?react'
import ShopItem from '../../images/shop-item.jpg'
import { useDispatch } from 'react-redux'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { toggleFavorite } from '../../redux/products/slice'
import { ProductResponse } from '../../types'

type Props = {
  item: ProductResponse
  isFavorite: boolean
}

const ItemCard: FC<Props> = ({ item, isFavorite }) => {
  const [selectedWeight, setSelectedWeight] = useState(item.prices[0].weight)
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0].price)

  const dispatch = useDispatch()

  const handleClickFavorite = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault()
    dispatch(toggleFavorite(item))
  }

  const handleWeightClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    weight: string,
    price: number
  ) => {
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
                          handleWeightClick(e, price.weight, price.price)
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

export default ItemCard
