import { FC, useState } from 'react'
import styles from './crmStatus.module.scss'

type Props = {
  onStatusChange: (name: string, value: string, label: string) => void
  currentStatus: string
}

const CrmStatus: FC<Props> = ({ onStatusChange, currentStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)

  const handleLocalStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.labels?.[0].innerText || '')
    onStatusChange(
      e.target.name,
      e.target.value,
      e.target.labels?.[0].innerText || ''
    )
  }

  return (
    <div className={styles.statusDropdownContainer}>
      <ul className={styles.statusList}>
        <li className={`${styles.statusLine} ${styles.statusNew}`}>
          <input
            type="radio"
            id="new"
            name="product_status"
            value="new"
            checked={selectedStatus === 'Новий'}
            onChange={handleLocalStatusChange}
            className={styles.statusInput}
          />
          <label
            htmlFor="new"
            className={`${styles.statusLabel} ${styles.statusLabelNew}`}
          >
            Новий
          </label>
        </li>
        <li className={`${styles.statusLine} ${styles.statusActive}`}>
          <input
            type="radio"
            id="activated"
            name="product_status"
            value="activated"
            checked={selectedStatus === 'Активний'}
            onChange={handleLocalStatusChange}
            className={styles.statusInput}
          />
          <label
            htmlFor="activated"
            className={`${styles.statusLabel} ${styles.statusLabelActive}`}
          >
            Активний
          </label>
        </li>
        <li className={`${styles.statusLine} ${styles.statusArchive}`}>
          <input
            type="radio"
            id="archived"
            name="product_status"
            value="archived"
            checked={selectedStatus === 'Архівований'}
            onChange={handleLocalStatusChange}
            className={styles.statusInput}
          />
          <label
            htmlFor="archived"
            className={`${styles.statusLabel} ${styles.statusLabelArchive}`}
          >
            Архівований
          </label>
        </li>
      </ul>
    </div>
  )
}

export default CrmStatus
