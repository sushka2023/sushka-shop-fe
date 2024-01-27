import { FC } from 'react'
import ArowIcon from '../../icons/arrow.svg?react'
import styles from './CrmAddNewProduct.module.scss'

type Props = {
  id: string
  weight: string
  openRows: any
  toggleWeightList: (id: string) => void
}

const WeightColumn: FC<Props> = ({
  id,
  weight,
  openRows,
  toggleWeightList
}) => {
  return (
    <div
      className={styles.weightColumn}
      onClick={() => {
        toggleWeightList(id)
      }}
    >
      {weight}
      <div className={styles.arrowWrapp}>
        <ArowIcon
          className={`${styles.arowIcon} ${openRows[id] ? styles.arowIconActive : ''}`}
        />
      </div>
    </div>
  )
}

export default WeightColumn
