import styles from './itemCard.module.scss'
import IconFavorite from '../../icons/favorite.svg?react'
import IconFavoriteIsActive from '../../icons/favoriteactive.svg?react'
import ShopItem from '../../images/shop-item.jpg'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductResponse } from '../../types'
import { gramsToKilograms } from '../../utils/format-weight/formatWeight'
import { getToken } from '../../utils/cookie/token'
import ModalPortal from '../modal-portal/ModalPortal'
import Auth from '../auth/Auth'

type Props = {
  item: ProductResponse
  isFavorite: boolean
}

const ItemCard: FC<Props> = ({ item, isFavorite }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedWeight, setSelectedWeight] = useState(item.prices[0].weight)
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0].price)

  const handleClickFavorite = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault()
    const accessToken = getToken()
    setIsModalOpen(!accessToken)
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
              <div className={styles.cardTypography}>
                <h3 className={styles.cardHeader}>{item.name}</h3>
                <p className={styles.cardPararaph}>{item.description}</p>
              </div>
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
                        {gramsToKilograms(price.weight)}
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
      <ModalPortal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Auth setIsModalOpen={setIsModalOpen} />
      </ModalPortal>
    </li>
  )
}

export default ItemCard
