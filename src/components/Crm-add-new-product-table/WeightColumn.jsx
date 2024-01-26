import ArowIcon from '../../icons/arrow.svg?react'
import styles from './CrmAddNewProduct.module.scss'

const WeightColumn = ({ id, weight, openRows, toggleWeightList }) => {
  return (
    <div
      className={styles.weightColumn}
      onClick={() => {
        return toggleWeightList(id)
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
