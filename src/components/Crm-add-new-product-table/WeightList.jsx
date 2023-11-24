import { useState } from "react";
import styles from "./CrmAddNewProduct.module.scss";

const WeightList = ({ WeightList, onWeightChange, currentWeight, onClose }) => {
  const [selectedWeight, setSelectedWeight] = useState(currentWeight);

  const handleWightChange = (e) => {
    const newWeight = parseInt(e.target.labels[0].innerText);
    setSelectedWeight(newWeight);
    onWeightChange(newWeight);
    // onClose();
  };

  return (
    <ul className={styles.weightList}>
      {WeightList.map((item) => (
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
      ))}
    </ul>
  );
};

export default WeightList;
