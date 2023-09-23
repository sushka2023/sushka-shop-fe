import { useState } from "react";
import Options from "../options/Options";
import sortStyles from "./sort.module.scss";

const Sort = () => {
    const [sortValue, setSortValue] = useState("Сортування за замовчуванням");

    const clickInput = (e) => setSortValue(e.target.value);

  return (
    <Options value={sortValue} >
      <div className={sortStyles.inputWrapper}>
        <input
          className={sortStyles.sortInput}
          type="radio"
          id="default"
          name="sorting"
          value="Сортування за замовчуванням"
          onClick={clickInput}
        />
        <label htmlFor="default">Сортування за замовчуванням</label>
      </div>
      <div className={sortStyles.inputWrapper}>
        <input
          className={sortStyles.sortInput}
          type="radio"
          id="byGrowth"
          name="sorting"
          value="Ціна за зростанням"
          onClick={clickInput}
        />
        <label htmlFor="byGrowth">Ціна за зростанням</label>
      </div>
      <div className={sortStyles.inputWrapper}>
        <input
          className={sortStyles.sortInput}
          type="radio"
          id="byDecline"
          name="sorting"
          value="Ціна за спаданням"
          onClick={clickInput}
        />
        <label htmlFor="byDecline">Ціна за спаданням</label>
      </div>
    </Options>
  );
};

export default Sort;