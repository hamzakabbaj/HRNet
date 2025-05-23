import React, { useState, useEffect } from "react";
import styles from "./SelectMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const SelectMenu = ({
  label,
  options,
  value,
  onChange,
  maxVisibleOptions = 5,
}) => {
  // --------------------- Init States ---------------------
  const [selected, setSelected] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  // --------------------- Use Effects ---------------------
  useEffect(() => {
    setSelected(value);
    setIsOpen(false);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.container__select__selectbox}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // --------------------- Handlers ---------------------
  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  // --------------------- Render ---------------------
  return (
    <div className={styles.container}>
      <div className={styles.container__select}>
        <span className={styles.container__select__label}>{label}</span>
        <div className={styles.container__select__selectbox}>
          <div
            className={styles.container__select__selectbox__selected}
            onClick={handleSelectClick}
          >
            <span>{selected}</span>
            {isOpen ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                className={styles.container__select__selectbox__chevron}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className={styles.container__select__selectbox__chevron}
              />
            )}
          </div>
          {isOpen && (
            <div
              className={styles.container__select__selectbox__options}
              style={{
                "--max-visible-options": maxVisibleOptions,
                "--option-height": "40px", // Height of each option including padding
              }}
            >
              {options &&
                options.map((option) => (
                  <div
                    key={option}
                    className={
                      styles.container__select__selectbox__options__option
                    }
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectMenu;
