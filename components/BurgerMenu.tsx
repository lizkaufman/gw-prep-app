"use client";

import { useState } from "react";
import styles from "../styles/burgerMenu.module.css";

interface BurgerMenuProps {
  toggleMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ toggleMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        className={`${styles.burgerMenu} ${
          isOpen ? styles.open : ""
        } px-5 py-4`}
        onClick={() => {
          handleMenuClick();
          toggleMenu();
        }}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </>
  );
};

export default BurgerMenu;
