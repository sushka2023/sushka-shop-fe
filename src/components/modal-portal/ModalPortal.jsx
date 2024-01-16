import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../Redax/Auth/slices/auth-slice";
import { selectModal } from "../../Redax/Auth/selectors/Selectors";
import { ReactComponent as IconClose } from "../../icons/close.svg";
import styles from './modal-portal.module.scss'

const ModalPortal = ({children}) => {
  const isOpen = useSelector(selectModal);
  const dispatch = useDispatch();

  const portalContainer = document.getElementById("modal-root-form");

    const modalContent = (
      <div className={styles.modal}>
        <div className={styles.modalWrapp}>
          <IconClose className={styles.closeIcon} onClick={() => dispatch(toggleModal(false))} />
          {children}
        </div>
      </div>
    );

   return isOpen && createPortal(modalContent, portalContainer);
};

export default ModalPortal
