import { SetStateAction, useState } from 'react'
import { PriceResponse, ProductResponse } from '../../types'
import styles from './itemCard.module.scss'
import { gramsToKilograms } from '../../utils/format-weight/formatWeight'
import { formatter } from '../../helpers/formatterTotalPrice'

type Props = {
  item: ProductResponse
  selectedPrice: number
  setSelectedPrice: React.Dispatch<SetStateAction<number>>
  setSelectedPriceId: React.Dispatch<SetStateAction<number>>
}

const ProductItemFooter = ({
  item,
  selectedPrice,
  setSelectedPrice,
  setSelectedPriceId
}: Props) => {
  const [selectedWeight, setSelectedWeight] = useState(item.prices[0].weight)
  const [selectedOldPrice, setSelectedOldPrice] = useState(
    item.prices[0].old_price as number
  )

  const handleWeightClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: PriceResponse
  ) => {
    e.preventDefault()
    setSelectedWeight(price.weight)
    setSelectedPrice(price.price)
    setSelectedOldPrice(price.old_price as number)
    setSelectedPriceId(price.id)
  }

  return (
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
                  handleWeightClick(e, price)
                }}
              >
                {gramsToKilograms(price.weight)}
              </button>
            </li>
          )
        })}
      </ul>
      <div className={styles.priceContainer}>
        <span
          className={`${selectedOldPrice > 0 ? styles.newPrice : styles.cardPrice}`}
        >
          {formatter.format(selectedPrice)}
        </span>
        {selectedOldPrice > 0 && (
          <span className={styles.oldPrice}>
            {formatter.format(selectedOldPrice)}
          </span>
        )}
      </div>
    </div>
  )
}

export { ProductItemFooter }
