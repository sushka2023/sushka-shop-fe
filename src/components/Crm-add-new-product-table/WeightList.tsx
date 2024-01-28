import { FC, useState } from 'react'
import styles from './CrmAddNewProduct.module.scss'

type Props = {
  WeightList: string[]
  onWeightChange: (newWeight: string) => void
  currentWeight: string
}

const WeightList: FC<Props> = ({
  WeightList,
  onWeightChange,
  currentWeight
}) => {
  const [selectedWeight, setSelectedWeight] = useState(currentWeight)

  const handleWightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = e.target.labels?.[0].innerText || ''
    setSelectedWeight(newWeight)
    onWeightChange(newWeight)
  }

  return (
    <ul className={styles.weightList}>
      {WeightList.map((item) => {
        return (
          <li key={item} className={styles.weightLine}>
            <input
              className={styles.weightInput}
              type="radio"
              id={item}
              value={item}
              name="Weight"
              onChange={handleWightChange}
              checked={selectedWeight === item}
            />
            <label htmlFor={item}>{item}</label>
          </li>
        )
      })}
    </ul>
  )
}

export default WeightList
