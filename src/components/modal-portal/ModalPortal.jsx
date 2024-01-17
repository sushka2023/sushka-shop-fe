import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../Redax/Auth/slices/auth-slice";
import { selectModal } from "../../Redax/Auth/selectors/Selectors";
import { ReactComponent as IconClose } from "../../icons/close.svg";
import styles from "./modal-portal.module.scss";

const ModalPortal = ({ children }) => {
  const isOpen = useSelector(selectModal);
  const dispatch = useDispatch();

  const modalContent = (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayShow : ""}`}>
      <div className={`${styles.modal} ${isOpen ? styles.show : ""}`}>
        <IconClose
          className={styles.closeIcon}
          onClick={() => dispatch(toggleModal(false))}
        />
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root-form"));
};

export default ModalPortal;
