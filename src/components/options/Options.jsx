import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";
import styles from "./Options.module.scss";

const Options = ({ children, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickDropdown = (e) => {

            setIsOpen(!isOpen);

            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickDropdown);

        return () => {
            document.removeEventListener("click", handleClickDropdown);
        };
    }, [isOpen]);

    const applyDropDown = (e) => {

        if (e.target.nodeName === "BUTTON" || e.target.nodeName === "svg") {
            return;
        }

        e.stopPropagation();
    }


    return (
      <div className={styles.dropdown}>
        <button className={styles.dropdownToggle} ref={containerRef}>
          {value}
          <SettingsIcon />
        </button>
        {isOpen && (
          <div className={styles.dropdownContent} onClick={applyDropDown}>
            {children}
          </div>
        )}
      </div>
    );
};

Options.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Options;
