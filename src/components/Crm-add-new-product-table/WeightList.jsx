import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CrmAddNewProduct.module.scss";

const WeightList = ({ WeightList, onWeightChange, currentWeight }) => {
  const [selectedWeight, setSelectedWeight] = useState(currentWeight);

  const handleWightChange = (e) => {
    const newWeight = e.target.labels[0].innerText;
    setSelectedWeight(newWeight);
    onWeightChange(newWeight);
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

WeightList.propTypes = {
  WeightList: PropTypes.array,
  onWeightChange: PropTypes.func,
  currentWeight: PropTypes.string
};

export default WeightList;
