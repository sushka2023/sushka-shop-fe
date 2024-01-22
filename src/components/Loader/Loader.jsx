import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import { ReactComponent as First } from "./svg/svg1.svg";
import { ReactComponent as Second } from "./svg/svg2.svg";
import { ReactComponent as Third } from "./svg/svg3.svg";
import { ReactComponent as Four } from "./svg/svg4.svg";
import { ReactComponent as Five } from "./svg/svg5.svg";

export const Loader = () => {
  const [animationStates, setAnimationStates] = useState({
    second: false,
    third: false,
    four: false,
    five: false,
  });

  useEffect(() => {
    const handleAnimationEnd = (elementName) => {
      if (Object.values(animationStates).every((value) => value === true)) {
        resetAnimationStates();
      }

      setAnimationStates((prevStates) => ({
        ...prevStates,
        [elementName]: true,
      }));
    };

    const resetAnimationStates = () => {
      setAnimationStates({
        second: false,
        third: false,
        four: false,
        five: false,
      });
    };

    const elements = {
      third: document.querySelector(
        `.${styles.animate__customCombinedAnimationThird}`
      ),
      four: document.querySelector(
        `.${styles.animate__customCombinedAnimationFour}`
      ),
      five: document.querySelector(
        `.${styles.animate__customCombinedAnimationFive}`
      ),
    };

    Object.keys(elements).forEach((elementName) => {
      const element = elements[elementName];

      element.addEventListener("animationend", () =>
        handleAnimationEnd(elementName)
      );

      return () => {
        element.removeEventListener("animationend", () =>
          handleAnimationEnd(elementName)
        );
      };
    });
  }, [animationStates]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.list}>
        <First className={styles.first} />
        <Second
          className={`${styles.animate__customCombinedAnimationSecond} ${
            animationStates.second ? styles.visible : ""
          }`}
        />
        <Third
          className={`${styles.animate__customCombinedAnimationThird} ${
            animationStates.third ? styles.visible : ""
          }`}
        />
        <Four
          className={`${styles.animate__customCombinedAnimationFour} ${
            animationStates.four ? styles.visible : ""
          }`}
        />
        <Five
          className={`${styles.animate__customCombinedAnimationFive} ${
            animationStates.five ? styles.visible : ""
          }`}
        />
      </div>
    </div>
  );
};
