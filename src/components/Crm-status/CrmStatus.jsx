import { useState } from 'react';
import styles from './crmStatus.module.scss';

const CrmStatus = ({ onStatusChange, currentStatus }) => {
    
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    const handleLocalStatusChange = (e) => {
      setSelectedStatus(e.target.labels[0].innerText);
      onStatusChange(e.target.name, e.target.value, e.target.labels[0].innerText);
    };

  return (
    <div className={styles.statusDropdownContainer}>
      <ul className={styles.statusList}>
        <li className={`${styles.statusLine} ${styles.statusNew}`}>
          <input
            type="radio"
            id="new"
            name="product_status"
            value="new"
            checked={selectedStatus === "Новий"}
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
            id="active"
            name="product_status"
            value="active"
            checked={selectedStatus === "Активний"}
            onChange={handleLocalStatusChange}
            className={styles.statusInput}
          />
          <label
            htmlFor="active"
            className={`${styles.statusLabel} ${styles.statusLabelActive}`}
          >
            Активний
          </label>
        </li>
        <li className={`${styles.statusLine} ${styles.statusArchive}`}>
          <input
            type="radio"
            id="archive"
            name="product_status"
            value="archive"
            checked={selectedStatus === "Архівований"}
            onChange={handleLocalStatusChange}
            className={styles.statusInput}
          />
          <label
            htmlFor="archive"
            className={`${styles.statusLabel} ${styles.statusLabelArchive}`}
          >
            Архівований
          </label>
        </li>
      </ul>
    </div>
  );
};

export default CrmStatus;