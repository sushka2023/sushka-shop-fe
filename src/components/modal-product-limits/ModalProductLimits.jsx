// import { createPortal } from "react-dom";
// import styles from "./ModalProductLimits.module.scss";
// import { ReactComponent as IconArrowClose } from "../../icons/closemodal.svg";
// import { ReactComponent as IconTriangle } from "../../icons/triangle.svg";

// const modalRoot = document.querySelector("#modal-root-product-limits");

// export const ModalProductLimits = ({ onClick }) => {
//   return createPortal(
//     <div className={styles.modal}>
//       <p className={styles.modalText}>
//         При замовленні більше, ніж 10 одиниць одного виду товару, термін
//         виготовлення замовлення може бути більшим. Менеджер зв’яжеться з Вами
//         для уточнення термінів.
//       </p>
//       <button onClick={onClick} type="button" className={styles.btnCloseModal}>
//         <IconArrowClose className={styles.iconCloseModal} />
//       </button>
//       <IconTriangle className={styles.iconTriangle} />
//     </div>,
//     modalRoot
//   );
// };

import PropTypes from "prop-types";
import styles from "./ModalProductLimits.module.scss";
import { ReactComponent as IconArrowClose } from "../../icons/closemodal.svg";
import { ReactComponent as IconTriangle } from "../../icons/triangle.svg";

export const ModalProductLimits = ({ onClick, customStyles }) => {
  return (
    // <div className={styles.modal}>
    <div className={`${styles.modal} ${customStyles.position}`}>
      <p className={styles.modalText}>
        При замовленні більше, ніж 10 одиниць одного виду товару, термін
        виготовлення замовлення може бути більшим. Менеджер зв’яжеться з Вами
        для уточнення термінів.
      </p>
      <button onClick={onClick} type="button" className={styles.btnCloseModal}>
        <IconArrowClose className={styles.iconCloseModal} />
      </button>
      <IconTriangle className={styles.iconTriangle} />
    </div>
  );
};

ModalProductLimits.propTypes = {
  onClick: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
};
