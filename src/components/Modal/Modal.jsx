import React from "react";
import styles from './Modal.module.scss'
import classnames from 'classnames'
import Portal from "../Portal/Portal";
import { ReactComponent as Close } from '../../icons/Close.svg';

export default function Modal({ open, onClose, locked, children }) {
  const [active, setActive] = React.useState(false);
  const backdrop = React.useRef(null);

  React.useEffect(() => {
    const { current } = backdrop;

    const transitionEnd = () => setActive(open);

    const keyHandler = (e) =>
      !locked && [27].indexOf(e.which) >= 0 && onClose();

    const clickHandler = (e) => !locked && e.target === current && onClose();

    if (current) {
      current.addEventListener("transitionend", transitionEnd);
      current.addEventListener("click", clickHandler);
      window.addEventListener("keyup", keyHandler);
    }

    if (open) {
      window.setTimeout(() => {
        document.activeElement.blur();
        setActive(open);
        document.querySelector("#root").setAttribute("inert", "true");
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd);
        current.removeEventListener("click", clickHandler);
      }

      document.querySelector("#root").removeAttribute("inert");
      window.removeEventListener("keyup", keyHandler);
    };
  }, [open, locked, onClose]);

  return (
    <>
      {(open || active) && (
        <Portal className={styles.portal}>
          <div ref={backdrop} className={classnames(styles.modal, {[styles.modalActive]: active && open})}>
            <div className={styles.modalContent}>
                <div className={styles.closeButton} onClick={onClose}>
                    <Close className={styles.buttonIcon}/>
                </div>
                {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
